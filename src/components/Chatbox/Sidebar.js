import React, { useState, useRef } from "react";
import { addFriend } from "../../firebase/firestore";

import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { logout } from "../../firebase/auth";
import "./chatbox.css";

const Sidebar = ({ dummyData, user }) => {
  const inputRef = useRef("");

  const getRandomColorLight = (val) => {
    const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
    return color;
  };
  const getRandomColorDark = (val) => {
    const color = "hsl(" + (val % 10) * 36 + ", 100%, 15%)";
    return color;
  };

  const newFriend = (e) => {
    e.preventDefault();
    addFriend(user, inputRef.current.value);
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="header">
        <Typography className="header-title">Chats.</Typography>
        <IconButton color="secondary" onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </div>
      <form className="search-wrapper" onSubmit={newFriend}>
        <input
          type="type"
          ref={inputRef}
          className="search"
          placeholder="Search..."
        />
        <input type="submit" className="invisible" />
      </form>
      <div className="room-list">
        {dummyData.map((data, index) => (
          <div key={index} className="room">
            <Avatar
              className="sidebar-avatar"
              style={{
                backgroundColor: `${getRandomColorLight(index)}`,
                color: `${getRandomColorDark(index)}`,
              }}
            >
              {data.name.substring(0, 1)}
            </Avatar>
            <div className="room-details">
              <div className="grid-line">
                <p className="room-name">{data.name}</p>
                <p className="room-timestamp">{data.timestamp}</p>
              </div>
              <div className="grid-line">
                <p className="room-description">{data.last}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
