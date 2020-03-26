import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "firebase";
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
  Media
} from "reactstrap";
import logo from "../../image/Dubby_logo.png";
import { devSetupAccount } from "../../devutil";
import { UserContext } from "../../contexts/UserContext";
import Loading from "../Loading/Loading";
import { setupFirestoreForNewEvent } from "../../utilityfunctions/Utilities";

const LandingPage = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const [alertSignin, setAlertSignin] = useState("Sign in!");

  const handleEmailLoginFormSubmit = async e => {
    e.preventDefault();
    setAlertSignin("Sign in!");
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

  const handleDevLogin = () =>
    auth()
      .signInAnonymously()
      .then(() => {
        devSetupAccount();
        setupFirestoreForNewEvent({
          allowedPeople: 10,
          eventName: "Let's play!",
          eventType: "Tennis",
          isPublic: true,
          location: "University Gym (CUHK)",
          startingTime: Date.now()
        });
      });

  const handleGoogleLogin = () => {
    auth().signInWithPopup(new auth.GoogleAuthProvider());
  };

  if (userLoading) {
    return <Loading />;
  } else if (userData) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <Jumbotron>
          <Media src={logo} style={{ width: "10rem" }} />
          <hr />
          <p>buddy dubby dubby buddy</p>
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
                      required
                      onChange={e => setInputEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="password"
                      type="password"
                      required
                      onChange={e => setInputPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button size="lg" block color="primary" type="submit">
                    Login
                  </Button>
                  <Button
                    size="lg"
                    block
                    color="secondary"
                    tag={Link}
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                  <hr />
                  <Button
                    size="lg"
                    block
                    color="danger"
                    onClick={handleGoogleLogin}
                  >
                    <i className="fab fa-google"></i> Login With Google
                  </Button>
                  <hr />
                  <Button size="sm" block onClick={handleDevLogin}>
                    Dev
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
