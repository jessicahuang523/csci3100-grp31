import React, { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Redirect } from "react-router-dom";
import { auth } from "firebase";

const SignupPage = () => {
  const { userData, userLoading } = useContext(UserContext);

  const [inputEmail, setInputEmail] = useState();
  const [inputPassword, setInputPassword] = useState();

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
        <h1>sign up</h1>
        <form
          onSubmit={async e => {
            e.preventDefault();
            if (/\S+@\S+\.\S+/.test(inputEmail) && inputPassword !== "") {
              try {
                await auth().createUserWithEmailAndPassword(
                  inputEmail,
                  inputPassword
                );
                auth().signInWithEmailAndPassword(inputEmail, inputPassword);
              } catch (e) {
                if (e.code === "auth/weak-password") {
                  alert("The password is too weak.");
                } else {
                  alert(e.message);
                }
              }
            }
          }}
        >
          <label>Email</label>
          <input type="email" onChange={e => setInputEmail(e.target.value)} />
          <label>Password</label>
          <input
            type="password"
            onChange={e => setInputPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
  }
};

export default SignupPage;
