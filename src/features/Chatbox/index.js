import React from "react";
import Grid from "@mui/material/Grid";
import Sidebar from "./Sidebar/Sidebar";
import "./chatbox.css";
import Content from "./Content/index";

const Chatbox = () => {
  return (
    <div>
      {true ? (
        <div>
          <Grid container className="container">
            <Grid item sm={3} className="sidebar">
              <Sidebar />
            </Grid>
            <Grid item sm className="chat-box">
              <Content />
            </Grid>
          </Grid>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chatbox;

// {
//   profile ? (
//     <Profile
//       profile={profile}
//       user={user}
//       setProfile={setProfile}
//       myData={myData}
//       setMyData={setMyData}
//     />
//   ) : (
//     <MyProfile
//       user={user}
//       setMyProfile={setMyProfile}
//       setProfile={setProfile}
//       myData={myData}
//       setMyData={setMyData}
//     />
//   );
// }
