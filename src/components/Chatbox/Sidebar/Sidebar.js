import React, { useState } from "react";

import "../chatbox.css";
import Rooms from "./Rooms/Rooms";
import CreateRoom from "./CreateRoom/CreateRoom";

const Sidebar = ({ rooms, setProfile, setRoom, user }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const toggleState = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="wrapper">
        {open ? (
          <Rooms rooms={rooms} setRoom={setRoom} toggleState={toggleState} />
        ) : (
          <CreateRoom
            setProfile={setProfile}
            toggleState={toggleState}
            user={user}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
