import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import RoomHeader from "./RoomHeader";
import "../chatbox.css";

const Header = ({
  room,
  signOutHandler,
  notification,
  toggleNotification,
  user,
}) => {
  const [unseen, setUnseen] = useState(false);

  useEffect(() => {
    let all = false;
    for (let key in user.friendRequest) {
      if (!user.friendRequest[key].seen) {
        all = true;
      }
    }
    setUnseen(all);
  }, [user]);

  return (
    <>
      <Grid container>
        <Grid item xs={3} className="header sidebar-header">
          <Typography className="header-title">Chats.</Typography>
          <IconButton onClick={toggleNotification}>
            {notification ? (
              <ChatBubbleOutlineRoundedIcon
                size="40"
                style={{ color: "aquamarine" }}
              />
            ) : (
              <NotificationsNoneIcon
                className={`${unseen ? "new-noti" : "no-noti"}`}
                size="40"
              />
            )}
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
