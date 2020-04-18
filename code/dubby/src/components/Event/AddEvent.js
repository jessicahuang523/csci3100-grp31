import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { GymContext } from "../../contexts/GymContext";
import { UserContext } from "../../contexts/UserContext";
import { EventTypeContext } from "../../contexts/EventTypeContext";
import {
  Jumbotron,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button,
} from "reactstrap";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import { setupFirestoreForNewEvent } from "../../utilityfunctions/Utilities";
import { ThemeContext } from "../../contexts/ThemeContext";

const calculateDate = () => {
  const date = new Date(Date.now());
  const dateLocal = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000
  );
  return dateLocal.toISOString().substr(0, 10);
};

const calculateTime = () => {
  const date = new Date(Date.now());
  const dateLocal = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000
  );
  return dateLocal.toISOString().substr(11, 5);
};

const AddEvent = () => {
  const { theme } = useContext(ThemeContext);
  const { gymData } = useContext(GymContext);
  const { eventTypeData } = useContext(EventTypeContext);
  const { userData, userLoading } = useContext(UserContext);

  const [allowedPeople, setAllowedPeople] = useState();
  const [eventName, setEventName] = useState();
  const [eventType, setEventType] = useState();
  const [isPublic, setIsPublic] = useState(true);
  const [location, setLocation] = useState();
  const [startingTime, setStartingTime] = useState();
  const [eventStartingDate, setEventStartingDate] = useState(calculateDate());
  const [eventStartingTime, setEventStartingTime] = useState(calculateTime());
  const [submittingEventData, setSubmittingEventData] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [eventSubmittedEid, setEventSubmittedEid] = useState(false);

  useEffect(() => {
    setStartingTime(
      new Date(eventStartingDate + "T" + eventStartingTime + ":00").getTime()
    );
  }, [eventStartingDate, eventStartingTime]);

  useEffect(() => {
    if (gymData) {
      setLocation(gymData[0].value);
    }
  }, [gymData]);

  useEffect(() => {
    if (eventTypeData) {
      setEventType(eventTypeData[0].value);
    }
  }, [eventTypeData]);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    if (startingTime < Date.now()) {
      setErrorMessage(
        "Chill, man. You need to give people some time to prep for this event!"
      );
    } else {
      if (
        userData &&
        allowedPeople &&
        eventName &&
        eventType &&
        isPublic &&
        location
      ) {
        setErrorMessage("");
        setSubmittingEventData(true);
        const eventData = {
          allowedPeople,
          eventName,
          eventType,
          isPublic,
          location,
          startingTime,
        };
        const eid = await setupFirestoreForNewEvent(eventData);
        setSubmittingEventData(false);
        setEventSubmittedEid(eid);
      } else {
        setErrorMessage("Please fill in all data!");
      }
    }
  };

  if (userLoading) {
    return <Loading />;
  } else if (!userData) {
    return <Redirect to="/launch" />;
  } else if (!gymData || !eventTypeData) {
    return <Loading />;
  } else if (submittingEventData) {
    return <Loading />;
  } else if (eventSubmittedEid) {
    return <Redirect to={`/e/${eventSubmittedEid}`} />;
  } else {
    return (
      <div style={theme.background}>
        <Navbar />
        <Jumbotron style={theme.jumbotron}>
          <h1>Create a new event!</h1>
        </Jumbotron>
        <Form onSubmit={handleEventSubmit} style={{ padding: "1rem" }}>
          {errorMessage && <Alert>{errorMessage}</Alert>}
          <FormGroup>
            <Label for="eventName">Event Name</Label>
            <Input
              required="required"
              type="text"
              id="eventName"
              onChange={(e) => setEventName(e.target.value)}
            />
          </FormGroup>
          <Row>
            <Col sm={6}>
              <FormGroup>
                <Label for="allowedPeople">Allowed People</Label>
                <Input
                  required="required"
                  type="number"
                  id="allowedPeople"
                  onChange={(e) => setAllowedPeople(e.target.value)}
                ></Input>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="eventType">Event Type</Label>
                <Input
                  required="required"
                  type="select"
                  id="eventType"
                  onChange={(e) => setEventType(e.target.value)}
                >
                  {eventTypeData.map(({ value, display }) => (
                    <option key={value} value={value}>
                      {display}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="publicEvent">Public Event?</Label>
                <Input
                  required="required"
                  type="select"
                  id="publicEvent"
                  onChange={(e) =>
                    setIsPublic(e.target.value === "true" ? true : false)
                  }
                >
                  <option value={true}>yes</option>
                  <option value={false}>no</option>
                </Input>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="location">Event Location</Label>
                <Input
                  required="required"
                  type="select"
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                >
                  {gymData.map(({ value, display }) => (
                    <option key={value} value={value}>
                      {display}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="startingDate">Starting Date</Label>
                <Input
                  required="required"
                  type="date"
                  id="startingDate"
                  value={eventStartingDate}
                  min={calculateDate()}
                  onChange={(e) => setEventStartingDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="startingTime">Starting Time</Label>
                <Input
                  required="required"
                  type="time"
                  id="startingTime"
                  value={eventStartingTime}
                  onChange={(e) => setEventStartingTime(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button block color="primary" type="submit">
                Submit
              </Button>
            </Col>
            <Col>
              <Button block color="danger" outline tag={Link} to="/launch">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
};

export default AddEvent;
