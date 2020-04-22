import React from "react";
import { Link } from "react-router-dom";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Button,
} from "reactstrap";
import ProfileHead from "../Profile/ProfileHead";

const UserList = ({
  users,
  heading,
  action,
  actionIcon,
  actionText,
  actionColor,
}) => (
  <ListGroup>
    {heading && <ListGroupItemHeading>{heading}</ListGroupItemHeading>}
    {/* display list of user when not empty, or "Wow, such empty" */}
    {users && users.length > 0 ? (
      users.map((u) => (
        <ListGroupItem key={u.uid}>
          {/* displays action button when an action is provided */}
          {action && (actionIcon || actionText) && (
            <Button
              size="sm"
              color={actionColor}
              onClick={() => action({ targetUid: u.uid })}
            >
              {actionIcon && <i className={actionIcon}></i>}
              {actionIcon && " "}
              {actionText}
            </Button>
          )}
          {/* display for user profile image and link to profile */}
          {"  "}
          <ProfileHead src={u.profileImageSrc} size="friend" />
          {"  "}
          <Link to={`/u/${u.uid}`}>{u.username}</Link>
        </ListGroupItem>
      ))
    ) : (
      <ListGroupItem>Wow, such empty</ListGroupItem>
    )}
  </ListGroup>
);

export default UserList;
