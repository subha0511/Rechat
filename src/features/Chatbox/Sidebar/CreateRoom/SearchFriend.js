import React, { useState, useEffect } from "react";
import { autocompleteQuery } from "./../../../../firebase/userQuery";
import { useAuth } from "./../../../../context/AuthContext";

export default function SearchFriend({ setPeople, setLoading }) {
  const [inputValue, setInputValue] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const suggestionQuery = async () => {
      setLoading(true);
      try {
        const value = await autocompleteQuery(user, inputValue);
        setPeople(value);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    suggestionQuery();
  }, [inputValue, setPeople, setLoading, user]);

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
