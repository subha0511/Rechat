import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { db } from "../../firestore";

const users = db.collection("users");

const useStyles = makeStyles((theme) => ({
  textField: {
    fontColor: "white",
    placeholderColor: "white",
  },
}));

export default function FreeSolo({ setProfile }) {
  const [inputValue, setInputValue] = useState("");
  const [people, setPeople] = useState([]);
  let loading = false;

  const classes = useStyles();

  useEffect(() => {
    loading = true;

    const fetchOptions = async () => {
      users
        .orderBy("email")
        .startAt(inputValue)
        .limit(2)
        .get()
        .then((querySnapshot) => {
          let suggestions = [];
          querySnapshot.forEach((doc) => {
            suggestions.push(doc.data().email);
          });
          setPeople(suggestions);
          loading = false;
        });
    };

    const timer = setTimeout(() => {
      fetchOptions();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  return (
    <Autocomplete
      freeSolo
      fullWidth
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={people}
      onChange={(event, newValue) => {
        setProfile(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          color="secondary"
          variant="outlined"
          placeholder="Search Friend"
          className={classes.textField}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    style={{ color: "white" }}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          className="add-friend-input"
        />
      )}
    />
  );
}
