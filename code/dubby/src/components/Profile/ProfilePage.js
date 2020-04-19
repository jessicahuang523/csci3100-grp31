import React, { useState, useContext, useEffect } from "react";
import { auth, firestore } from "firebase";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import { Button, Input, Form, Row, Col } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import ProfileHead from "./ProfileHead";
import Loading from "../Loading/Loading";
import EditProfileImage from "./EditProfileImage";
import {
  sendFriendRequest,
  updateProfileData,
  acceptFriendRequest,
  unfriendFriend,
  removeFriendRequest,
} from "../../utilityfunctions/Utilities";

const ProfilePage = () => {
  const { uid } = useParams();

  const { userData, userLoading } = useContext(UserContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const {
    sentRequestData,
    receivedRequestData,
    friendListData,
    friendContextLoaded,
  } = useContext(FriendContext);
  const { theme } = useContext(ThemeContext);

  const [profileData, setProfileData] = useState();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (uid) {
      firestore()
        .collection("user_profile")
        .doc(uid)
        .get()
        .then((s) => {
          setProfileData(s.data());
        });
    } else {
      setProfileData(userData);
    }
  }, [userData, uid]);

  const toggleIsEditable = () => setIsEditable(!isEditable);

  const handleProfileDataSubmit = async () => {
    toggleIsEditable();
    if (profileData !== userData) {
      await updateProfileData({ profileData });
    }
  };

  const handleProfileDataEdit = (key, value) => {
    const newProfileData = {
      ...profileData,
      [key]: value,
    };
    setProfileData(newProfileData);
  };

  const handleInterestedSportsEdit = (e) => {
    const selected = e.target.querySelectorAll("option:checked");
    const values = Array.from(selected).map((o) => o.label);
    handleProfileDataEdit("interested_sports", values);
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!profileData || !eventTypeData || !friendContextLoaded) {
    return <Loading />;
  } else if (uid !== auth().currentUser.uid && isEditable) {
    // in editing mode
    const { username, description, university, profileImageSrc } = profileData;
    return (
      <div style={theme.background}>
        <NavBar />
        <div style={{ marginBottom: "2rem", marginTop: "6rem" }}>
          <ProfileHead src={profileImageSrc} size="profile" />
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              <Form onSubmit={handleProfileDataSubmit}>
                <h2 style={{ marginTop: "50px" }}>Username</h2>
                <hr />
                <Input
                  onChange={(e) =>
                    handleProfileDataEdit("username", e.target.value)
                  }
                  value={username}
                />
                <h2 style={{ marginTop: "50px" }}>Personal Description</h2>
                <hr />
                <Input
                  onChange={(e) =>
                    handleProfileDataEdit("description", e.target.value)
                  }
                  value={description}
                />
                <h2 style={{ marginTop: "50px" }}>University</h2>
                <hr />
                <Input
                  onChange={(e) =>
                    handleProfileDataEdit("university", e.target.value)
                  }
                  value={university}
                />
                <h2 style={{ marginTop: "50px" }}>Sports</h2>
                <hr />
                <Input
                  type="select"
                  multiple="multiple"
                  onChange={handleInterestedSportsEdit}
                >
                  {eventTypeData.map(({ value, display }) => (
                    <option key={value} value={value}>
                      {display}
                    </option>
                  ))}
                </Input>
                <hr />
                <EditProfileImage />
                <hr />
                <Button block type="submit">
                  {profileData !== userData ? "Save" : "Cancel"}
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  } else {
    // in viewing mode
    // button shows "add friend" if not self, otherwise show "edit"
    const {
      username,
      description,
      interested_sports,
      university,
      profileImageSrc,
    } = profileData;
    return (
      <div style={theme.background}>
        <NavBar />
        <div style={{ marginBottom: "2rem", marginTop: "6rem" }}>
          <ProfileHead src={profileImageSrc} size="profile" />
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              <h2 style={{ marginTop: "50px" }}>Username</h2>
              <hr />
              <p>{username}</p>
              <h2 style={{ marginTop: "50px" }}>Personal Description</h2>
              <hr />
              <p>{description}</p>
              <h2 style={{ marginTop: "50px" }}>University</h2>
              <hr />
              <p>{university}</p>
              <h2 style={{ marginTop: "50px" }}>Interested In</h2>
              <hr />{" "}
              {interested_sports.length &&
              interested_sports.length > 0 &&
              interested_sports.map !== undefined ? (
                <ul>
                  {interested_sports.map((s) => (
                    <li key={s}>
                      {eventTypeData.find((c) => c.display === s) && (
                        <i
                          className={
                            eventTypeData.find((c) => c.display === s).icon
                          }
                        ></i>
                      )}{" "}
                      {s}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{interested_sports}</p>
              )}
              <hr />
              <ProfileActionButton
                uid={uid}
                toggleIsEditable={toggleIsEditable}
                friendListData={friendListData}
                sentRequestData={sentRequestData}
                receivedRequestData={receivedRequestData}
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

const ProfileActionButton = ({
  uid,
  toggleIsEditable,
  friendListData,
  sentRequestData,
  receivedRequestData,
}) => {
  if (uid && uid !== auth().currentUser.uid) {
    if (friendListData && friendListData.find((p) => p.uid === uid)) {
      return (
        <Button
          block
          color="danger"
          onClick={() => unfriendFriend({ targetUid: uid })}
        >
          Unfriend
        </Button>
      );
    } else if (sentRequestData && sentRequestData.find((p) => p.uid === uid)) {
      return (
        <Button
          block
          color="warning"
          onClick={() => removeFriendRequest({ targetUid: uid })}
        >
          Unrequest
        </Button>
      );
    } else if (
      receivedRequestData &&
      receivedRequestData.find((p) => p.uid === uid)
    ) {
      return (
        <Button
          block
          color="primary"
          onClick={() => acceptFriendRequest({ targetUid: uid })}
        >
          Confirm Friend
        </Button>
      );
    } else {
      return (
        <Button
          block
          color="primary"
          onClick={() => sendFriendRequest({ targetUid: uid })}
        >
          Add Friend
        </Button>
      );
    }
  } else
    return (
      <Button block onClick={() => toggleIsEditable()}>
        Edit
      </Button>
    );
};
export default ProfilePage;
