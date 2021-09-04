import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar/Sidebar";
import Activeroom from "./Sidebar/Rooms/Activeroom";
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
      .limit(50)
      .onSnapshot((querySnapshot) => {
        const mssgs = [];
        querySnapshot.forEach((doc) => {
          mssgs.push(doc.data());
        });
        setMessages(mssgs.reverse());
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
              user={user}
            ></Sidebar>
          </Grid>
          <Grid item xs className="chat-box">
            <Activeroom
              messages={messages}
              room={room}
              user={user}
            ></Activeroom>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Chatbox;
