import React, { useState, useContext } from "react";
import { GymContext } from "../../contexts/GymContext";
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
  CardFooter,
} from "reactstrap";
import classnames from "classnames";
import NavBar from "../Navbar/Navbar";
import Loading from "../Loading/Loading";
import EditGymImage from "./EditGymImage";
import EditScheduleImage from "./EditScheduleImage";
import { ThemeContext } from "../../contexts/ThemeContext";

const GymPage = () => {
  const { theme } = useContext(ThemeContext);
  const { gymData } = useContext(GymContext);
  // const { scheduleData } = useContext(GymContext);

  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (!gymData) {
    return <Loading noauth />;
  } else {
    return (
      <div style={theme.background}>
        <NavBar />
        <Container>
          <Nav tabs style={{ marginTop: "4rem" }}>
            <NavItem>
              <NavLink
                style={{ backgroundColor: "#cc33ff" }}
                className={classnames({ active: activeTab === "1" })}
                onClick={() => toggle("1")}
              >
                CUHK
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ backgroundColor: "#ffcc00" }}
                className={classnames({ active: activeTab === "2" })}
                onClick={() => toggle("2")}
              >
                HKU
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                style={{ backgroundColor: "#cccccc" }}
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
                  {gymData.map((data) => (
                    <GymListItem key={data.value} data={data} />
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
  }
};

const GymListItem = ({ data }) => {
  const { display, image_main, description } = data;
  return (
    <Card style={{ marginBottom: "3rem" }}>
      <CardHeader>{display}</CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter
        style={{ boxShadow: "5px 10px #999999", textAlign: "center" }}
      >
        <EditGymImage image_main={image_main} />
        <EditScheduleImage image_main={image_main} />
      </CardFooter>
    </Card>
  );
};

export default GymPage;
