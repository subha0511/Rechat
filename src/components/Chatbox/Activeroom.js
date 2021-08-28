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
import "./chatbox.css";

const Activeroom = ({ messages, user, room }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [room]);

  return (
    <>
      <div className="main-body">
        {dummyMessages.map((message, index) => (
          <Message data={message} user={user} key={index} />
        ))}
        <div className="scroll-bottom" ref={scrollRef}></div>
      </div>
      <div className="footer">
        <input
          type="text"
          className="chat-input"
          placeholder="Enter your message..."
        />
        <IconButton className="chat-submit">
          <SendIcon
            className="send-icon"
            style={{ width: "30px", height: "30px" }}
          />
        </IconButton>
      </div>
    </>
  );
};

export default Activeroom;
