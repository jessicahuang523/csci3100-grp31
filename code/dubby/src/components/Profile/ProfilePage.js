import React, { useState, useEffect, useContext } from "react";
import { firestore, auth } from "firebase";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { Button, Input, Form, Row, Col } from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EditProfileImage from "./EditProfileImage";
import {
  sendFriendRequest,
  updateProfileData,
} from "../../utilityfunctions/Utilities";
import self from "../../self.jpg";

const ProfilePage = () => {
  const { uid } = useParams();

  const { userData, userLoading } = useContext(UserContext);

  const [profileData, setProfileData] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [eventTypeChoices, setEventTypeChoices] = useState();

  useEffect(() => {
    firestore()
      .collection("event_types")
      .get()
      .then((snap) => {
        let tmp = [];
        snap.forEach((d) => tmp.push(d.data()));
        setEventTypeChoices(tmp);
      });
  }, []);

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
  } else if (!profileData || !eventTypeChoices) {
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
                  {eventTypeChoices.map(({ value, display }) => (
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
              {uid && uid !== auth().currentUser.uid ? (
                <Button
                  block
                  onClick={() => sendFriendRequest({ targetUid: uid })}
                >
                  Add friend
                </Button>
              ) : (
                <Button block onClick={() => toggleIsEditable()}>
                  Edit
                </Button>
              )}
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
              {interested_sports.length && interested_sports.length > 0 ? (
                <p>
                  {interested_sports.map((s) =>
                    interested_sports.indexOf(s) ===
                    interested_sports.length - 1
                      ? s
                      : `${s}, `
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

export default ProfilePage;
