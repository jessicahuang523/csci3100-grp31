import React, {useState, useEffect, useContext} from "react";
import {Redirect} from "react-router-dom";
import {firestore} from "firebase";
import {UserContext} from "../../contexts/UserContext";
import {Jumbotron, Input, Form} from "reactstrap";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EventCard from "../Event/EventCard";

const MainFeed = () => {
  const {userData, userLoading} = useContext(UserContext);

  const [eventList, setEventList] = useState();
  const [searchEvent, setSearchEvent] = useState();

  useEffect(() => {
    const eventRef = firestore().collection("event").where("startingTime", ">=", Date.now()).orderBy("startingTime").limitToLast(100);
    const unsubscribeEventList = eventRef.onSnapshot((snap) => {
      let tmp = [];
      snap.forEach((doc) => tmp.push(doc.id));
      setEventList(tmp);
    });
    return() => {
      unsubscribeEventList();
    };
  }, []);

  if (userLoading) {
    return <Loading/>;
  } else if (!userData) {
    return <Redirect to="/launch"/>;
  } else if (!eventList) {
    return <Loading/>;
  } else {
    return (<div>
      <NavBar/>
      <Jumbotron style={{
          textAlign: "center"
        }}>
        <h1>Dubby</h1>
        <p>Find an event to join!</p>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input placeholder="Type in the type of sports you want to search..." onChange={(e) => setSearchEvent(e.target.value)}/>
        </Form>
      </Jumbotron>
      <div style={{
          padding: "1rem"
        }}>
        {eventList && eventList.length > 0 && eventList.map((eid) => (<EventCard searchString={searchEvent} key={eid} eid={eid}/>))}
      </div>
    </div>);
  }
};

export default MainFeed;
