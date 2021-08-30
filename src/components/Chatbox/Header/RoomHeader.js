import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "../chatbox.css";

const RoomHeader = ({ dummyData, setProfile }) => {
  return (
    <>
      <Avatar className="header-avatar"></Avatar>
      <div className="chat-details">
        <div className="grid-line">
          <p className="chat-title">Ghughu</p>
        </div>
        <div className="grid-line">
          <p className="chat-last-online">Hello This is another status</p>
        </div>
      </div>
    </>
  );
};

export default RoomHeader;
