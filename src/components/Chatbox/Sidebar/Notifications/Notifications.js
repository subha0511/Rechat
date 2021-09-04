import React, { useState, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";
import FriendRequest from "./FriendRequest";
import { db } from "../../../../firestore";

const Notifications = ({ user }) => {
  const [requests, setRequests] = useState({});

  useEffect(() => {
    const unsubscribe = db
      .collection("users")
      .doc(user.email)
      .onSnapshot((doc) => {
        setRequests(doc.data().friendRequest);
      });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div>
        <div className="friend-request-wrapper">
          <p className="friend-request-title">Friend Requests</p>
        </div>
        <div className="room-list">
          {requests ? (
            Object.keys(requests).map((key, index) => (
              <FriendRequest request={requests[`${key}`]} key={index} />
            ))
          ) : (
            <p>No pending friend requests</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Notifications;
