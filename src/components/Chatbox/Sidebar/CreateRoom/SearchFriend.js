import React, { useState, useEffect } from "react";

import { db } from "../../../../firestore";

const users = db.collection("users");

export default function SearchFriend({ setPeople, setLoading, user }) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchOptions = async () => {
      if (inputValue === "") {
        setPeople([]);
        setLoading(false);
        return;
      }
      users
        .orderBy("email")
        .where("email", "!=", user.email)
        .startAt(inputValue)
        .endAt(inputValue + "\uf8ff")
        .limit(5)
        .get()
        .then((querySnapshot) => {
          let suggestions = [];
          querySnapshot.forEach((doc) => {
            suggestions.push(doc.data().email);
          });
          setPeople(suggestions);
          setLoading(false);
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
