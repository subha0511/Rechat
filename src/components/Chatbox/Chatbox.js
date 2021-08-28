import React, { useState, useRef, useEffect } from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { dummyData, messages as dummyMessages } from "./dummyrooms";
import Message from "./Message";
import Sidebar from "./Sidebar";
import Activeroom from "./Activeroom";
import "./chatbox.css";
import Profile from "../../pages/Profile";

const Chatbox = ({ signOutHandler }) => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const user = "Subhajit";
  const [profile, setProfile] = useState(false);

  return (
    <div>
      {!profile ? (
        <div>
          <Grid container className="container">
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
          <button onClick={() => signOutHandler()}>SignOut</button>)
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
};

export default Chatbox;
