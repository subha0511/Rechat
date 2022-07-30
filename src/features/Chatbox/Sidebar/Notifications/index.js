import React from "react";
import { Typography } from "@mui/material";
import FriendRequest from "./FriendRequest";
import { useAuth } from "./../../../../context/AuthContext";

const Notifications = () => {
  const { user } = useAuth();
  const notifications = user.friendRequest;

  return (
    <>
      <div className="friend-request-wrapper">
        <p className="friend-request-title">Notifications</p>
      </div>
      <div className="room-list">
        {Object.keys(notifications).length > 0 ? (
          Object.keys(notifications).map((key, index) => (
            <FriendRequest data={notifications[key]} key={index} />
          ))
        ) : (
          <div className="default-text">
            <Typography variant="body1">No pending notifications</Typography>
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
