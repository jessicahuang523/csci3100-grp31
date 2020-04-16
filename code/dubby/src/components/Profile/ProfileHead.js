import React from "react";

const styles = {
  chat: {
    container: { textAlign: "center" },
    img: {
      width: "70px",
      height: "70px",
      overflow: "hidden",
      borderRadius: "35px",
      border: "1px solid #555",
    },
    noImg: {
      fontSize: "50px",
    },
  },
  profile: {
    container: { textAlign: "center", display: "block" },
    img: {
      width: "300px",
      height: "300px",
      overflow: "hidden",
      borderRadius: "150px",
    },
    noImg: { fontSize: "220px", margin: "40px" },
  },
  friend: {
    container: { textAlign: "center" },
    img: {
      width: "2rem",
      height: "2rem",
      overflow: "hidden",
      borderRadius: "1rem",
    },
    noImg: { fontSize: "1.8rem", margin: "0.1rem" },
  },
  inline: {
    container: { textAlign: "center" },
    img: {
      width: "1rem",
      height: "1rem",
      overflow: "hidden",
      borderRadius: "0.5rem",
    },
    noImg: { fontSize: "0.9rem", margin: "0.05rem" },
  },
  default: {
    container: { display: "none" },
    img: { display: "none" },
    noImg: { display: "none" },
  },
};

const ProfileHead = ({ src, size }) => {
  let style = styles.profile;
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

  if (src) {
    return (
      <span style={style.container}>
        <img src={src} style={style.img} alt="" />
      </span>
    );
  } else {
    return (
      <span style={style.container}>
        <i className="fas fa-user" style={style.noImg}></i>
      </span>
    );
  }
};

export default ProfileHead;
