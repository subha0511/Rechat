import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "../chatbox.css";

const RoomHeader = ({ room }) => {
  return (
    <>
      <Avatar className="header-avatar">
        {room.name ? room.name.substring(0, 1) : ""}
      </Avatar>
      <div className="chat-details">
        <div className="grid-line">
          <p className="chat-title">{room.name}</p>
        </div>
        {/* <div className="grid-line">
          <p className="chat-last-online">{formatDate(room.lastUpdated)}</p>
        </div> */}
      </div>
    </>
  );
};

export default RoomHeader;
