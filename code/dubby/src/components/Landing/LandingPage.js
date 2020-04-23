import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Jumbotron,
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Media,
} from "reactstrap";
import Loading from "../Loading/Loading";
import logo from "../../image/Dubby_logo.png";

const LandingPage = () => {
  const { theme } = useContext(ThemeContext);
  const { userLoading, userData } = useContext(UserContext);

  // inputs updated from form
  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();
  // header text that acts as a warning and message display
  const [alertSignin, setAlertSignin] = useState("Sign in!");

  // signin when checks for email and password is valid
  const handleEmailLoginFormSubmit = async (e) => {
    e.preventDefault();
    setAlertSignin("Loading...");
    if (/\S+@\S+\.\S+/.test(inputEmail) && inputPassword !== "") {
      try {
        await auth().signInWithEmailAndPassword(inputEmail, inputPassword);
      } catch (error) {
        setAlertSignin("Please check your email or password!");
      }
    } else {
      setAlertSignin("Input must match email and password!");
    }
  };

  // render
  if (userLoading) {
    return <Loading />;
  } else if (userData) {
    return <Redirect to="/" />;
  } else {
    return (
      <div style={theme.background}>
        <Jumbotron style={theme.launchJumbotron}>
          <Media middle src={logo} style={{ width: "10rem" }} />
          <hr />
          <p>
            <b>Welcome to Dubby!</b>
            <br />
            <b>Find your sport partners. Find your buddies.</b>
          </p>
        </Jumbotron>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <Card>
              <CardHeader>{alertSignin}</CardHeader>
              <CardBody>
                <Form onSubmit={handleEmailLoginFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="account@example.com"
                      type="email"
                      required="required"
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="password"
                      type="password"
                      required="required"
                      onChange={(e) => setInputPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button block color="primary" type="submit">
                    Login
                  </Button>
                  <Button block color="secondary" tag={Link} to="/signup">
                    Sign Up
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

export default LandingPage;
