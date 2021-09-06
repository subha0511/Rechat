import React from "react";
import firebase from "firebase";
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import "../../chatbox.css";
import { db } from "../../../../firestore";

const getRandomColorLight = (val) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
  return color;
};

const Suggestions = ({ data, index, setProfile, user }) => {
  const sendRequest = () => {
    db.collection("users")
      .doc(data)
      .set(
        {
          friendRequest: {
            [user.email]: {
              email: user.email,
              photoURL: user.photoURL,
              displayName: user.displayName,
              seen: false,
            },
          },
        },
        { merge: true }
      );
    db.collection("users")
      .doc(user.email)
      .update({
        sentRequest: firebase.firestore.FieldValue.arrayUnion(data),
      });
  };

  return (
    <>
      <Grid container className="suggestion-wrapper">
        <Grid item xs={9}>
          <Typography variant="body1">{data}</Typography>
        </Grid>
        <Grid item xs={1} className="open-profile">
          <IconButton onClick={sendRequest}>
            <AddCircleOutlineRoundedIcon
              style={{ fontSize: 30, color: "#00d656" }}
            />
          </IconButton>
        </Grid>
        <Grid item xs={2} className="open-profile">
          <IconButton>
            <KeyboardArrowRightOutlinedIcon
              style={{ fontSize: 40, color: getRandomColorLight(index) }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
};

export default Suggestions;
