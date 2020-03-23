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
  { value: "cuhk_ucgym", display: "UC Gym (CUHK" }
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
  const [eventType, setEventType] = useState();
  const [isPublic, setIsPublic] = useState();
  const [location, setLocation] = useState();
  const [startingTime, setStartingTime] = useState();
  const [eventStartingDate, setEventStartingDate] = useState(
    calculateMinStartingDate()
  );
  const [eventStartingTime, setEventStartingTime] = useState(
    calculateMinStartingTime()
  );
  const [submittingEventData, setSubmittingEventData] = useState(false);

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
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={handleEventSubmit}
        >
          <label>Allowed People</label>
          <input
            type="number"
            onChange={e => setAllowedPeople(e.target.value)}
          />
          <label>Event Name</label>
          <input type="text" onChange={e => setEventName(e.target.value)} />
          <label>Event Type</label>
          <select onChange={e => setEventType(e.target.value)}>
            {eventTypeChoices.map(({ value, display }) => (
              <option key={value} value={value}>
                {display}
              </option>
            ))}
          </select>
          <label>Public Event?</label>
          <select onChange={e => setIsPublic(e.target.value)}>
            <option value={true}>yes</option>
            <option value={false}>no</option>
          </select>
          <label>Event Location</label>
          <select onChange={e => setLocation(e.target.value)}>
            {eventLocationChoices.map(({ value, display }) => (
              <option key={value} value={value}>
                {display}
              </option>
            ))}
          </select>
          <label>Event Starting Time</label>
          <input
            type="date"
            value={eventStartingDate}
            min={calculateMinStartingDate()}
            onChange={e => setEventStartingDate(e.target.value)}
          />
          <input
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
