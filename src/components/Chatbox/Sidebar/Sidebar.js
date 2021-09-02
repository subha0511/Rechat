import React, { useState, useRef, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import "../chatbox.css";
import SearchFriend from "./SearchFriend";
import FriendList from "./FriendList";
import Suggestions from "./Suggestions";

const Sidebar = ({ rooms, setProfile, setRoom }) => {
  const [people, setPeople] = useState([]);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const newFriend = (e) => {
    e.preventDefault();
    console.log(inputRef.current.value);
    inputRef.current.value = "";
  };

  const toggleState = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="wrapper">
        {open ? (
          <>
            <form className="search-wrapper" onSubmit={newFriend}>
              <input
                type="type"
                ref={inputRef}
                className="search"
                placeholder="Search..."
              />
              <input type="submit" className="invisible" />
            </form>
            <div className="room-list">
              {rooms &&
                rooms.map((data, index) => (
                  <FriendList
                    key={index}
                    data={data}
                    setRoom={setRoom}
                    index={index}
                  />
                ))}
            </div>
            <div className="fab-wrapper">
              <Fab className="fab" id="add-icon" onClick={toggleState}>
                <AddIcon style={{ color: "white" }} />
              </Fab>
            </div>
          </>
        ) : (
          <>
            <div className="search-wrapper">
              <SearchFriend setLoading={setLoading} setPeople={setPeople} />
            </div>
            <div className="email-list">
              {loading ? (
                <div className="center-loading">
                  <CircularProgress color="secondary" />
                </div>
              ) : people.length > 0 ? (
                <>
                  {people.map((data, index) => (
                    <Suggestions
                      key={index}
                      data={data}
                      setProfile={setProfile}
                      index={index}
                    />
                  ))}
                </>
              ) : (
                <div className="default-text">
                  <Typography variant="body1">Nothing to show</Typography>
                </div>
              )}
            </div>
            <div className="fab-wrapper">
              <Fab className="fab" id="chat-icon" onClick={toggleState}>
                <ChatBubbleOutlineOutlinedIcon style={{ color: "white" }} />
              </Fab>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
