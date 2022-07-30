import { useState, useEffect, memo } from "react";
import { Typography, Fab } from "@mui/material";
import { MdAdd } from "react-icons/md";
import FriendList from "./RoomItem";
import { useRoom } from "../../../../context/RoomContext";

const Rooms = ({ openFriendSearch }) => {
  const { rooms } = useRoom();
  const [filterValue, setFilterValue] = useState("");
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const sortOptions = () => {
      if (filterValue === "") {
        setOptions(rooms);
      } else {
        const opts = [];
        rooms.forEach((room) => {
          if (room.name.toLowerCase().startsWith(filterValue.toLowerCase())) {
            opts.push(room);
          }
        });
        setOptions(opts);
      }
    };
    sortOptions();
  }, [filterValue, rooms]);

  return (
    <>
      <div className="search-wrapper">
        <input
          type="type"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="search"
          placeholder="Search..."
        />
      </div>
      <div className="room-list">
        {options.length > 0 ? (
          <>
            {options.map((data, index) => (
              <FriendList key={index} data={data} index={index} />
            ))}
          </>
        ) : (
          <div className="default-text">
            <Typography variant="body1">No conversations found</Typography>
          </div>
        )}
      </div>
      <div className="fab-wrapper">
        <Fab className="fab" id="add-icon" onClick={openFriendSearch}>
          <MdAdd size={22} style={{ color: "white" }} />
        </Fab>
      </div>
    </>
  );
};

export default memo(Rooms);
