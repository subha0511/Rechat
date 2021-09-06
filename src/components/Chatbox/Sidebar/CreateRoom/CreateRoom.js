import React, { useState } from "react";

import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import "../../chatbox.css";
import SearchFriend from "./SearchFriend";
import Suggestions from "./Suggestions";

const CreateRoom = ({ setProfile, toggleState, user }) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="search-wrapper">
        <SearchFriend
          setLoading={setLoading}
          setPeople={setPeople}
          user={user}
        />
      </div>
      <div className="email-list">
        {loading ? (
          <div className="center-loading">
            <CircularProgress color="secondary" />
          </div>
        ) : people.length > 0 ? (
          <>
            {people.map((data, index) => (
              <Suggestions
                key={index}
                data={data}
                setProfile={setProfile}
                index={index}
                user={user}
              />
            ))}
          </>
        ) : (
          <div className="default-text">
            <Typography variant="body1">Nothing to show</Typography>
          </div>
        )}
      </div>
      <div className="fab-wrapper">
        <Fab className="fab" id="chat-icon" onClick={toggleState}>
          <ChatBubbleOutlineOutlinedIcon style={{ color: "white" }} />
        </Fab>
      </div>
    </>
  );
};

export default CreateRoom;
