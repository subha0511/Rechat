import React from "react";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import "./chatbox.css";

const Header = ({ dummyData, setProfile }) => {
  return (
    <>
      <Grid container>
        <Grid item xs={3} className="header sidebar-header">
          <Typography className="header-title">Chats.</Typography>
        </Grid>
        <Grid item xs className="header chat-header">
          <Avatar className="header-avatar"></Avatar>
          <div className="chat-details">
            <div className="grid-line">
              <p className="chat-title">Ghughu</p>
            </div>
            <div className="grid-line">
              <p className="chat-last-online">Hello This is another status</p>
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Header;
