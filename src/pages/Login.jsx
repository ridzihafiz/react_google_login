import React, { useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  // declare navigation func
  const navigation = useNavigate();

  // function untuk login dengan google
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        // generate token
        const credential = GoogleAuthProvider.credentialFromResult(res);
        const token = credential.accessToken;

        // get user
        const user = res.user;

        console.log({ token, user });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // sign in with email and password
  const emailAndPassSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation("/dashboard");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Comp Lifecycle
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return navigation("/dashboard");
      }
      console.log("user not login yet");
    });
  }, []);

  return (
    <div className="App">
      <form onSubmit={emailAndPassSignIn}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required />
        </div>

        <div>
          <button type="submit">Login</button>
          <button type="button" onClick={googleSignIn}>
            Google Login
          </button>
        </div>

        <small>
          Create Account ?
          <Link to={"/register"}> Click here for Register </Link>
        </small>
      </form>
    </div>
  );
}
