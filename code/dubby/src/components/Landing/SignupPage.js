import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth } from "firebase";
import { UserContext } from "../../contexts/UserContext";
import {
  Jumbotron,
  Media,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import Loading from "../Loading/Loading";
import logo from "../../image/Dubby_logo.png";

const SignupPage = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();
  const [alertSignin, setAlertSignin] = useState("Sign up!");

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();
    setAlertSignin("Loading...");
    if (/\S+@\S+\.\S+/.test(inputEmail) && inputPassword !== "") {
      try {
        await auth().createUserWithEmailAndPassword(inputEmail, inputPassword);
        auth().signInWithEmailAndPassword(inputEmail, inputPassword);
      } catch (e) {
        if (e.code === "auth/weak-password") {
          setAlertSignin("The password is too weak.");
        } else {
          setAlertSignin(e.message);
        }
      }
    }
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
                <Form onSubmit={handleSignUpFormSubmit}>
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="account@example.com"
                      type="email"
                      required
                      onChange={(e) => setInputEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="password"
                      type="password"
                      required
                      onChange={(e) => setInputPassword(e.target.value)}
                    />
                  </FormGroup>
                  <Button color="primary" block type="submit">
                    Sign Up
                  </Button>
                  <Button color="secondary" block tag={Link} to="/launch">
                    Back to login
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

export default SignupPage;
