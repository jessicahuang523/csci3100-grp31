import React, { useState, useEffect, useContext } from "react";
import { Grid, Cell } from "react-mdl";
import self from "../../self.jpg";
import { firestore, auth } from "firebase";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const ProfilePage = () => {
  const { uid } = useParams();

  const { userIsLoggedin } = useContext(UserContext);

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if (userIsLoggedin) {
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
  }, [userIsLoggedin, uid]);

  useEffect(() => {
    console.log({ profileData });
  }, [profileData]);

  if (profileData) {
    return (
      <div className="main-container">
        <Grid>
          <Cell col={6} className="resume-left-col">
            <div style={{ textAlign: "center" }}>
              <img src={self} alt="self" className="resume-pic" />
            </div>
            <h2 style={{ marginTop: "50px" }}>{profileData.username}</h2>
            <h4>XXX</h4>
            <hr style={{ borderTop: "3px solid #D9993C", width: "60%" }} />
            <p>{profileData.description}</p>
          </Cell>
          <Cell
            col={6}
            className="resume-right-col"
            style={{ paddingLeft: "30px", paddingRight: "30px" }}
          >
            <h2 style={{ marginTop: "50px" }}>University</h2>
            <br />
            <p>{profileData.university}</p>
            <hr
              style={{
                borderTop: "3px solid #D9993C",
                width: "90%",
                margin: "auto"
              }}
            />
            <h2 style={{ marginTop: "50px" }}>Sports</h2>
            <p>{profileData.interested_sports}</p>
            <hr
              style={{
                borderTop: "3px solid #D9993C",
                width: "90%",
                margin: "auto"
              }}
            />
          </Cell>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className="main-container">
        <h3>user id: {uid}</h3>
        <h3>Loading... (or this user doesn't exist)</h3>
      </div>
    );
  }
};
export default ProfilePage;
