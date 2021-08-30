import React, { useState, useRef, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import "./chatbox.css";
import Freesolo from "./duplicate";
import RoomDetails from "./RoomDisplay";
import Suggestions from "./Suggestions";

const Sidebar = ({ dummyData, setProfile }) => {
  const [people, setPeople] = useState([]);
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleState = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="wrapper">
        {open ? (
          <>
            <div className="search-wrapper">
              <input type="text" className="search" placeholder="Search..." />
            </div>
            <div className="room-list">
              {dummyData.map((data, index) => (
                <RoomDetails key={index} data={data} index={index} />
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
              <Freesolo setLoading={setLoading} setPeople={setPeople} />
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
