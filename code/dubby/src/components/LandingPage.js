import React from "react";
import {Link} from "react-router-dom";
import {auth} from "firebase";
import {Button, Form, FormGroup, Label, Input} from "reactstrap";
import {GoogleLoginButton} from "react-social-login-buttons";

const LandingPage = () => {
  return (<div className="landing-container">
    <header>
      <h1>Dubby</h1>
      <p>buddy dubby dubby buddy</p>
    </header>
    <Form onSubmit={e => e.preventDefault()} className="login-form-landing">
      <FormGroup>
        <Label for="username">Username</Label>
        <Input placeholder="username" type="username"/>
      </FormGroup>
      <FormGroup>
        <Label for="password">Password</Label>
        <Input placeholder="password" type="password"/>
      </FormGroup>
      <Button className="btn-lg btn-dark btn-block" type="submit">Login</Button>
      <div className="text-center pt-3">
        Or Sign in with Google
      </div>
      <GoogleLoginButton className="mt-3 mb-3"/>
      <Link to="/forgotpassword">Forgot Password?</Link>
      <Link to="/signup">signup</Link>
      <Button onClick={() => auth().signInAnonymously()}>
        totally for development use anonymous sign in button
      </Button>
    </Form>
  </div>);
};

export default LandingPage;
