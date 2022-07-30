import React from "react";
import { Avatar, IconButton, Grid } from "@mui/material";
import { MdAddCircleOutline, MdOutlineDeleteOutline } from "react-icons/md";
import {
  createRoom,
  removeFriendRequest,
} from "../../../../firebase/roomQuery";
import { useAuth } from "./../../../../context/AuthContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const getRandomColorLight = (val = Math.random() * 5) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
  return color;
};
const getRandomColorDark = (val = Math.random() * 10) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 15%)";
  return color;
};

const FriendRequest = ({ data }) => {
  const { user } = useAuth();

  const addFriendHandler = async () => {
    try {
      await createRoom(user, data);
    } catch (err) {
      console.log(err);
    }
  };

  const removeFriendHandler = async () => {
    try {
      await removeFriendRequest(user, data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={`room ${data.seen ? "" : "unseen"}`}>
        <Avatar
          className="sidebar-avatar"
          style={{
            backgroundColor: `${getRandomColorLight()}`,
            color: `${getRandomColorDark()}`,
          }}
          src={data.photoURL}
        >
          {data.displayName.substring(0, 1)}
        </Avatar>
        <Grid container item xs={11}>
          <div className="room-details">
            <div className="grid-line">
              <p className="room-name">{data.displayName}</p>
            </div>
            <div className="grid-line">
              <p className="room-description">
                {/* {dayjs(data.timestamp.toDate()).fromNow()} */}
              </p>
            </div>
          </div>
        </Grid>
        <Grid container item xs>
          <IconButton style={{ padding: "8px" }} onClick={removeFriendHandler}>
            <MdOutlineDeleteOutline style={{ color: "#ff7961" }} />
          </IconButton>
        </Grid>
        <Grid container item xs>
          <IconButton style={{ padding: "8px" }} onClick={addFriendHandler}>
            <MdAddCircleOutline style={{ color: "#00d656" }} />
          </IconButton>
        </Grid>
      </div>
    </>
  );
};

export default FriendRequest;
