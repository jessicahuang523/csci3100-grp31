import React, {useState, useEffect, useContext} from "react";
import self from "../../self.jpg";
import {firestore, auth} from "firebase";
import {useParams, Redirect} from "react-router-dom";
import {UserContext} from "../../contexts/UserContext";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import {Container, Row, Col} from 'reactstrap';

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
    return <Loading/>;
  } else if (!userData) {
    return <Redirect to="/launch"/>;
  } else if (!profileData) {
    return <Loading/>;
  } else {
    return (<div>
      <NavBar/>
      <div className="main-container">
        <div style={{
            textAlign: "center"
          }}>
          <img src={self} alt="self" className="resume-pic" style={{
              width: "300px",
              borderRadius: "150px"
            }}/>
        </div>
        <Container>
          <Row>
            <Col sm="12" md={{
                size: 6,
                offset: 3
              }}>
              <h2 style={{
                  marginTop: "50px"
                }}>{profileData.username}</h2>
              <hr style={{
                  borderTop: "3px solid #D9993C",
                  margin: "auto"
                }}/>
              <p>{profileData.description}</p>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{
                size: 6,
                offset: 3
              }}>
              <h2 style={{
                  marginTop: "50px"
                }}>University</h2>
              <p>{profileData.university}</p>
              <hr style={{
                  borderTop: "3px solid #D9993C",
                  margin: "auto"
                }}/>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{
                size: 6,
                offset: 3
              }}>
              <h2 style={{
                  marginTop: "50px"
                }}>Sports</h2>
              <p>{profileData.interested_sports}</p>
              <hr style={{
                  borderTop: "3px solid #D9993C",
                  margin: "auto"
                }}/>
            </Col>
          </Row>

        </Container>
      </div>
    </div>);
  }
};
export default ProfilePage;
