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

  function enableEditProfile() {
    setIsEditable(!isEditable);
  }

  async function persistProfileData() {
    enableEditProfile();
    await firestore()
      .collection("user_profile")
      .doc(uid ? uid : auth().currentUser.uid)
      .set(profileData);
  }

  function updateProfileData(key, value) {
    const newProfileData = { ...profileData, [key]: value };
    setProfileData(newProfileData);
  }

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!profileData) {
    return <Loading />;
  } else {
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
          {isEditable ? (
            <Button type={"primary"} onClick={() => persistProfileData()}>
              Save
            </Button>
          ) : (
            <Button type={"dashed"} onClick={() => enableEditProfile()}>
              Edit
            </Button>
          )}
          <h4 style={{ marginTop: "50px" }}>Username:</h4>
          <Input
            disabled={!isEditable}
            onChange={event =>
              updateProfileData("username", event.target.value)
            }
            value={profileData.username}
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Username Input">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
          <hr />
          <h4 style={{ marginTop: "50px" }}>Personal Description:</h4>
          <TextArea
            disabled={!isEditable}
            onChange={event =>
              updateProfileData("description", event.target.value)
            }
            value={profileData.description}
          />
          <hr />
          <h4 style={{ marginTop: "50px" }}>University:</h4>
          <Input
            disabled={!isEditable}
            onChange={event =>
              updateProfileData("university", event.target.value)
            }
            value={profileData.university}
          />
          <hr />
          <h2 style={{ marginTop: "50px" }}>Sports</h2>
          <Input.Group compact>
            <Select
              disabled={!isEditable}
              defaultValue={
                profileData.interested_sports || "Select your sport..."
              }
              onChange={value => updateProfileData("interested_sports", value)}
            >
              <Option value="Football">Football</Option>
              <Option value="Waterpolo">Waterpolo</Option>
            </Select>
          </Input.Group>
          <hr />
        </div>
      </div>
    );
  }
};
export default ProfilePage;
