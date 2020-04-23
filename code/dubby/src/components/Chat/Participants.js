import React, { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import {
  Form,
  Button,
  Jumbotron,
  Collapse,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import UserList from "../Friend/UserList";
import { addParticipantToChat } from "../../utilityfunctions/Utilities";

const Participants = ({ chatParticipantData, chatData }) => {
  const { cid } = useParams();

  const { theme } = useContext(ThemeContext);
  const { userData } = useContext(UserContext);
  const { friendListData } = useContext(FriendContext);

  // invite modal
  const [modalOpen, setModalOpen] = useState(false);
  // participant list
  const [collapseOpen, setCollapseOpen] = useState(false);
  // (for group chat) array of uid of selected friends to invite to chat
  const [selectedFriendData, setSelectedFriendData] = useState([]);

  const handleCollapseToggle = () => setCollapseOpen(!collapseOpen);
  const handleModalToggle = () => setModalOpen(!modalOpen);

  // (for group chat) adds list of uids to group chat
  // updates selectedFriendData (clears it)
  const handleAddFriendToChat = (e) => {
    e.preventDefault();
    for (const uid of selectedFriendData) {
      addParticipantToChat({ cid, uid });
    }
    setSelectedFriendData([]);
  };

  // adds uid of selected friend to selectedFriendData
  // updates selectedFriendData
  const handleSelectFriend = ({ targetUid }) => {
    if (targetUid && friendListData) {
      let tmp = selectedFriendData;
      tmp.push(targetUid);
      tmp = tmp.filter((uid, index, a) => a.indexOf(uid) === index);
      setSelectedFriendData(tmp);
    }
  };

  // removes uid of selected friend from selectedFriendData
  // updates selectedFriendData
  const handleDeselectFriend = ({ targetUid }) => {
    if (targetUid && selectedFriendData) {
      let tmp = selectedFriendData;
      tmp = tmp.filter((uid) => uid !== targetUid);
      setSelectedFriendData(tmp);
    }
  };

  // render
  if (!chatParticipantData || !chatData || !friendListData) {
    return null;
  } else {
    const { type, icon, eid } = chatData;
    const title =
      type === "private"
        ? chatParticipantData.find((p) => p.uid !== userData.uid).username
        : chatData.title;

    // render
    return (
      <div>
        <Jumbotron style={theme.jumbotron} expand="sm">
          {type === "private" && (
            <Badge pill color="success">
              <i className={icon}></i>
              Private
            </Badge>
          )}
          {type === "group" && (
            <Badge pill color="info">
              <i className={icon}></i>
              Group
            </Badge>
          )}
          {type === "event" && (
            <Badge pill color="warning">
              <i className={icon}></i>
              Event
            </Badge>
          )}
          <h1>
            {title}
            {type === "event" && (
              <Button close tag={Link} to={`/e/${eid}`}>
                <i className="fas fa-info-circle"></i>
              </Button>
            )}
          </h1>
          <ButtonGroup>
            {type !== "private" && (
              <Button size="sm" color="success" onClick={handleCollapseToggle}>
                Participants
              </Button>
            )}
            {type === "group" && (
              <Button size="sm" onClick={handleModalToggle}>
                Invite Friends
              </Button>
            )}
          </ButtonGroup>
          <Collapse isOpen={collapseOpen}>
            <UserList users={chatParticipantData} />
          </Collapse>
        </Jumbotron>
        <Modal
          returnFocusAfterClose={false}
          isOpen={modalOpen}
          toggle={handleModalToggle}
        >
          <Form onSubmit={handleAddFriendToChat}>
            <ModalHeader toggle={handleModalToggle}>Invite Friends</ModalHeader>
            <ModalBody>
              <UserList
                users={friendListData.filter(
                  ({ uid }) => selectedFriendData.indexOf(uid) > -1
                )}
                heading="Participants"
                action={handleDeselectFriend}
                actionIcon="fas fa-minus"
                actionColor="warning"
              />
              <hr />
              <UserList
                users={friendListData.filter(
                  ({ uid }) =>
                    typeof chatParticipantData.find((p) => p.uid === uid) ===
                      "undefined" && selectedFriendData.indexOf(uid) < 0
                )}
                heading="Add Users"
                action={handleSelectFriend}
                actionIcon="fas fa-plus"
                actionColor="primary"
              />
            </ModalBody>
            <ModalFooter>
              <Button type="submit" color="primary" onClick={handleModalToggle}>
                Done
              </Button>{" "}
              <Button color="danger" outline onClick={handleModalToggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
};
export default Participants;
