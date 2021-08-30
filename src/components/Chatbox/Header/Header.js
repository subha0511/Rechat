import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import RoomHeader from "./RoomHeader";
import "../chatbox.css";

const Header = ({ dummyData, signOutHandler }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3} className="header sidebar-header">
          <Typography className="header-title">Chats.</Typography>
        </Grid>
        <Grid item xs className="header chat-header">
          <RoomHeader />
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
