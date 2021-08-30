import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { dummyData, messages as dummyMessages } from "./dummyrooms";
import Sidebar from "./Sidebar";
import Activeroom from "./Activeroom";
import Header from "./Header/Header";
import "./chatbox.css";
import Profile from "../../pages/Profile";

import { db } from "../../firestore";

const users = db.collection("users");

const Chatbox = ({ signOutHandler }) => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const user = "Subhajit";
  const [profile, setProfile] = useState(false);

  return (
    <div>
      <div>
        <Grid container className="container">
          <Grid item xs={12}>
            <Header dummyData={dummyData} signOutHandler={signOutHandler} />
          </Grid>
          <Grid item xs={3} className="sidebar">
            <Sidebar dummyData={dummyData} setProfile={setProfile}></Sidebar>
          </Grid>
          <Grid item xs className="chat-box">
            <Activeroom
              user={user}
              message={dummyMessages}
              room={room}
            ></Activeroom>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Chatbox;
