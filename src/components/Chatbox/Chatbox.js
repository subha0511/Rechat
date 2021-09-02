import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { dummyData, messages as dummyMessages } from "./dummyrooms";
import Sidebar from "./Sidebar/Sidebar";
import Activeroom from "./Sidebar/Activeroom";
import Header from "./Header/Header";
import "./chatbox.css";

import { db } from "../../firestore";

const organise = (response, user) => {
  const uid = response.id;
  const data = response.data();
  let name = "";
  let photoURL = "";
  if (data.name === undefined) {
    if (data.name1 !== user.displayName) {
      name = data.name1;
      photoURL = data.photoURL1;
    } else {
      name = data.name2;
      photoURL = data.photoURL2;
    }
  }
  return { ...data, name: name, uid: uid, photoURL: photoURL };
};

const Chatbox = ({ signOutHandler, user }) => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [profile, setProfile] = useState(false);

  const userRef = db.collection("users").doc(user.email);
  const groupRef = db.collection("groups");

  useEffect(() => {
    const unsubscribe = groupRef
      .where("members", "array-contains", user.email)
      .orderBy("lastUpdated", "desc")
      .onSnapshot((querySnapshot) => {
        const groups = [];
        querySnapshot.forEach((doc) => {
          groups.push(organise(doc, user));
        });
        setRooms(groups);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (room === null) {
      return;
    }
    const messageRef = db
      .collection("groups")
      .doc(room.uid)
      .collection("messages");
    const unsubscribe = messageRef
      .orderBy("timestamp", "desc")
      .onSnapshot((querySnapshot) => {
        const mssgs = [];
        querySnapshot.forEach((doc) => {
          messageRef.push(doc);
        });
        setMessages(mssgs);
      });

    return () => unsubscribe();
  }, [room]);

  return (
    <div>
      <div>
        <Grid container className="container">
          <Grid item xs={12}>
            <Header room={room} signOutHandler={signOutHandler} />
          </Grid>
          <Grid item xs={3} className="sidebar">
            <Sidebar
              rooms={rooms}
              setProfile={setProfile}
              setRoom={setRoom}
            ></Sidebar>
          </Grid>
          <Grid item xs className="chat-box">
            <Activeroom message={messages} room={room}></Activeroom>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Chatbox;
