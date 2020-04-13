import React, { useState, useEffect, useContext } from "react";
import { firestore, auth } from "firebase";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import { FriendContext } from "../../contexts/FriendContext";
import { Button, Input, Form, Row, Col } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EditProfileImage from "./EditProfileImage";
import {
  sendFriendRequest,
  updateProfileData,
  acceptFriendRequest,
  unfriendFriend,
  removeFriendRequest,
} from "../../utilityfunctions/Utilities";
import self from "../../self.jpg";

const ProfilePage = () => {
  const { uid } = useParams();

  const { userData, userLoading } = useContext(UserContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const { sentRequests, receivedRequests, friendList } = useContext(
    FriendContext
  );

  const [profileData, setProfileData] = useState();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (userData) {
      const profileDataRef = firestore()
        .collection("user_profile")
        .doc(uid ? uid : auth().currentUser.uid);
      const unsubscribeProfileData = profileDataRef.onSnapshot((snap) =>
        setProfileData(snap.data())
      );
      return () => {
        unsubscribeProfileData();
      };
    }
  }, [userData, uid]);

  const toggleIsEditable = () => setIsEditable(!isEditable);

  const handleProfileDataSubmit = async () => {
    toggleIsEditable();
    await updateProfileData({ profileData });
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
  } else if (
    !profileData ||
    !eventTypeData ||
    !sentRequests ||
    !receivedRequests ||
    !friendList
  ) {
    return <Loading />;
  } else if (uid !== auth().currentUser.uid && isEditable) {
    // in editing mode
    const { username, description, university, profileImageSrc } = profileData;
    return (
      <div>
        <NavBar />
        <div>
          <div style={{ textAlign: "center" }}>
            <img
              src={profileImageSrc || self}
              alt="self"
              style={{
                width: "300px",
                height: "300px",
                overflow: "hidden",
                borderRadius: "150px",
              }}
            />
          </div>
          <br />
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              <EditProfileImage />
              <hr />
              <Form onSubmit={handleProfileDataSubmit}>
                <Button block type="submit">
                  Save
                </Button>
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
                  multiple
                  onChange={handleInterestedSportsEdit}
                >
                  {eventTypeData.map(({ value, display }) => (
                    <option key={value} value={value}>
                      {display}
                    </option>
                  ))}
                </Input>
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
      <div>
        <NavBar />
        <div>
          <div style={{ textAlign: "center" }}>
            <img
              src={profileImageSrc || self}
              alt="self"
              style={{
                width: "300px",
                height: "300px",
                overflow: "hidden",
                borderRadius: "150px",
              }}
            />
          </div>
          <br />
          <Row>
            <Col sm={{ size: 8, offset: 2 }}>
              <ProfileActionButton
                uid={uid}
                toggleIsEditable={toggleIsEditable}
                friendList={friendList}
                sentRequests={sentRequests}
                receivedRequests={receivedRequests}
              />
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
              <hr />
              {interested_sports.length &&
              interested_sports.length > 0 &&
              interested_sports.map !== undefined ? (
                <p>
                  {interested_sports.map((s) =>
                    interested_sports.indexOf(s) ===
                    interested_sports.length - 1 ? (
                      <span key={s}>
                        <i
                          className={
                            eventTypeData.find((c) => c.display === s).icon
                          }
                        ></i>{" "}
                        {s}
                      </span>
                    ) : (
                      <span key={s}>
                        <i
                          className={
                            eventTypeData.find((c) => c.display === s).icon
                          }
                        ></i>
                        {s},{" "}
                      </span>
                    )
                  )}
                </p>
              ) : (
                <p>{interested_sports}</p>
              )}
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
  friendList,
  sentRequests,
  receivedRequests,
}) => {
  if (uid && uid !== auth().currentUser.uid) {
    if (friendList.find((p) => p.uid === uid)) {
      return (
        <Button
          block
          color="danger"
          onClick={() => unfriendFriend({ targetUid: uid })}
        >
          Unfriend
        </Button>
      );
    } else if (sentRequests.find((p) => p.uid === uid)) {
      return (
        <Button block onClick={() => removeFriendRequest({ targetUid: uid })}>
          Unrequest friend
        </Button>
      );
    } else if (receivedRequests.find((p) => p.uid === uid)) {
      return (
        <Button block onClick={() => acceptFriendRequest({ targetUid: uid })}>
          Confirm Friend
        </Button>
      );
    } else {
      return (
        <Button block onClick={() => sendFriendRequest({ targetUid: uid })}>
          Add friend
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
