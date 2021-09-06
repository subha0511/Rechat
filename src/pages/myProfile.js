import React from "react";
import { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { db } from "../firestore";
import "./FriendBar.css";
import * as icons from "react-icons";
import firebase from "firebase";

const MyProfile = ({ user, setMyProfile, setProfile, myData, setMyData }) => {
  let friendReq = { ...myData.friendRequest };

  const FriendBar = () => {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    return (
      <>
        <div className="navbar">
          <div className="back">
            <FaIcons.FaArrowLeft
              onClick={() => setMyProfile(false)}
              color="white"
            />
          </div>
          <div className="menu-bars">
            <FaIcons.FaUserFriends onClick={showSidebar} color="white" />
          </div>
        </div>
        <nav className={sidebar === false ? "nav-menu" : "nav-menu active"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <div className="menu-bars" onClick={showSidebar}>
                <AiIcons.AiOutlineClose color="white" />
              </div>
            </li>
            {Object.keys(friendReq).map((key, index) => {
              return <FriendbarData data={key} image={friendReq[key].photo} />;
            })}
          </ul>
        </nav>
      </>
    );
  };
  const FriendbarData = ({ image, data }) => {
    const [tick, setTick] = useState(false);
    const addFriendHandler = (data, image) => {
      let userRef = db.collection("users").doc(user.email);
      db.collection("groups")
        .doc()
        .set({
          // joined: firebase.firestore.FieldValue.serverTimestamp,
          // lastUpdated: firebase.firestore.Timestamp,
          members: [user.email, data],
          lastMessage: "",
          name1: user.displayName,
          image1: user.photoURL,
          name2: friendReq[data].name,
          image2: friendReq[data].photo,
        });
      userRef.set(
        {
          friendRequest: {
            [data]: firebase.firestore.FieldValue.delete(),
          },

          friends: firebase.firestore.FieldValue.arrayUnion(data),
        },
        { merge: true }
      );
      let reqRef = db.collection("users").doc(data);
      reqRef.update({
        friends: firebase.firestore.FieldValue.arrayUnion(user.email),
      });

      setTick(true);
    };
    const searchRequestHandler = (data) => {
      setProfile(data);
    };
    return (
      <div className="requests">
        <ul>
          <li>
            <div className="reqImage">
              <img src={image} alt="img" />
            </div>
            <div className="requestData">
              <p>{data}</p>
            </div>
            <div className="addfriend">
              <div
                className="addfriendicon"
                onClick={() => {
                  addFriendHandler(data, image);
                }}
              >
                {tick === true ? (
                  <FaIcons.FaThumbsUp className="thumbsup" />
                ) : (
                  <FaIcons.FaPlus />
                )}
              </div>
            </div>
            <div className="search-profile">
              <div
                className="searchicon"
                onClick={(e) => {
                  searchRequestHandler(data);
                }}
              >
                <FaIcons.FaSearch />
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <FriendBar />
      <h1>{user.email}</h1>
    </div>
  );
};

export default MyProfile;
