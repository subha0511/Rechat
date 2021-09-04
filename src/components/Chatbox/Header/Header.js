import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import RoomHeader from "./RoomHeader";
import "../chatbox.css";

const Header = ({ room, signOutHandler, toggleNotification }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3} className="header sidebar-header">
          <Typography className="header-title">Chats.</Typography>
          <IconButton onClick={() => toggleNotification()}>
            <NotificationsNoneIcon color="primary" size="40" />
          </IconButton>
          <IconButton onClick={signOutHandler}>
            <ExitToAppIcon color="secondary" size="40" />
          </IconButton>
        </Grid>
        <Grid item xs className="header chat-header">
          {room && <RoomHeader room={room} />}
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
