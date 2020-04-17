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
    {users && users.length > 0 ? (
      users.map((u) => (
        <ListGroupItem key={u.uid}>
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
