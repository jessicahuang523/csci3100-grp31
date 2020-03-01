import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const User = () => {
  return <div>User page</div>;
};

export const UserDetails = () => {
  const { uid } = useParams();
  const {
    userLoggedin,
    name,
    biography,
    profile_pic_url,
    username
  } = useContext(UserContext);

  if (!userLoggedin) {
    return <Redirect to="/u" />;
  } else {
    return (
      <div>
        <h3>{name}</h3>
        <p>{biography}</p>
        <img alt="profile pic" src={profile_pic_url} />
        <p>{username}</p>
        <p>user id = {uid}</p>
      </div>
    );
  }
};

export default User;
