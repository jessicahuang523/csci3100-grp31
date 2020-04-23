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
  Modal,
  ModalHeader,
  ModalFooter,
  Collapse,
  Form,
  ModalBody,
  Card,
  CardText,
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

  const { gymData } = useContext(GymContext);
  const { userData } = useContext(UserContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const { theme, isPrimaryTheme } = useContext(ThemeContext);
  const { friendListData, friendContextLoaded } = useContext(FriendContext);

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

  const parseTimeDisplay = (time) => {
    const st = new Date(time);
    const stt = st.toLocaleTimeString("en-US");
    const std = st.toLocaleDateString("en-US");
    const isToday =
      new Date(Date.now()).toLocaleDateString("en-US") ===
      st.toLocaleDateString("en-US");
    const parsedTime =
      (isToday ? "Today" : std.substring(0, std.length - 5)) +
      ", " +
      stt.substring(0, stt.length - 6) +
      stt.substring(stt.length - 2);
    return parsedTime;
  };

  // render
  if (
    eventDeleteLoading ||
    joinLoading ||
    addParticipantLoading ||
    !eventData ||
    !eventParticipants ||
    !hostUserData ||
    !friendContextLoaded
  ) {
    return <Loading />;
  } else if (noEventRedirect) {
    return <Redirect to="/e" />;
  } else {
    const { eventName, startingTime, allowedPeople, isPublic, cid } = eventData;
    const { uid } = userData;
    const joinedParticipants = eventParticipants.filter(
      ({ status }) => status === "joined"
    );
    const vacancy =
      allowedPeople -
        (joinedParticipants.length ? joinedParticipants.length : 0) >
      0
        ? allowedPeople -
          (joinedParticipants.length ? joinedParticipants.length : 0)
        : 0;
    const parsedStartingTime = parseTimeDisplay(startingTime);
    const isFuture = startingTime > Date.now();

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
          {isPublic || (
            <Badge pill color="success">
              Private
            </Badge>
          )}
          {hostUserData.uid === uid && (
            <Badge pill color="warning">
              Hosting
            </Badge>
          )}
          <h1>{eventName}</h1>
          {eventParticipants.find((x) => x.uid === uid) &&
            eventParticipants.find((p) => p.uid === uid).status ===
              "joined" && (
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
          {joinedParticipants && (
            <Collapse isOpen={participantCollapse}>
              <UserList users={joinedParticipants} />
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
              <ButtonGroup>
                <Button outline onClick={toggleInviteModal}>
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Done
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </Form>
        </Modal>

        <div style={theme.mainContainer}>
          {/* main content */}
          <Card body style={{ padding: "5rem 2rem" }}>
            <CardText>
              <Badge pill color="warning">
                Location
              </Badge>{" "}
              {foundLocationData.display}
              <br />
              <Badge
                pill
                color={
                  isFuture ? (isPrimaryTheme ? "dark" : "light") : "secondary"
                }
              >
                {isFuture ? "Starting" : "Started"}
              </Badge>{" "}
              {parsedStartingTime}
              <br />
              <Badge pill color="success">
                Vacancy
              </Badge>{" "}
              {vacancy}/{allowedPeople}
            </CardText>

            <ButtonGroup>
              {uid === hostUserData.uid ? (
                <Button color="dark" tag={Link} to="/">
                  <i className="fas fa-chevron-left"></i> My Events
                </Button>
              ) : (
                <Button color="dark" tag={Link} to="/e">
                  <i className="fas fa-chevron-left"></i> Events
                </Button>
              )}
              <Button outline tag={Link} to={`/u/${hostUserData.uid}`}>
                <Badge pill color={isPrimaryTheme ? "dark" : "light"}>
                  Host
                </Badge>{" "}
                <ProfileHead size="inline" src={hostUserData.profileImageSrc} />{" "}
                {hostUserData.username}
              </Button>
            </ButtonGroup>
            <hr />
            <ButtonGroup>
              {eventParticipants.find((x) => x.uid === uid) &&
              eventParticipants.find((p) => p.uid === uid).status ===
                "joined" ? (
                <Button color="success" tag={Link} to={`/c/${cid}`}>
                  <i className="fas fa-comment-dots"></i> Chat!
                </Button>
              ) : (
                <Button disabled={vacancy <= 0} onClick={handleJoinButtonClick}>
                  <i className="fas fa-plus"></i> Join
                </Button>
              )}
              {uid === hostUserData.uid && (
                <Button color="danger" onClick={handleDeleteEventButtonClick}>
                  <i className="fas fa-trash"></i>
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </Card>
        </div>
      </div>
    );
  }
};

export default Event;
