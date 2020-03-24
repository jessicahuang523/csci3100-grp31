import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../contexts/UserContext";
import { setupFirestoreForNewEvent } from "../../utilityfunctions/Utilities";
import {
  Jumbotron,
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Row,
  Button
} from "reactstrap";

const eventTypeChoices = [
  { value: "basketball", display: "Basketball" },
  { value: "tennis", display: "Tennis" }
];

const eventLocationChoices = [
  { value: "cuhk_nagym", display: "NA Gym (CUHK)" },
  { value: "cuhk_ugym", display: "University Gym (CUHK)" },
  { value: "cuhk_ucgym", display: "UC Gym (CUHK)" }
];

const calculateMinStartingDate = () => {
  const date = new Date(Date.now());
  const dateLocal = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000
  );
  return dateLocal.toISOString().substr(0, 10);
};

const calculateMinStartingTime = () => {
  const date = new Date(Date.now());
  const dateLocal = new Date(
    date.getTime() - date.getTimezoneOffset() * 60 * 1000 + 1000 * 60 * 60
  );
  return dateLocal.toISOString().substr(11, 5);
};

const AddEvent = () => {
  const { userData } = useContext(UserContext);

  const [allowedPeople, setAllowedPeople] = useState();
  const [eventName, setEventName] = useState();
  const [eventType, setEventType] = useState(eventTypeChoices[0].value);
  const [isPublic, setIsPublic] = useState(true);
  const [location, setLocation] = useState(eventLocationChoices[0].value);
  const [startingTime, setStartingTime] = useState();
  const [eventStartingDate, setEventStartingDate] = useState(
    calculateMinStartingDate()
  );
  const [eventStartingTime, setEventStartingTime] = useState(
    calculateMinStartingTime()
  );
  const [submittingEventData, setSubmittingEventData] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setStartingTime(
      new Date(eventStartingDate + "T" + eventStartingTime + ":00").getTime()
    );
  }, [eventStartingDate, eventStartingTime]);

  const handleEventSubmit = async e => {
    e.preventDefault();
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
        startingTime
      };
      await setupFirestoreForNewEvent(eventData);
      setSubmittingEventData(false);
    } else {
      setErrorMessage("Please fill in all data!");
    }
  };

  if (submittingEventData) {
    return (
      <div>
        <header>
          <h1>submitting...</h1>
        </header>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <Jumbotron>
          <h1>Add new event</h1>
        </Jumbotron>
        {errorMessage && <Alert>{errorMessage}</Alert>}
        <Form onSubmit={handleEventSubmit} style={{ padding: "1rem" }}>
          <FormGroup>
            <Label for="eventName">Event Name</Label>
            <Input
              required
              type="text"
              id="eventName"
              onChange={e => setEventName(e.target.value)}
            />
          </FormGroup>
          <Row form>
            <Col sm={6}>
              <FormGroup>
                <Label for="allowedPeople">Allowed People</Label>
                <Input
                  required
                  type="number"
                  id="allowedPeople"
                  onChange={e => setAllowedPeople(e.target.value)}
                ></Input>
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="eventType">Event Type</Label>
                <Input
                  required
                  type="select"
                  id="eventType"
                  onChange={e => setEventType(e.target.value)}
                >
                  {eventTypeChoices.map(({ value, display }) => (
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
                  required
                  type="select"
                  id="publicEvent"
                  onChange={e =>
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
                  required
                  type="select"
                  id="location"
                  onChange={e => setLocation(e.target.value)}
                >
                  {eventLocationChoices.map(({ value, display }) => (
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
                  required
                  type="date"
                  id="startingDate"
                  value={eventStartingDate}
                  min={calculateMinStartingDate()}
                  onChange={e => setEventStartingDate(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col sm={6}>
              <FormGroup>
                <Label for="startingTime">Starting Time</Label>
                <Input
                  required
                  type="time"
                  id="startingTime"
                  value={eventStartingTime}
                  min={calculateMinStartingTime()}
                  onChange={e => setEventStartingTime(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
};

export default AddEvent;
