import React from "react";
import Chatbox from "../components/Chatbox/Chatbox";

const Chat = ({ signOutHandler, setProfile }) => {
  return (
    <div>
      <Chatbox signOutHandler={signOutHandler} setProfile={setProfile} />
    </div>
  );
};

export default Chat;
