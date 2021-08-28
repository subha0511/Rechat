/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useState } from "react";
import Profile from "../../pages/Profile";
import { db } from "../../firestore";
export default function FreeSolo({ setProfile }) {
  const [people, setPeople] = useState([""]);
  function compare(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (var i = 0, len = arr1.length; i < len; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }
  const r = (e) => {
    return e.preventDefault();
  };
  return (
    <div style={{ width: 300 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={people}
        renderInput={(params) => {
          let searchName = params.inputProps.value;
          console.log(searchName);
          let users = db.collection("users");
          if (searchName.length > 4) {
            users
              .orderBy("email")
              .startAt(searchName)
              .endAt(searchName + "\uf8ff")
              .limit(2)
              .get()
              .then((querySnapshot) => {
                let suggestions = [];
                querySnapshot.forEach((doc) => {
                  suggestions.push(doc.data().email);
                });
                if (compare(people, suggestions) === false) {
                  setPeople(suggestions);
                }
              });
          }
          return (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setProfile(true);
              }}
            >
              <TextField
                {...params}
                label="freeSolo"
                margin="normal"
                variant="outlined"
              />
              <input value="search" type="submit" />
            </form>
          );
        }}
      />
    </div>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
