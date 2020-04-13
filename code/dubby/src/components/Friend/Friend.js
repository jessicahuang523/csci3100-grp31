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
import { acceptFriendRequest } from "../../utilityfunctions/Utilities";

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
      <ListGroup>
        <ListGroupItemHeading>Friends</ListGroupItemHeading>
        {friendList && friendList.length > 0 ? (
          friendList.map((u) => (
            <ListGroupItem key={u.uid}>
              <Link to={`/u/${u.uid}`}>{u.username}</Link>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>Wow, such empty</ListGroupItem>
        )}
      </ListGroup>
      <ListGroup>
        <ListGroupItemHeading>Sent Requests</ListGroupItemHeading>
        {sentRequests && sentRequests.length > 0 ? (
          sentRequests.map((u) => (
            <ListGroupItem key={u.uid}>
              <Link to={`/u/${u.uid}`}>{u.username}</Link>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>Wow, such empty</ListGroupItem>
        )}
      </ListGroup>
      <ListGroup>
        <ListGroupItemHeading>Received Requests</ListGroupItemHeading>
        {receivedRequests && receivedRequests.length > 0 ? (
          receivedRequests.map((u) => (
            <ListGroupItem key={u.uid}>
              <Link to={`/u/${u.uid}`}>{u.username}</Link>
              <Button onClick={() => acceptFriendRequest({ targetUid: u.uid })}>
                Accept
              </Button>
            </ListGroupItem>
          ))
        ) : (
          <ListGroupItem>Wow, such empty</ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
};

export default Friend;
