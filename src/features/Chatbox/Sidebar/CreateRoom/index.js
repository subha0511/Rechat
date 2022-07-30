import React, { useState } from "react";
import { Fab, CircularProgress, Typography } from "@mui/material";
import { BsChatLeft } from "react-icons/bs";
import SearchFriend from "./SearchFriend";
import Suggestions from "./Suggestions";

const CreateRoom = ({ openChat }) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="search-wrapper">
        <SearchFriend setLoading={setLoading} setPeople={setPeople} />
      </div>
      <div className="email-list">
        {loading ? (
          <div className="center-loading">
            <CircularProgress color="secondary" />
          </div>
        ) : people.length > 0 ? (
          <>
            {people.map((data, index) => (
              <Suggestions key={index} data={data} index={index} />
            ))}
          </>
        ) : (
          <div className="default-text">
            <Typography variant="body1">Nothing to show</Typography>
          </div>
        )}
      </div>
      <div className="fab-wrapper">
        <Fab className="fab" id="chat-icon" onClick={openChat}>
          <BsChatLeft size={20} style={{ color: "white" }} />
        </Fab>
      </div>
    </>
  );
};

export default CreateRoom;
