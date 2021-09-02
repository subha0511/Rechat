import React from "react";
import Chatbox from "../components/Chatbox/Chatbox";

const Chat = ({ signOutHandler, setProfile, user, allUserData }) => {
  return (
    <div>
      <Chatbox
        signOutHandler={signOutHandler}
        setProfile={setProfile}
        user={user}
      />
    </div>
  );
};
export default Chat;
