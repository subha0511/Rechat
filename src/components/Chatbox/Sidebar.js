import React, { useState, useRef, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import "./chatbox.css";

const Sidebar = ({ dummyData }) => {
  const getRandomColorLight = (val) => {
    const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
    return color;
  };
  const getRandomColorDark = (val) => {
    const color = "hsl(" + (val % 10) * 36 + ", 100%, 15%)";
    return color;
  };

  return (
    <>
      <div className="header">
        <Typography className="header-title">Chats.</Typography>
      </div>
      <div className="search-wrapper">
        <input type="text" className="search" placeholder="Search..." />
      </div>
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
