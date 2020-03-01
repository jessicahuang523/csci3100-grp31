import React from "react";
import { useParams } from "react-router-dom";

const Event = () => {
  return <div>list of events</div>;
};

export const EventDetails = () => {
  const { eid } = useParams();
  console.log(eid);
  return <div>event id = {eid}</div>;
};

export default Event;
