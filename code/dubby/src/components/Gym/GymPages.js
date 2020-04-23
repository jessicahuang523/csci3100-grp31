import React, { useState, useContext } from "react";
import { GymContext } from "../../contexts/GymContext";
import { ThemeContext } from "../../contexts/ThemeContext";
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
  CardText,
} from "reactstrap";
import classnames from "classnames";
import NavBar from "../Navbar/Navbar";
import GymItemCard from "./GymItemCard";
import Loading from "../Loading/Loading";

const GymPage = () => {
  const { theme } = useContext(ThemeContext);
  const { gymData } = useContext(GymContext);

  const [activeTab, setActiveTab] = useState("1");

  const toggleActiveTab = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  if (!gymData) {
    return <Loading noauth />;
  } else {
    const universityList = [
      { tabid: "1", display: "CUHK", value: "cuhk", background: "#cc33ff" },
      { tabid: "2", display: "HKU", value: "hku", background: "#ffcc00" },
      { tabid: "3", display: "UST", value: "ust", background: "#cccccc" },
    ];

    return (
      <div style={theme.background}>
        <NavBar />
        <Container style={theme.mainContainer}>
          {/* top list of universities */}
          <Nav tabs style={{ marginTop: "4rem" }}>
            {universityList.map(({ tabid, display, background }) => (
              <NavItem key={tabid}>
                <NavLink
                  style={{ cursor: "pointer", background }}
                  className={classnames({ active: activeTab === tabid })}
                  onClick={() => toggleActiveTab(tabid)}
                >
                  {display}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          {/* content for gyms per university */}
          <TabContent activeTab={activeTab}>
            {universityList.map(({ tabid, value }) => {
              const filteredData = gymData.filter(
                (d) => d.value.substring(0, 4) === value
              );

              return (
                <TabPane key={tabid} tabId={tabid}>
                  <Row>
                    <Col sm={12}>
                      {filteredData && filteredData.length > 0 ? (
                        filteredData.map((data) => (
                          <GymItemCard key={data.value} data={data} />
                        ))
                      ) : (
                        <Card body>
                          <CardText>Constructing...</CardText>
                        </Card>
                      )}
                    </Col>
                  </Row>
                </TabPane>
              );
            })}
          </TabContent>
        </Container>
      </div>
    );
  }
};

export default GymPage;
