import React, { useState } from "react";

import "../chatbox.css";
import Rooms from "./Rooms/Rooms";
import CreateRoom from "./CreateRoom/CreateRoom";
import Notifications from "./Notifications/Notifications";

const Sidebar = ({ rooms, setProfile, setRoom, user, notification }) => {
  const [open, setOpen] = useState(true);

  const toggleState = () => {
    setOpen(!open);
  };

  return (
    <>
      <div className="wrapper">
        {notification ? (
          <>
            <Notifications user={user} />
          </>
        ) : (
          <>
            {open ? (
              <Rooms
                rooms={rooms}
                setRoom={setRoom}
                toggleState={toggleState}
              />
            ) : (
              <CreateRoom
                setProfile={setProfile}
                toggleState={toggleState}
                user={user}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;
