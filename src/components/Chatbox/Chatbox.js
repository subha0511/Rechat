import React, { useState, useRef, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { dummyData, messages as dummyMessages } from "./dummyrooms";
import Sidebar from "./Sidebar";
import Activeroom from "./Activeroom";
import Header from "./Header/Header";
import "./chatbox.css";
import Profile from "../../pages/othersProfile";
import MyProfile from "../../pages/myProfile";
import { db } from "../../firestore";

const Chatbox = ({ signOutHandler, user }) => {
  const users = db.collection("users");
  const [myData, setMyData] = useState({ friendRequest: {} });
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  const [myProfile, setMyProfile] = useState(false);
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    db.collection("users")
      .doc(user.email)
      .get()
      .then((querySnapshot) => {
        setMyData(querySnapshot.data());
      });
  }, []);
  return (
    <div>
      {profile === false && myProfile == false ? (
        <div>
          <Grid container className="container">
            <Grid item xs={12}>
              <Header dummyData={dummyData} />
              <button
                onClick={signOutHandler}
                style={{ width: "100%", height: "100%", color: "white" }}
              ></button>
            </Grid>
            <Grid item xs={3} className="sidebar">
              <Sidebar
                user={user}
                dummyData={dummyData}
                setProfile={setProfile}
              ></Sidebar>
            </Grid>
            <Grid item xs className="chat-box">
              <Activeroom
                user={user}
                message={dummyMessages}
                room={room}
              ></Activeroom>
            </Grid>
          </Grid>
          <button
            style={{
              width: "1000px",
              height: "100px",
              backgroundColor: "green",
            }}
            onClick={() => setMyProfile(true)}
          ></button>
        </div>
      ) : profile ? (
        <Profile
          profile={profile}
          user={user}
          setProfile={setProfile}
          myData={myData}
          setMyData={setMyData}
        />
      ) : (
        <MyProfile
          user={user}
          setMyProfile={setMyProfile}
          setProfile={setProfile}
          myData={myData}
          setMyData={setMyData}
        />
      )}
    </div>
  );
};

export default Chatbox;
