import React from "react";
import Avatar from "@mui/material/Avatar";
import "../../chatbox.css";
import { useRoom } from "../../../../context/RoomContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const getRandomColorLight = (val) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
  return color;
};
const getRandomColorDark = (val) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 15%)";
  return color;
};

const RoomItem = ({ data, index }) => {
  const { setActiveRoom } = useRoom();
  return (
    <>
      {data && (
        <div className="room" onClick={() => setActiveRoom(data)}>
          <Avatar
            className="sidebar-avatar"
            src={data.photoURL}
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
              <p className="room-timestamp">
                {dayjs(data.lastUpdated?.toDate()).fromNow()}
              </p>
            </div>
            <div className="grid-line">
              <p className="room-description">
                {data.lastMessage.substring(0, 25)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomItem;
