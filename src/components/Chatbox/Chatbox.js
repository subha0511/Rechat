import React, { useState, useRef, useEffect } from "react";
import firebase from "firebase";
import { getFriends, addFriend } from "../../firebase/firestore";

import Grid from "@material-ui/core/Grid";
import { dummyData, messages as dummyMessages } from "./dummyrooms";
import Sidebar from "./Sidebar";
import Activeroom from "./Activeroom";
import "./chatbox.css";

const db = firebase.firestore();

const Chatbox = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    var userRef = db.collection("users").doc(user.email);
    const unsubscribe = userRef.onSnapshot((snapshot) => {
      setFriends(snapshot.data().groups);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Grid container className="container">
        <Grid item xs={3} className="sidebar">
          <Sidebar dummyData={dummyData} user={user}></Sidebar>
        </Grid>
        <Grid item xs className="chat-box">
          <Activeroom
            user={user}
            message={dummyMessages}
            room={room}
          ></Activeroom>
        </Grid>
      </Grid>
    </>
  );
};

export default Chatbox;
