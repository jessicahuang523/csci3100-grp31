import React, { useState, useEffect, useContext } from "react";
import self from "../../self.jpg";
import { firestore, auth } from "firebase";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import {
  sendFriendRequest,
  updateProfileData
} from "../../utilityfunctions/Utilities";
import EditProfileImage from "./EditProfileImage";
import { Button, Input, Form, Row, Col } from "reactstrap";

const ProfilePage = () => {
  const { uid } = useParams();

  const { userData, userLoading } = useContext(UserContext);

  const [profileData, setProfileData] = useState();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    if (userData) {
      const profileDataRef = firestore()
        .collection("user_profile")
        .doc(uid ? uid : auth().currentUser.uid);
      const unsubscribeProfileData = profileDataRef.onSnapshot(snap =>
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
      [key]: value
    };
    setProfileData(newProfileData);
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!profileData) {
    return <Loading />;
  } else if (uid !== auth().currentUser.uid && isEditable) {
    // in editing mode
    const {
      username,
      description,
      interested_sports,
      university,
      profileImageSrc
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
                borderRadius: "150px"
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
                  onChange={e =>
                    handleProfileDataEdit("username", e.target.value)
                  }
                  value={username}
                />
                <h2 style={{ marginTop: "50px" }}>Personal Description</h2>
                <hr />
                <Input
                  onChange={e =>
                    handleProfileDataEdit("description", e.target.value)
                  }
                  value={description}
                />
                <h2 style={{ marginTop: "50px" }}>University</h2>
                <hr />
                <Input
                  onChange={e =>
                    handleProfileDataEdit("university", e.target.value)
                  }
                  value={university}
                />
                <h2 style={{ marginTop: "50px" }}>Sports</h2>
                <hr />
                <Input
                  type="select"
                  defaultValue={interested_sports || "Select your sport..."}
                  onChange={value =>
                    handleProfileDataEdit("interested_sports", value)
                  }
                >
                  <option value="Football">Football</option>
                  <option value="Waterpolo">Waterpolo</option>
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
      profileImageSrc
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
                borderRadius: "150px"
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
              <h2 style={{ marginTop: "50px" }}>Sports</h2>
              <hr />
              <p>{interested_sports}</p>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
};

export default ProfilePage;
