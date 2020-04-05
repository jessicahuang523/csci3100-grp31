import React, { useState, useEffect } from "react";
import { firestore } from "firebase";
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

const GymPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [gymData, setGymData] = useState();

  useEffect(() => {
    const fetchEventLocation = async () => {
      const eventLocationSnap = await firestore()
        .collection("event_location")
        .get();
      let tmp = [];
      eventLocationSnap.forEach((d) => tmp.push(d.data()));
      setGymData(tmp);
    };
    fetchEventLocation();
  }, []);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (!gymData) {
    return <Loading />;
  } else {
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
    <Card>
      <CardHeader>{display}</CardHeader>
      <CardBody>{description}</CardBody>
      <CardFooter>
        <EditGymImage image_main={image_main} />
      </CardFooter>
    </Card>
  );
};

export default GymPage;
