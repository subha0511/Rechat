import React from "react";
import Grid from "@material-ui/core/grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightOutlinedIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import "./chatbox.css";

const getRandomColorLight = (val) => {
  const color = "hsl(" + (val % 10) * 36 + ", 100%, 75%)";
  return color;
};

const Suggestions = ({ data, index, setProfile }) => {
  return (
    <>
      <Grid container className="suggestion-wrapper">
        <Grid item xs={10}>
          <Typography variant="body1">{data}</Typography>
        </Grid>
        <Grid item xs={2} className="open-profile">
          <IconButton onClick={() => setProfile(data)}>
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
