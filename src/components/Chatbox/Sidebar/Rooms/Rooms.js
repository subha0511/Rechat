import React, { useState, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import "../../chatbox.css";
import FriendList from "./FriendList";

const Rooms = ({ rooms, setRoom, toggleState }) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const sortOptions = () => {
      if (inputValue === "") {
        setOptions(rooms);
      } else {
        const opts = [];
        rooms.forEach((room) => {
          if (room.name.startsWith(inputValue)) {
            opts.push(room);
          }
        });
        setOptions(opts);
      }
    };
    sortOptions();
  }, [inputValue, rooms]);

  return (
    <>
      <div className="search-wrapper">
        <input
          type="type"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search"
          placeholder="Search..."
        />
      </div>
      <div className="room-list">
        {options.length > 0 ? (
          <>
            {options.map((data, index) => (
              <FriendList
                key={index}
                data={data}
                setRoom={setRoom}
                index={index}
              />
            ))}
          </>
        ) : (
          <div className="default-text">
            <Typography variant="body1">No conversations found</Typography>
          </div>
        )}
      </div>
      <div className="fab-wrapper">
        <Fab className="fab" id="add-icon" onClick={toggleState}>
          <AddIcon style={{ color: "white" }} />
        </Fab>
      </div>
    </>
  );
};

export default Rooms;
