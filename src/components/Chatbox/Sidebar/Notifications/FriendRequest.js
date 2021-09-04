import React, { useState } from "react";
import { Avatar, IconButton, Grid } from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import { formatDate } from "../../formatDate";

const getRandomColorLight = (val = Math.random() * 5) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
  return color;
};
const getRandomColorDark = (val = Math.random() * 10) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 15%)";
  return color;
};

const FriendRequest = ({ request }) => {
  return (
    <>
      <div className="room">
        <Avatar
          className="sidebar-avatar"
          style={{
            backgroundColor: `${getRandomColorLight()}`,
            color: `${getRandomColorDark()}`,
          }}
          src={request.photoURL}
        >
          {request.displayName.substring(0, 1)}
        </Avatar>
        <Grid container item xs={10}>
          <div className="room-details">
            <div className="grid-line">
              <p className="room-name">{request.displayName}</p>
            </div>
            <div className="grid-line">
              <p className="room-description">
                {formatDate(request.timestamp)}
              </p>
            </div>
          </div>
        </Grid>
        <Grid container item xs>
          <IconButton>
            <ArrowForwardIosRoundedIcon
              style={{ color: `${getRandomColorLight()}` }}
            />
          </IconButton>
        </Grid>
      </div>
    </>
  );
};

export default FriendRequest;
