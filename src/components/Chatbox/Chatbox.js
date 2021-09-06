import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Sidebar from "./Sidebar/Sidebar";
import Activeroom from "./Sidebar/Rooms/Activeroom";
import Header from "./Header/Header";
import "./chatbox.css";
import MyProfile from "../../pages/myProfile";
import Profile from "../../pages/othersProfile";
import { formatDate } from "./formatDate";

import { db } from "../../firestore";

const organise = (response, user) => {
  const uid = response.id;
  const data = response.data();
  let name = "";
  let photoURL = "";
  if (data.name === undefined) {
    if (data.name1 !== user.displayName) {
      name = data.name1;
      photoURL = data.photoURL1;
    } else {
      name = data.name2;
      photoURL = data.photoURL2;
    }
  }
  return { ...data, name: name, uid: uid, photoURL: photoURL };
};

const Chatbox = ({ signOutHandler, user }) => {
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(false);
  const [myData, setMyData] = useState({ friendRequest: {} });
  const [myProfile, setMyProfile] = useState(false);
  const [profile, setProfile] = useState(false);

  const groupRef = db.collection("groups");

  const toggleNotification = () => {
    setNotification(!notification);
  };

  useEffect(() => {
    const unsubscribe = groupRef
      .where("members", "array-contains", user.email)
      .orderBy("lastUpdated", "desc")
      .onSnapshot((querySnapshot) => {
        const groups = [];
        querySnapshot.forEach((doc) => {
          groups.push(organise(doc, user));
        });
        setRooms(groups);
      });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (room === null) {
      return;
    }
    const messageRef = db
      .collection("groups")
      .doc(room.uid)
      .collection("messages");
    const unsubscribe = messageRef
      .orderBy("timestamp", "desc")
      .limit(50)
      .onSnapshot((querySnapshot) => {
        const mssgs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.timestamp = formatDate(data.timestamp);
          mssgs.push(data);
        });
        setMessages(mssgs.reverse());
      });

    return () => unsubscribe();
  }, [room]);

  return (
    <div>
      {profile === false && myProfile === false ? (
        <div>
          <Grid container className="container">
            <Grid item xs={12}>
              <Header
                room={room}
                signOutHandler={signOutHandler}
                toggleNotification={toggleNotification}
                notification={notification}
                user={user}
              />
            </Grid>
            <Grid item xs={3} className="sidebar">
              <Sidebar
                rooms={rooms}
                setProfile={setProfile}
                setRoom={setRoom}
                user={user}
                notification={notification}
              ></Sidebar>
            </Grid>
            <Grid item xs className="chat-box">
              <Activeroom
                messages={messages}
                room={room}
                user={user}
              ></Activeroom>
            </Grid>
          </Grid>
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
