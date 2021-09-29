import React, { useState, useRef, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Typography } from "@material-ui/core";
import FriendRequest from "./FriendRequest";
import { db } from "../../../../firestore";

const Notifications = ({ user }) => {
  const [requests, setRequests] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = db
      .collection("users")
      .doc(user.email)
      .onSnapshot((doc) => {
        setRequests(doc.data().friendRequest);
        setLoading(false);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div>
        <div className="friend-request-wrapper">
          <p className="friend-request-title">Notifications</p>
        </div>
        {loading ? (
          <div className="center-loading">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="room-list">
            {Object.keys(requests).length > 0 ? (
              Object.keys(requests).map((key, index) => (
                <FriendRequest
                  request={requests[`${key}`]}
                  requests={requests}
                  user={user}
                  friend={key}
                  key={index}
                />
              ))
            ) : (
              <div className="default-text">
                <Typography variant="body1">
                  No pending notifications
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Notifications);
