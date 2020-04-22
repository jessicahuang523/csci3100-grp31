import React, { useState, useContext, useEffect } from "react";
import { auth, firestore } from "firebase";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FriendContext } from "../../contexts/FriendContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import {
  Button,
  Input,
  Label,
  Form,
  FormGroup,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  CardFooter,
} from "reactstrap";
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

  const { theme } = useContext(ThemeContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const { userData, userLoading } = useContext(UserContext);
  const { friendContextLoaded } = useContext(FriendContext);

  // loaded user data which gets updated in editing mode
  const [profileData, setProfileData] = useState();
  // switch between viewing and editing mode
  const [isEditable, setIsEditable] = useState(false);

  // subscribe to user data from /user_profile/{uid} if uid is provided
  // else loads data from user context
  // updates profileData
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

  // writes edit to database if there's any change
  // (profileData is different from userData)
  const handleProfileDataSubmit = async (e) => {
    e.preventDefault();
    toggleIsEditable();
    if (profileData !== userData) {
      await updateProfileData({ profileData });
    }
  };

  // updates profileData given new keys and value
  const handleProfileDataEdit = (e, key) => {
    const newProfileData = {
      ...profileData,
      [key]: e.target.value,
    };
    console.log({ newProfileData });

    setProfileData(newProfileData);
  };

  // pushes checked input value into profileData.interested_sports
  // or removes unchecked input value from it
  // calls handleProfileDataEdit() to update profileData
  const handleInterestedSportsEdit = (e) => {
    const compare = (a, b) => {
      if (a === "others") {
        return 1;
      } else if (b === "others") {
        return -1;
      } else {
        return a.localeCompare(b);
      }
    };

    let tmp = profileData.interested_sports || [];
    if (e.target.checked) {
      tmp.push(e.target.value);
      tmp = tmp.filter(
        (value, index, a) =>
          a.indexOf(value) === index &&
          eventTypeData.find((t) => t.value === value)
      );
      tmp.sort(compare);
    } else {
      tmp.splice(tmp.indexOf(e.target.value), 1);
    }
    handleProfileDataEdit("interested_sports", tmp);
  };

  // render
  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!profileData || !eventTypeData || !friendContextLoaded) {
    return <Loading />;
  } else if (uid !== auth().currentUser.uid && isEditable) {
    // Editing mode
    const { interested_sports, profileImageSrc } = profileData;

    return (
      <div style={theme.background}>
        <NavBar />
        <div style={{ marginBottom: "2rem", marginTop: "6rem" }}>
          <ProfileHead src={profileImageSrc} size="profile" />
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
              <Form onSubmit={handleProfileDataSubmit}>
                {["username", "description", "university"].map((id) => (
                  <FormGroup key={id}>
                    <Label for={id} style={{ textTransform: "capitalize" }}>
                      {id}
                    </Label>
                    <Input
                      id={id}
                      required
                      value={profileData[id]}
                      onChange={(e) => handleProfileDataEdit(e, id)}
                    />
                  </FormGroup>
                ))}
                <FormGroup>
                  <Label for="interested_sports">Interested In</Label>
                  {eventTypeData.map(({ value, display, icon }) => (
                    <FormGroup check key={display}>
                      <Label check>
                        <Input
                          value={value}
                          type="checkbox"
                          onChange={handleInterestedSportsEdit}
                          checked={interested_sports.indexOf(value) > -1}
                        />
                        <i className={icon}></i> {display}
                      </Label>
                    </FormGroup>
                  ))}
                </FormGroup>
                <hr />
                <EditProfileImage />
                <hr />
                {profileData === userData ? (
                  <Button block type="submit">
                    <i className="fas fa-times"></i> Cancel
                  </Button>
                ) : (
                  <Button block type="submit">
                    <i className="fas fa-save"></i> Save
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </div>
        {/* <div style={{ marginBottom: "2rem", marginTop: "6rem" }}>
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
                <h2 style={{ marginTop: "50px" }}>Interested In</h2>
                <hr />
                {eventTypeData.map(({ value, display, icon }) => (
                  <FormGroup check key={display}>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={
                          profileData.interested_sports.indexOf(value) > -1
                        }
                        value={value}
                        onChange={handleInterestedSportsEdit}
                      />
                      <i className={icon}></i> {display}
                    </Label>
                  </FormGroup>
                ))}
                <hr />
                <EditProfileImage />
                <hr />
                {profileData === userData ? (
                  <Button block type="submit">
                    <i className="fas fa-times"></i> Cancel
                  </Button>
                ) : (
                  <Button block type="submit">
                    <i className="fas fa-save"></i> Save
                  </Button>
                )}
              </Form>
            </Col>
          </Row>
        </div> */}
      </div>
    );
  } else {
    // Viewing mode
    // const {
    //   username,
    //   description,
    //   interested_sports,
    //   university,
    //   profileImageSrc,
    // } = profileData;

    return (
      <div style={theme.background}>
        <NavBar />
        <div style={theme.profileContainer}>
          <ProfileDataCard
            profileData={profileData}
            uid={uid}
            toggleIsEditable={toggleIsEditable}
          />
        </div>
        {/* <div style={{ marginBottom: "2rem", marginTop: "6rem" }}>
          <ProfileHead src={profileImageSrc} size="profile" />
          <Row>
            <Col sm={{ size: 10, offset: 1 }}>
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
        </div> */}
      </div>
    );
  }
};

// card in rendering profile data
const ProfileDataCard = ({ uid, profileData, toggleIsEditable }) => {
  const { isPrimaryTheme } = useContext(ThemeContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const { sentRequestData, receivedRequestData, friendListData } = useContext(
    FriendContext
  );

  const {
    username,
    description,
    interested_sports,
    university,
    profileImageSrc,
  } = profileData;

  // render
  return (
    <Card inverse={!isPrimaryTheme} color={!isPrimaryTheme ? "dark" : null}>
      <CardBody style={{ padding: "5rem 1.25rem" }} className="text-center">
        <ProfileHead src={profileImageSrc} size="profile" />
        <CardTitle tag="h2">
          <b>{username}</b>
        </CardTitle>
        <CardSubtitle>
          <i>{description}</i>
        </CardSubtitle>
        <hr />
        <CardText>From {university}</CardText>
        {interested_sports.map !== undefined && interested_sports.length > 0 ? (
          <ul>
            {interested_sports.map((value) => {
              const eventType = eventTypeData.find(
                (type) => type.value === value
              );
              if (eventType) {
                const { display, icon } = eventType;
                return (
                  <li key={value}>
                    <i className={icon}></i> {display}
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        ) : (
          <CardText>(this person likes nothing)</CardText>
        )}
      </CardBody>
      <CardFooter>
        <ProfileActionButton
          uid={uid}
          toggleIsEditable={toggleIsEditable}
          friendListData={friendListData}
          sentRequestData={sentRequestData}
          receivedRequestData={receivedRequestData}
        />
      </CardFooter>
    </Card>
  );
};

// calculates and renders correct action button on the bottom of profile page
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
          <i className="fas fa-trash"></i> Unfriend
        </Button>
      );
    } else if (sentRequestData && sentRequestData.find((p) => p.uid === uid)) {
      return (
        <Button
          block
          color="warning"
          onClick={() => removeFriendRequest({ targetUid: uid })}
        >
          <i className="fas fa-minus"></i> Unrequest
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
          <i className="fas fa-user-friends"></i> Accept Request
        </Button>
      );
    } else {
      return (
        <Button
          block
          color="primary"
          onClick={() => sendFriendRequest({ targetUid: uid })}
        >
          <i className="fas fa-plus"></i> Add Friend
        </Button>
      );
    }
  } else
    return (
      <Button block onClick={() => toggleIsEditable()}>
        <i className="fas fa-edit"></i> Edit
      </Button>
    );
};
export default ProfilePage;
