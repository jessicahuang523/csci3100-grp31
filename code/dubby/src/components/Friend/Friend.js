import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { FriendContext } from "../../contexts/FriendContext";
import {
  Jumbotron,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
} from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import {
  acceptFriendRequest,
  removeFriendRequest,
  unfriendFriend,
} from "../../utilityfunctions/Utilities";

const Friend = () => {
  const { userData, userLoading } = useContext(UserContext);
  const { sentRequests, receivedRequests, friendList } = useContext(
    FriendContext
  );

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  }
  return (
    <div>
      <NavBar />
      <Jumbotron>
        <h1>Friends</h1>
      </Jumbotron>
      <UserList
        users={friendList}
        heading="Friends"
        action={unfriendFriend}
        actionText="Unfriend"
        actionColor="danger"
      />
      <UserList
        users={sentRequests}
        heading="Sent Requests"
        action={removeFriendRequest}
        actionText="Take Back Request"
        actionColor="warning"
      />
      <UserList
        users={receivedRequests}
        heading="Received Requests"
        action={acceptFriendRequest}
        actionText="Accept"
        actionColor="primary"
      />
    </div>
  );
};

const UserList = ({ users, heading, action, actionText, actionColor }) => (
  <ListGroup>
    <ListGroupItemHeading>{heading}</ListGroupItemHeading>
    {users && users.length > 0 ? (
      users.map((u) => (
        <ListGroupItem key={u.uid}>
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
