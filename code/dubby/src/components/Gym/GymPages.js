import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardHeader,
  CardBody,
  CardText,
  CardFooter
} from "reactstrap";
import classnames from "classnames";
import NavBar from "../Navbar/Navbar";
import UploadImageComponent from "./UploadImageComponent";

const GymData = [
  { gymName: "University Gym", imageName: "University Gym" },
  { gymName: "New Asia College", imageName: "New Asia College" },
  { gymName: "Shaw College", imageName: "Shaw College" },
  { gymName: "United College", imageName: "United College" }
];

const GymPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <NavBar />
      <Container>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "1" })}
              onClick={() => toggle("1")}
            >
              CUHK
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "2" })}
              onClick={() => toggle("2")}
            >
              HKU
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === "3" })}
              onClick={() => toggle("3")}
            >
              UST
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm={12}>
                {GymData.map(({ gymName, imageName }) => (
                  <GymListItem
                    key={gymName}
                    gymName={gymName}
                    imageName={imageName}
                  />
                ))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm={12}>
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
              <Col sm={6}>
                <Card body>
                  <CardTitle>Special Title Treatment</CardTitle>
                  <CardText>
                    With supporting text below as a natural lead-in to
                    additional content.
                  </CardText>
                  <Button>Go somewhere</Button>
                </Card>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    </div>
  );
};
const GymListItem = ({ gymName, imageName }) => {
  return (
    <Card>
      <CardHeader>{gymName}</CardHeader>
      <CardBody>should pull data from firebase</CardBody>
      <CardFooter>
        <UploadImageComponent imageName={imageName} />
      </CardFooter>
    </Card>
  );
};

export default GymPage;
