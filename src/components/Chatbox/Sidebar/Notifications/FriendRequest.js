import React from "react";
import firebase from "firebase";
import { Avatar, IconButton, Grid } from "@material-ui/core";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { formatDate } from "../../formatDate";
import { db } from "../../../../firestore";

const getRandomColorLight = (val = Math.random() * 5) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
  return color;
};
const getRandomColorDark = (val = Math.random() * 10) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 15%)";
  return color;
};

const FriendRequest = ({
  request,
  requests,
  setRequests,
  setUpdate,
  friend,
  user,
}) => {
  const changeSeen = () => {
    if (!request.seen) {
      request.seen = true;
      const newRequests = { ...requests };
      newRequests[friend] = request;
      setRequests(newRequests);
      setUpdate(true);
    }
  };

  const addFriendHandler = () => {
    let userRef = db.collection("users").doc(user.email);
    db.collection("groups")
      .doc()
      .set({
        joined: firebase.firestore.FieldValue.serverTimestamp(),
        lastUpdated: firebase.firestore.FieldValue.serverTimestamp(),
        members: [user.email, friend],
        lastMessage: "",
        name1: user.displayName,
        image1: user.photoURL,
        name2: request.displayName,
        image2: request.photoURL,
      });
    userRef.set(
      {
        friendRequest: {
          [friend]: firebase.firestore.FieldValue.delete(),
        },
        friends: firebase.firestore.FieldValue.arrayUnion(friend),
      },
      { merge: true }
    );
    let reqRef = db.collection("users").doc(friend);
    reqRef.update({
      friends: firebase.firestore.FieldValue.arrayUnion(user.email),
      sentRequest: firebase.firestore.FieldValue.arrayRemove(user.email),
    });
  };

  return (
    <>
      <div
        className={`room ${request.seen ? "" : "unseen"}`}
        onClick={changeSeen}
      >
        <Avatar
          className="sidebar-avatar"
          style={{
            backgroundColor: `${getRandomColorLight()}`,
            color: `${getRandomColorDark()}`,
          }}
          src={request.photoURL}
        >
          {request.displayName.substring(0, 1)}
        </Avatar>
        <Grid container item xs={11}>
          <div className="room-details">
            <div className="grid-line">
              <p className="room-name">{request.displayName}</p>
            </div>
            <div className="grid-line">
              <p className="room-description">
                {formatDate(request.timestamp)}
              </p>
            </div>
          </div>
        </Grid>
        <Grid container item xs>
          <IconButton style={{ padding: "8px" }}>
            <DeleteOutlineRoundedIcon color="secondary" />
          </IconButton>
        </Grid>
        <Grid container item xs>
          <IconButton style={{ padding: "8px" }} onClick={addFriendHandler}>
            <AddCircleOutlineRoundedIcon style={{ color: "#00d656" }} />
          </IconButton>
        </Grid>
        <Grid container item xs>
          <IconButton style={{ padding: "8px" }}>
            <ArrowForwardIosRoundedIcon style={{ color: "#dae2e6" }} />
          </IconButton>
        </Grid>
      </div>
    </>
  );
};

export default React.memo(FriendRequest);
