import React from "react";
import { useParams } from "react-router-dom";

const Gym = () => {
  return <div>Gym page</div>;
};

export const GymDetails = () => {
  const { gid } = useParams();
  console.log(gid);
  return <div>gym id = {gid}</div>;
};

export default Gym;
