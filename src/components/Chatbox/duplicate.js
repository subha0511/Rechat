import React, { useState, useEffect, useRef } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

import { db } from "../../firestore";

const users = db.collection("users");

export default function FreeSolo({ setProfile, setPeople, loading }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    loading.current = true;
    if (inputValue === "") {
      loading.current = false;
      setPeople([]);
      return;
    }
    const fetchOptions = async () => {
      users
        .orderBy("email")
        .startAt(inputValue)
        .endAt(inputValue + "\uf8ff")
        .limit(2)
        .get()
        .then((querySnapshot) => {
          let suggestions = [];
          querySnapshot.forEach((doc) => {
            suggestions.push(doc.data().email);
          });
          setPeople(suggestions);
          loading.current = false;
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
    <>
      <input
        type="text"
        className="search"
        placeholder="Search Friend..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </>
  );
}
