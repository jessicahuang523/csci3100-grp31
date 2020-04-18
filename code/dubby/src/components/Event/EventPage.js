import React, {useState, useEffect, useContext} from "react";
import {Redirect, Link} from "react-router-dom";
import {firestore} from "firebase";
import {UserContext} from "../../contexts/UserContext";
import {Jumbotron, Button} from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "./EventCard";

const EventPage = () => {
  const {userData, userLoading} = useContext(UserContext);

  const [userEventList, setUserEventList] = useState();

  const backgroundStyle = {
    background: "#F0C27B"
  };

  const jumbotronStyle = {
    background: "#F0C27B",
    textAlign: "center"
  };

  useEffect(() => {
    if (userData) {
      const {uid} = userData;
      const unsubscribeUserEventList = firestore().collection("user_profile").doc(uid).collection("events").orderBy("startingTime").onSnapshot((snap) => {
        let tmp = [];
        snap.forEach((doc) => tmp.push(doc.data()));
        setUserEventList(tmp);
      });
      return() => {
        unsubscribeUserEventList();
      };
    }
  }, [userData]);

  if (userLoading) {
    return <Loading/>;
  } else if (!userData) {
    return <Redirect to="/launch"/>;
  } else if (!userEventList) {
    return <Loading/>;
  } else {
    return (<div style={backgroundStyle}>
      <NavBar/>
      <Jumbotron style={jumbotronStyle}>
        <h1>My Events</h1>
        <p>Events I joined or hosted by me!</p>
        <hr/>
        <Button block="block" color="primary" tag={Link} to="/e/add">
          Create a new event!
        </Button>
      </Jumbotron>

      <div style={{
          padding: "1rem"
        }}>
        {userEventList && userEventList.length > 0 && userEventList.map((event) => (<EventCard key={event.eid} eid={event.eid}/>))}
      </div>
    </div>);
  }
};

export default EventPage;
