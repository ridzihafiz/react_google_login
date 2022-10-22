import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export default function Dashboard() {
  // navigation
  const navigation = useNavigate();
  const [loading, setLoading] = useState();
  const [user, setSignInUser] = useState({});

  const signOutFromApp = () => {
    signOut(auth)
      .then((res) => {
        navigation("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // comp life cycle
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigation("/");
      }
      setLoading(false);
      console.log(user);
      setSignInUser({
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      });
    });
  }, []);

  if (loading) {
    return <div className="App">Loading... </div>;
  }

  return (
    <div className="App">
      <h1>Welcome</h1>
      <span> {user.email} </span>
      <button onClick={signOutFromApp}>Logout</button>
    </div>
  );
}
