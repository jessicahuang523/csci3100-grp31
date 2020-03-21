import React, {useState, useEffect, useContext} from "react";
import {Grid, Cell, Layout} from "react-mdl";
import self from "../../self.jpg";
import {firestore, auth} from "firebase";
import {useParams, Redirect} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import NavBar from "../Navbar/Navbar";

const ProfilePage = () => {
  const {uid} = useParams();

  const {userData, userLoading} = useContext(UserContext);

  const [profileData, setProfileData] = useState();

  useEffect(() => {
    if (userData) {
      const profileDataRef = firestore().collection("user_profile").doc(
        uid
        ? uid
        : auth().currentUser.uid);
      const unsubscribeProfileData = profileDataRef.onSnapshot(snap => setProfileData(snap.data()));
      return() => {
        unsubscribeProfileData();
      };
    }
  }, [userData, uid]);

  if (userLoading) {
    return (<div>
      <h1>Loading...</h1>
    </div>);
  } else if (!userData) {
    return <Redirect to="/launch"/>;
  } else if (!profileData) {
    return (<div>
      <h1>Loading...</h1>
      <h3>user id: {uid}</h3>
    </div>);
  } else {
    return (<div>
      <NavBar/>
      <div className="main-container">
        <Layout>
          <Grid>
            <Cell col={6} className="resume-left-col">
              <div style={{
                  textAlign: "center"
                }}>
                <img src={self} alt="self" className="resume-pic" style={{
                    width: "300px",
                    borderRadius: "150px"
                  }}/>
              </div>
              <h2 style={{
                  marginTop: "50px"
                }}>{profileData.username}</h2>
              <h4>XXX</h4>
              <hr style={{
                  borderTop: "3px solid #D9993C",
                  width: "60%"
                }}/>
              <p>{profileData.description}</p>
            </Cell>
            <Cell col={6} className="resume-right-col" style={{
                paddingLeft: "30px",
                paddingRight: "30px"
              }}>
              <h2 style={{
                  marginTop: "50px"
                }}>University</h2>
              <br/>
              <p>{profileData.university}</p>
              <hr style={{
                  borderTop: "3px solid #D9993C",
                  width: "90%",
                  margin: "auto"
                }}/>
              <h2 style={{
                  marginTop: "50px"
                }}>Sports</h2>
              <p>{profileData.interested_sports}</p>
              <hr style={{
                  borderTop: "3px solid #D9993C",
                  width: "90%",
                  margin: "auto"
                }}/>
            </Cell>
          </Grid>
        </Layout>
      </div>
    </div>);
  }
};
export default ProfilePage;
