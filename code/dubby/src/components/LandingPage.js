import React from "react";
import { Link } from "react-router-dom";
import { auth } from "firebase";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import logo from "../image/Dubby_logo.png";
import {
  devSetupAccount,
  devAddToChat,
  devSetupEvent,
  devAddToEvent
} from "../devutil";

const LandingPage = () => {
  return (
    <div className="page">
      <div className="landing-container">
        <header>
          <img src={logo} alt="logo" className="landing-logo" />
          <p>buddy dubby dubby buddy</p>
        </header>
        <Form onSubmit={e => e.preventDefault()} className="login-form-landing">
          <FormGroup>
            <Label for="username">Username</Label>
            <Input placeholder="username" type="username" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input placeholder="password" type="password" />
          </FormGroup>
          <Button className="btn-lg btn-dark btn-block" type="submit">
            Login
          </Button>
          <Button color="primary" className="btn-lg btn-block" to="/signup">
            Sign Up
          </Button>
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
                  devSetupEvent("test");
                  devAddToEvent("test", user.uid);
                })
            }
          >
            totally for development use anonymous sign in button
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LandingPage;
