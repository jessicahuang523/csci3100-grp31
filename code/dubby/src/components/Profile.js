import React from "react";
import { Grid, Cell } from "react-mdl";
import self from "./../self.jpg";

const Profile = () => {
  return (
    <div>
      <Grid>
        <Cell col={6} className="resume-left-col">
          <div
            style={{
              textAlign: "center"
            }}
          >
            <img src={self} alt="self" className="resume-pic" />
          </div>
          <h2
            style={{
              marginTop: "50px"
            }}
          >
            Lawrence Tsai
          </h2>
          <h4>XXX</h4>
          <hr
            style={{
              borderTop: "3px solid #D9993C",
              width: "60%"
            }}
          />
          <p>Hello I am Lawrence Tsai! Here is everything about me!</p>
        </Cell>
        <Cell
          col={6}
          className="resume-right-col"
          style={{
            paddingLeft: "30px",
            paddingRight: "30px"
          }}
        >
          <h2
            style={{
              marginTop: "50px"
            }}
          >
            University
          </h2>
          <br />
          <hr
            style={{
              borderTop: "3px solid #D9993C",
              width: "90%",
              margin: "auto"
            }}
          />
          <h2
            style={{
              marginTop: "50px"
            }}
          >
            Sports
          </h2>
          <hr
            style={{
              borderTop: "3px solid #D9993C",
              width: "90%",
              margin: "auto"
            }}
          />
        </Cell>
      </Grid>
    </div>
  );
};
export default Profile;
