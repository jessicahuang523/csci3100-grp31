import React, { useState } from "react";
import {
  Row,
  Col,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText
} from "reactstrap";
import classnames from "classnames";
import NavBar from "../Navbar/Navbar";
import UploadImageComponent from "./UploadImageComponent";

const GymPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <NavBar />
      <Nav tabs="tabs">
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "1"
            })}
            onClick={() => {
              toggle("1");
            }}
          >
            CUHK
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "2"
            })}
            onClick={() => {
              toggle("2");
            }}
          >
            HKU
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({
              active: activeTab === "3"
            })}
            onClick={() => {
              toggle("3");
            }}
          >
            UST
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <UploadImageComponent key={1} imageName={'University Gym'}/>
              <GymListItem gymName="University Gym" />
              <UploadImageComponent key={2} imageName={'New Asia College'}/>
              <GymListItem gymName="New Asia College" />
              <UploadImageComponent key={3} imageName={'Shaw College'}/>
              <GymListItem gymName="Shaw College" />
              <UploadImageComponent key={4} imageName={'United College'}/>
              <GymListItem gymName="United College" />
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="6">
              <Card body="body">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6">
              <Card body="body">
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button>Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};

const GymListItem = ({ gymName }) => (
  <li className="gym-list-item">
    <span className="gym-list-title">
      <h3>{gymName}</h3>
    </span>
    <span className="gym-detail">
      <div className="gym-detail-card">
        <u>Gym</u>
        <div className="gym-detail-timetable">
          <ul>
            <li>Mon-Fri</li>
            <li>Sat-Sun</li>
          </ul>
          <ul>
            <li>10:00-22:00</li>
            <li>Closed</li>
          </ul>
        </div>
        <u>Basketball Court</u>
        <div className="gym-detail-timetable">
          <ul>
            <li>Mon-Sun</li>
          </ul>
          <ul>
            <li>7:00-22:00</li>
          </ul>
        </div>
      </div>
    </span>
  </li>
);

export default GymPage;
