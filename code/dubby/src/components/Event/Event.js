import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, Redirect } from "react-router-dom";
import { firestore } from "firebase";
import { GymContext } from "../../contexts/GymContext";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import {
  Jumbotron,
  ButtonGroup,
  Button,
  Badge,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalFooter,
  Collapse,
  Form,
  ModalBody,
} from "reactstrap";
import Loading from "../Loading/Loading";
import NavBar from "../Navbar/Navbar";
import {
  deleteEvent,
  addParticipantToEvent,
  inviteParticipantToEvent,
} from "../../utilityfunctions/Utilities";
import ProfileHead from "../Profile/ProfileHead";
import UserList from "../Friend/UserList";

const Event = () => {
  const { eid } = useParams();

  const { theme } = useContext(ThemeContext);
  const { gymData } = useContext(GymContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const { userData, userLoading } = useContext(UserContext);
  const { friendListData } = useContext(FriendContext);

  // fetched event data from /event/{eid}
  const [eventData, setEventData] = useState();
  const [noEventRedirect, setNoEventRedirect] = useState(false);
  const [eventParticipants, setEventParticipants] = useState();
  // data on host from /user_profile/{uid}, for username
  const [hostUserData, setHostUserData] = useState();
  // data on event type from eventTypeData
  const [foundTypeData, setFoundTypeData] = useState();
  // data on event location from gymData
  const [foundLocationData, setFoundLocationData] = useState();
  // list of uid for selected friend to invite
  const [selectedFriendData, setSelectedFriendData] = useState([]);
  // booleans for loading
  const [joinLoading, setJoinLoading] = useState(false);
  const [eventDeleteLoading, setEventDeleteLoading] = useState(false);
  const [addParticipantLoading, setAddParticipantLoading] = useState(false);
  // booleans for modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  // boolean for collapse
  const [participantCollapse, setParticipantCollapse] = useState(false);

  // subscribe to event data and event participant data given eid
  // updates eventData, eventParticipants and if no data exists,
  // updates noEventRedirect = true
  useEffect(() => {
    if (eid) {
      const eventRef = firestore().collection("event").doc(eid);
      const unsubscribeEventData = eventRef.onSnapshot((snap) => {
        if (snap.exists) {
          setEventData(snap.data());
        } else {
          setNoEventRedirect(true);
        }
      });
      const unsubscribeEventParticipantData = eventRef
        .collection("participants")
        .onSnapshot((snap) => {
          let tmp = [];
          snap.forEach((doc) => tmp.push(doc.data()));
          setEventParticipants(tmp);
        });
      return () => {
        unsubscribeEventData();
        unsubscribeEventParticipantData();
      };
    }
  }, [eid]);

  // subscribe to event host user data given eventData
  // updates hostUserData
  useEffect(() => {
    if (eventData) {
      const userRef = firestore()
        .collection("user_profile")
        .doc(eventData.hostUid);
      const unsubscribeUserData = userRef.onSnapshot((snap) =>
        setHostUserData(snap.data())
      );
      return () => {
        unsubscribeUserData();
      };
    }
  }, [eventData]);

  // get event type and location data given event data
  // updates foundTypeData and foundLocationData
  useEffect(() => {
    if (eventData && eventTypeData && gymData) {
      setFoundTypeData(
        eventTypeData.find((t) => t.value === eventData.eventType)
      );
      setFoundLocationData(gymData.find((g) => g.value === eventData.location));
    }
  }, [eventData, eventTypeData, gymData]);

  // toggles
  const toggleDeleteModal = () => setDeleteModalOpen(!deleteModalOpen);
  const toggleInviteModal = () => setInviteModalOpen(!inviteModalOpen);
  const toggleParticipantCollapse = () =>
    setParticipantCollapse(!participantCollapse);

  // adds self to event
  // join button renders when user hasn't joined event
  const handleJoinButtonClick = async () => {
    setJoinLoading(true);
    await addParticipantToEvent({
      eid: eventData.eid,
      uid: userData.uid,
      status: "joined",
    });
    setJoinLoading(false);
  };

  // makes confirmation modal appear
  // updates deleteModalOpen
  const handleDeleteEventButtonClick = () => {
    toggleDeleteModal();
  };

  // deletes event from database
  // sets eventDeleteLoading so it renders <Loading/>
  const handleDeleteEventConfirmClick = async () => {
    setEventDeleteLoading(true);
    await deleteEvent(eventData);
  };

  // called from invite modal form
  // sets addParticipantLoading so it renders <Loading/>
  // until all uid in selectedFriendData is added to event
  const handleAddFriendToEvent = async (e) => {
    e.preventDefault();
    setAddParticipantLoading(true);
    for (const uid of selectedFriendData) {
      await inviteParticipantToEvent({ eid, uid });
    }
    setSelectedFriendData([]);
    toggleInviteModal();
    setAddParticipantLoading(false);
  };

  // add selected uid to selectedFriendData
  const handleSelectFriend = ({ targetUid }) => {
    if (targetUid && friendListData) {
      let tmp = selectedFriendData;
      tmp.push(targetUid);
      tmp = tmp.filter((uid, index, a) => a.indexOf(uid) === index);
      setSelectedFriendData(tmp);
    }
  };

  // removes selected uid from selectedFriendData
  const handleDeselectFriend = ({ targetUid }) => {
    if (targetUid && selectedFriendData) {
      let tmp = selectedFriendData;
      tmp = tmp.filter((uid) => uid !== targetUid);
      setSelectedFriendData(tmp);
    }
  };

  // render
  if (
    userLoading ||
    eventDeleteLoading ||
    joinLoading ||
    addParticipantLoading ||
    !eventData ||
    !eventParticipants ||
    !hostUserData ||
    !friendListData
  ) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (noEventRedirect) {
    return <Redirect to="/e" />;
  } else {
    const { uid } = userData;
    const vacancy =
      eventData.allowedPeople -
        (eventParticipants.length ? eventParticipants.length : 0) >
      0
        ? eventData.allowedPeople -
          (eventParticipants.length ? eventParticipants.length : 0)
        : 0;
    const parsedStartingTime = new Date(
      eventData.startingTime
    ).toLocaleString();

    return (
      <div style={theme.background}>
        <NavBar />
        <Jumbotron style={theme.jumbotron}>
          <Badge pill color="secondary">
            <i className={foundTypeData.icon}></i> {foundTypeData.display}
          </Badge>
          {eventParticipants.find((p) => p.uid === uid) &&
          eventParticipants.find((p) => p.uid === uid).status === "joined" ? (
            <Badge pill color="info">
              Joined
            </Badge>
          ) : (
            <Badge pill color="dark">
              Invited
            </Badge>
          )}
          {eventData.isPublic || (
            <Badge pill color="success">
              Private
            </Badge>
          )}
          {hostUserData.uid === uid && (
            <Badge pill color="warning">
              Hosting
            </Badge>
          )}
          <h1>{eventData.eventName}</h1>
          {eventParticipants.find((x) => x.uid === uid) && (
            <ButtonGroup>
              <Button
                size="sm"
                color="success"
                onClick={toggleParticipantCollapse}
              >
                Participants
              </Button>
              <Button size="sm" onClick={toggleInviteModal}>
                Invite Friends
              </Button>
            </ButtonGroup>
          )}
          {eventParticipants.find((x) => x.uid === uid) && (
            <Collapse isOpen={participantCollapse}>
              <UserList users={eventParticipants} />
            </Collapse>
          )}
        </Jumbotron>

        {/* modal to confirm delete event*/}
        <Modal
          returnFocusAfterClose={false}
          isOpen={deleteModalOpen}
          toggle={toggleDeleteModal}
        >
          <ModalHeader toggle={toggleDeleteModal}>Delete Event?</ModalHeader>
          <ModalFooter>
            <Button
              outline
              color="danger"
              onClick={handleDeleteEventConfirmClick}
            >
              <i className="fas fa-trash"></i> Delete
            </Button>
            <Button color="primary" onClick={toggleDeleteModal}>
              <i className="fas fa-times"></i> Cancel
            </Button>
          </ModalFooter>
        </Modal>

        {/* modal to invite friends */}
        <Modal
          returnFocusAfterClose={false}
          isOpen={inviteModalOpen}
          toggle={toggleInviteModal}
        >
          <Form onSubmit={handleAddFriendToEvent}>
            <ModalHeader toggle={toggleInviteModal}>Invite Friends</ModalHeader>
            <ModalBody>
              <UserList
                users={friendListData.filter(
                  ({ uid }) => selectedFriendData.indexOf(uid) > -1
                )}
                heading="Invites"
                action={handleDeselectFriend}
                actionIcon="fas fa-minus"
                actionColor="warning"
              />
              <hr />
              <UserList
                users={friendListData.filter(
                  ({ uid }) =>
                    selectedFriendData.indexOf(uid) < 0 &&
                    typeof eventParticipants.find((p) => p.uid === uid) ===
                      "undefined"
                )}
                heading="Add Friends"
                action={handleSelectFriend}
                actionIcon="fas fa-plus"
                actionColor="primary"
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary">
                Done
              </Button>{" "}
              <Button color="danger" outline onClick={toggleInviteModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>

        <div style={theme.mainContainer}>
          <p>Location: {foundLocationData.display}</p>
          <p>Starting at {parsedStartingTime}</p>
          <p>
            Vacancy: {vacancy}/{eventData.allowedPeople}
          </p>
          <Row>
            <Col sm={{ size: 6 }}>
              <Button block outline tag={Link} to={`/u/${hostUserData.uid}`}>
                <ProfileHead size="inline" src={hostUserData.profileImageSrc} />{" "}
                {hostUserData.username}
              </Button>
            </Col>
            <Col sm={{ size: 6 }}>
              {eventParticipants.find((x) => x.uid === uid) ? (
                <Button
                  block
                  color="success"
                  tag={Link}
                  to={`/c/${eventData.cid}`}
                >
                  <i className="fas fa-comment-dots"></i>
                  Chat!
                </Button>
              ) : (
                <Button block onClick={handleJoinButtonClick}>
                  Join
                </Button>
              )}
            </Col>
          </Row>
          <hr />{" "}
          {uid === hostUserData.uid ? (
            <Row>
              <Col>
                <Button block tag={Link} to="/">
                  <i className="fas fa-undo"></i> Back to My Events
                </Button>
              </Col>
            </Row>
          ) : (
            <Row>
              <Col>
                <Button block tag={Link} to="/e">
                  <i className="fas fa-undo"></i> Back to Events Page
                </Button>
              </Col>
            </Row>
          )}
          <hr />
          {uid === hostUserData.uid && (
            <Row>
              <Col>
                <Button
                  block
                  outline
                  color="danger"
                  onClick={handleDeleteEventButtonClick}
                >
                  <i className="fas fa-trash"></i>
                  Delete
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
};

export default Event;
