import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { firestore } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { FriendContext } from "../../contexts/FriendContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import {
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  DropdownToggle,
  InputGroupButtonDropdown,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import {
  acceptFriendRequest,
  removeFriendRequest,
  unfriendFriend,
} from "../../utilityfunctions/Utilities";
import ProfileHead from "../Profile/ProfileHead";

const Friend = () => {
  const { userData, userLoading } = useContext(UserContext);
  const {
    sentRequestData,
    receivedRequestData,
    friendListData,
    friendContextLoaded,
  } = useContext(FriendContext);
  const { eventTypeData } = useContext(EventTypeContext);

  const [searchUserString, setSearchUserString] = useState();
  const [searchUserInterest, setSearchUserInterest] = useState();
  const [searchUserResult, setSearchUserResult] = useState();
  const [eventTypeDropdownOpen, setEventTypeDropdownOpen] = useState(false);

  const handleToggleEventTypeDropdown = () =>
    setEventTypeDropdownOpen(!eventTypeDropdownOpen);

  const handleSearchUseSubmit = (e) => {
    e.preventDefault();
    const fetchResult = async () => {
      let query = firestore().collection("user_profile");
      if (searchUserString) {
        query = query.where("username", "==", searchUserString);
      }
      if (searchUserInterest) {
        query = query.where(
          "interested_sports",
          "array-contains",
          searchUserInterest
        );
      }
      const res = await query.get();
      let tmp = [];
      res.forEach((d) => tmp.push(d.data()));
      setSearchUserResult(tmp);
    };
    if (searchUserInterest || searchUserString) {
      fetchResult();
    }
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!friendContextLoaded || !eventTypeData) {
    return <Loading />;
  } else {
    return (
      <div>
        <NavBar />
        <Jumbotron>
          <h1>Friends</h1>
          <Form onSubmit={handleSearchUseSubmit}>
            <InputGroup>
              <Input
                placeholder="search for a user..."
                onChange={(e) => setSearchUserString(e.target.value)}
              />
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={eventTypeDropdownOpen}
                toggle={handleToggleEventTypeDropdown}
              >
                <DropdownToggle caret>
                  <i className="fas fa-search"></i> Search by{" "}
                  {searchUserInterest || "interested sports"}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setSearchUserInterest(null)}>
                    None
                  </DropdownItem>
                  {eventTypeData.map(({ value, display }) => (
                    <DropdownItem
                      key={value}
                      onClick={() => setSearchUserInterest(display)}
                    >
                      {display}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </InputGroupButtonDropdown>
              <InputGroupAddon addonType="append">
                <Button color="primary" type="submit">
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Form>
          <hr />
          {searchUserResult && <UserList users={searchUserResult} />}
        </Jumbotron>
        <UserList
          users={friendListData}
          heading="Friends"
          action={unfriendFriend}
          actionText="Unfriend"
          actionColor="danger"
        />
        <UserList
          users={sentRequestData}
          heading="Sent Requests"
          action={removeFriendRequest}
          actionText="Take Back Request"
          actionColor="warning"
        />
        <UserList
          users={receivedRequestData}
          heading="Received Requests"
          action={acceptFriendRequest}
          actionText="Accept"
          actionColor="primary"
        />
      </div>
    );
  }
};

const UserList = ({ users, heading, action, actionText, actionColor }) => (
  <ListGroup>
    {heading && <ListGroupItemHeading>{heading}</ListGroupItemHeading>}
    {users && users.length > 0 ? (
      users.map((u) => (
        <ListGroupItem key={u.uid}>
          <ProfileHead src={u.profileImageSrc} size="friend" />
          {"  "}
          <Link to={`/u/${u.uid}`}>{u.username}</Link>
          {"  "}
          {action && (
            <Button
              size="sm"
              color={actionColor}
              onClick={() => action({ targetUid: u.uid })}
            >
              {actionText}
            </Button>
          )}
        </ListGroupItem>
      ))
    ) : (
      <ListGroupItem>Wow, such empty</ListGroupItem>
    )}
  </ListGroup>
);

export default Friend;
