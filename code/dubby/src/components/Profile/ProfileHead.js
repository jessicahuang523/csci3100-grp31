import React from "react";
import User from "../../image/user.svg";

const styles = {
  chat: {
    container: { textAlign: "center" },
    img: {
      width: "60px",
      height: "60px",
      overflow: "hidden",
      borderRadius: "30px",
      border: "2px solid #eee",
    },
  },
  profile: {
    container: { textAlign: "center", display: "block" },
    img: {
      width: "300px",
      height: "300px",
      overflow: "hidden",
      borderRadius: "150px",
      border: "5px solid #eee",
    },
  },
  friend: {
    container: { textAlign: "center" },
    img: {
      width: "2rem",
      height: "2rem",
      overflow: "hidden",
      borderRadius: "1rem",
      border: "1px solid #eee",
    },
  },
  inline: {
    container: { textAlign: "center" },
    img: {
      width: "1rem",
      height: "1rem",
      overflow: "hidden",
      borderRadius: "0.5rem",
      border: "1px solid #eee",
    },
  },
  default: {
    container: { display: "none" },
    img: { display: "none" },
  },
};

const ProfileHead = ({ src, size }) => {
  let style;
  switch (size) {
    case "chat":
      style = styles.chat;
      break;
    case "profile":
      style = styles.profile;
      break;
    case "friend":
      style = styles.friend;
      break;
    case "inline":
      style = styles.inline;
      break;
    default:
      style = styles.default;
      break;
  }

  return (
    <span style={style.container}>
      <img src={src || User} style={style.img} alt="" />
    </span>
  );
};

export default ProfileHead;
