import React, { useState, useRef, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import "../chatbox.css";

const Activeroom = ({ messages, user, room }) => {
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const addMessage = (e) => {
    e.preventDefault();

    inputRef.current.value = "";
  };

  useEffect(() => {
    if (room) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [room]);

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

export default Activeroom;
