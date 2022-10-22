import React from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  // navigation
  const navigation = useNavigate();

  // function register
  const handleRegister = (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;
    let password2 = e.target.password2.value;

    // simple validation
    if (password !== password2) {
      return alert("Password is not match");
    }

    if (password.length < 6) {
      return alert("Password must have > 5 char");
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        navigation("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleRegister}>
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
          <label htmlFor="password2">Password</label>
          <input type="password" id="password2" required />
        </div>

        <div>
          <button type="submit">Register</button>
        </div>

        <small>
          Already has an Account ?<Link to={"/"}> Click here for Login </Link>
        </small>
      </form>
    </div>
  );
}
