import React, { useState, useRef, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import "../../chatbox.css";
import { db } from "../../../../firestore";
import firebase from "firebase";

const Activeroom = ({ messages, user, room }) => {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const addMessage = (e) => {
    e.preventDefault();
    db.collection("groups").doc(room.uid).collection("messages").add({
      message: inputRef.current.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      senderId: user.displayName,
    });
    db.collection("groups").doc(room.uid).update({
      lastMessage: inputRef.current.value,
      lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
    });
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (messages) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [messages]);

  return (
    <>
      <div className="main-body">
        {messages &&
          messages.map((message, index) => (
            <Message data={message} user={user} key={index} />
          ))}
        <div className="scroll-bottom" ref={scrollRef}></div>
      </div>
      <form className="footer" onSubmit={addMessage}>
        {room && (
          <>
            <input
              type="text"
              ref={inputRef}
              className="chat-input"
              placeholder="Enter your message..."
            />
            <input type="submit" className="invisible" />
            <IconButton className="chat-submit" onClick={addMessage}>
              <SendIcon
                className="send-icon"
                style={{ width: "30px", height: "30px" }}
              />
            </IconButton>
          </>
        )}
      </form>
    </>
  );
};

export default React.memo(Activeroom);
