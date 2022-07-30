import React from "react";
import { Grid, IconButton } from "@mui/material";
import { logout } from "../../../firebase/authQuery";
import { IoNotificationsOutline, IoExitOutline } from "react-icons/io5";
import { MdOutlineChatBubbleOutline } from "react-icons/md";
import { useAuth } from "./../../../context/AuthContext";

function SidebarHeader({ state, values, openNotification, openChat }) {
  const signOutHandler = () => logout();
  const { setUnseenNotifications } = useAuth();

  return (
    <Grid item className="header sidebar-header">
      <div className="header-logo-wrapper">
        <svg
          id="logo-35"
          width="50"
          viewBox="0 0 50 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="header-logo-svg"
        >
          {" "}
          <path
            d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
            className="ccompli1"
            fill="#55e5b5"
            stopColor="#55e5b5"
          ></path>{" "}
          <path
            d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
            className="ccustom"
            fill="#7fffd4"
            stopColor="#7fffd4"
          ></path>{" "}
        </svg>
      </div>
      {state === values.NOTIFICATION ? (
        <IconButton onClick={openChat}>
          <MdOutlineChatBubbleOutline
            size="22"
            style={{ paddingTop: "1px", color: "rgba(231, 251, 255, 0.85)" }}
          />
        </IconButton>
      ) : (
        <IconButton onClick={openNotification}>
          <IoNotificationsOutline
            size="22"
            className={`no-noti ${setUnseenNotifications ? "new-noti" : ""}`}
          />
        </IconButton>
      )}

      <IconButton onClick={signOutHandler}>
        <IoExitOutline
          color="secondary"
          size="24"
          style={{ color: "#ff7961" }}
        />
      </IconButton>
    </Grid>
  );
}

export default SidebarHeader;
