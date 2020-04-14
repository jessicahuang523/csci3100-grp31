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
    container: { textAlign: "center" },
    img: {
      width: "300px",
      height: "300px",
      overflow: "hidden",
      borderRadius: "150px",
    },
    noImg: { fontSize: "220px", margin: "40px" },
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
    default:
      style = styles.default;
      break;
  }

  if (src) {
    return (
      <div style={style.container}>
        <img src={src} style={style.img} alt="" />
      </div>
    );
  } else {
    return (
      <div style={style.container}>
        <i className="fas fa-user" style={style.noImg}></i>
      </div>
    );
  }
};

export default ProfileHead;
