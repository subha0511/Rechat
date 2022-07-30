import React, { useState } from "react";
import "../chatbox.css";
import Rooms from "./Rooms/RoomList";
import CreateRoom from "./CreateRoom";
import Notifications from "./Notifications";
import SidebarHeader from "./SidebarHeader";

const values = {
  CHAT: "CHAT",
  FRIENDSEARCH: "FRIENDSEARCH",
  NOTIFICATION: "NOTIFICATION",
};

const Sidebar = () => {
  const [state, setState] = useState(values.CHAT);

  const openChat = () => setState(values.CHAT);
  const openFriendSearch = () => setState(values.FRIENDSEARCH);
  const openNotification = () => setState(values.NOTIFICATION);

  return (
    <>
      <div className="wrapper">
        <SidebarHeader
          state={state}
          values={values}
          openChat={openChat}
          openNotification={openNotification}
        />
        {state === values.CHAT && <Rooms openFriendSearch={openFriendSearch} />}
        {state === values.NOTIFICATION && (
          <Notifications openFriendSearch={openFriendSearch} />
        )}
        {state === values.FRIENDSEARCH && <CreateRoom openChat={openChat} />}
      </div>
    </>
  );
};

export default Sidebar;

// <CreateRoom
//   // setProfile={setProfile}
//   toggleState={toggleState}
//   user={user}
// />
