import React from "react";
import { Link } from "react-router-dom";
import { auth } from "firebase";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header>
        <h1>Dubby</h1>
        <p>buddy dubby dubby buddy</p>
      </header>
      <form onSubmit={e => e.preventDefault()} className="login-form-landing">
        <input placeholder="username" type="text" />
        <input placeholder="password" type="password" />
        <button type="submit">Login</button>
      </form>
      <button className="google-login-button">Sign in with Google</button>
      <Link to="/forgotpassword">Forgot Password?</Link>
      <Link to="/signup">signup</Link>
      <button onClick={() => auth().signInAnonymously()}>
        totally for development use anonymous sign in button
      </button>
    </div>
  );
};

export default LandingPage;
