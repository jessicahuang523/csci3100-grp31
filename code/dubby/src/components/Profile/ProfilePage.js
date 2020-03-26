import React, { useState, useEffect, useContext } from "react";
import self from "../../self.jpg";
import { firestore, auth } from "firebase";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import { Input, Select, Tooltip, Button } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import "./ProfilePage.css";
import {
  sendFriendRequest,
  updateProfileData
} from "../../utilityfunctions/Utilities";

const { Option } = Select;
const { TextArea } = Input;

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
      university
    } = profileData;
    return (
      <div>
        <NavBar />
        <div className="profile">
          <div style={{ textAlign: "center" }}>
            <img
              src={self}
              alt="self"
              className="resume-pic"
              style={{ width: "300px", borderRadius: "150px" }}
            />
          </div>
          <Button type="primary" onClick={() => handleProfileDataSubmit()}>
            Save
          </Button>
          <h2 style={{ marginTop: "50px" }}>Username</h2>
          <hr />
          <Input
            onChange={e => handleProfileDataEdit("username", e.target.value)}
            value={username}
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Username Input">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <h2 style={{ marginTop: "50px" }}>Personal Description</h2>
          <hr />
          <TextArea
            onChange={e => handleProfileDataEdit("description", e.target.value)}
            value={description}
          />
          <h2 style={{ marginTop: "50px" }}>University</h2>
          <hr />
          <Input
            onChange={e => handleProfileDataEdit("university", e.target.value)}
            value={university}
          />
          <h2 style={{ marginTop: "50px" }}>Sports</h2>
          <hr />
          <Input.Group compact>
            <Select
              defaultValue={interested_sports || "Select your sport..."}
              onChange={value =>
                handleProfileDataEdit("interested_sports", value)
              }
            >
              <Option value="Football">Football</Option>
              <Option value="Waterpolo">Waterpolo</Option>
            </Select>
          </Input.Group>
          <br />
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
      university
    } = profileData;
    return (
      <div>
        <NavBar />
        <div className="profile">
          <div style={{ textAlign: "center" }}>
            <img
              src={self}
              alt="self"
              className="resume-pic"
              style={{ width: "300px", borderRadius: "150px" }}
            />
          </div>
          {uid && uid !== auth().currentUser.uid ? (
            <Button onClick={() => sendFriendRequest({ targetUid: uid })}>
              add friend
            </Button>
          ) : (
            <Button type="dashed" onClick={() => toggleIsEditable()}>
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
          <br />
        </div>
      </div>
    );
  }
};

export default ProfilePage;
