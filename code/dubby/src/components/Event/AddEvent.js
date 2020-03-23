import React, { useState, useEffect, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { UserContext } from "../../contexts/UserContext";
import { setupFirestoreForNewEvent } from "../../utilityfunctions/Utilities";

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
        <header>
          <h1>Add new event</h1>
        </header>
        <p>{errorMessage}</p>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleEventSubmit}
        >
          <label>Allowed People</label>
          <input
            required
            type="number"
            onChange={e => setAllowedPeople(e.target.value)}
          />
          <label>Event Name</label>
          <input
            required
            type="text"
            onChange={e => setEventName(e.target.value)}
          />
          <label>Event Type</label>
          <select required onChange={e => setEventType(e.target.value)}>
            {eventTypeChoices.map(({ value, display }) => (
              <option key={value} value={value}>
                {display}
              </option>
            ))}
          </select>
          <label>Public Event?</label>
          <select
            required
            onChange={e =>
              setIsPublic(e.target.value === "true" ? true : false)
            }
          >
            <option value={true}>yes</option>
            <option value={false}>no</option>
          </select>
          <label>Event Location</label>
          <select required onChange={e => setLocation(e.target.value)}>
            {eventLocationChoices.map(({ value, display }) => (
              <option key={value} value={value}>
                {display}
              </option>
            ))}
          </select>
          <label>Event Starting Time</label>
          <input
            required
            type="date"
            value={eventStartingDate}
            min={calculateMinStartingDate()}
            onChange={e => setEventStartingDate(e.target.value)}
          />
          <input
            required
            type="time"
            value={eventStartingTime}
            min={calculateMinStartingTime()}
            onChange={e => setEventStartingTime(e.target.value)}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
};

export default AddEvent;
