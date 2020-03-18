import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import logo from "../../image/Dubby_logo.png";
import {
  devSetupAccount,
  devAddToChat,
  devAddToEvent,
  devAddEvent
} from "../../devutil";
import { UserContext } from "../../contexts/UserContext";

const LandingPage = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

  const [alertSignin, setAlertSignin] = useState();

  if (userLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  } else if (userData) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className="page">
        <div className="landing-container">
          <header>
            <img
              src={logo}
              style={{ width: "300px" }}
              alt="logo"
              className="landing-logo"
            />
            <p>buddy dubby dubby buddy</p>
          </header>
          <Form
            onSubmit={async e => {
              e.preventDefault();
              setAlertSignin(null);
              if (/\S+@\S+\.\S+/.test(inputEmail) && inputPassword !== "") {
                try {
                  await auth().signInWithEmailAndPassword(
                    inputEmail,
                    inputPassword
                  );
                } catch (error) {
                  setAlertSignin(
                    "credentials aren't correct, check your email or password@@"
                  );
                }
              } else {
                setAlertSignin("input must match email and password!");
              }
            }}
            className="login-form-landing"
          >
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                placeholder="account@example.com"
                type="email"
                onChange={e => setInputEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                placeholder="password"
                type="password"
                onChange={e => setInputPassword(e.target.value)}
              />
            </FormGroup>
            {alertSignin && <Label>{alertSignin}</Label>}
            <Button className="btn-lg btn-dark btn-block" type="submit">
              Login
            </Button>
          </Form>
          <div className="text-center pt-3">No account?</div>
          <Link to="/signup">
            <Button color="primary" className="btn-lg btn-block" type="submit">
              Sign Up
            </Button>
          </Link>
          <div className="text-center pt-3">Or Sign in with Google</div>
          <GoogleLoginButton className="mt-3 mb-3" />
          <div className="text-center pt-3">
            <Link to="/forgotpassword">Forgot Password?</Link>
          </div>
          <Button
            onClick={() =>
              auth()
                .signInAnonymously()
                .then(({ user }) => {
                  devSetupAccount();
                  devAddToChat("test", user.uid);
                  devAddToEvent("test", user.uid);
                  devAddEvent({
                    allowedPeople: 10,
                    eventName: "Let's play!",
                    eventType: "Tennis",
                    isPublic: true,
                    location: "NA Tennis Court"
                  });
                  devAddEvent({
                    allowedPeople: 7,
                    eventName: "Super exciting tournament",
                    eventType: "Basketball",
                    isPublic: true,
                    location: "UC Gym"
                  });
                })
            }
          >
            totally for development use anonymous sign in button
          </Button>
        </div>
      </div>
    );
  }
};

export default LandingPage;
