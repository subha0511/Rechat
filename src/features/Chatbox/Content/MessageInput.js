import React, { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import { AiOutlineSend } from "react-icons/ai";
import { addMessage } from "../../../firebase/roomQuery";
import { useRoom } from "../../../context/RoomContext";
import { useAuth } from "../../../context/AuthContext";

const MessageInput = () => {
  const { user } = useAuth();
  const { activeRoom } = useRoom();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendHandler = (e) => {
    e?.preventDefault();
    if (message !== "" && !isLoading) {
      const senderId = { uid: user.uid, name: user.displayName };
      setIsLoading(true);
      addMessage(senderId, activeRoom.uid, message);
      setIsLoading(false);
      setMessage("");
    }
  };

  return (
    <>
      <form className="footer" onClick={sendHandler}>
        {activeRoom && (
          <>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="chat-input"
              placeholder="Enter your message..."
            />
            <input type="submit" className="invisible" />
            <IconButton className="chat-submit" type="submit">
              {isLoading ? (
                <CircularProgress
                  className="send-icon"
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                <AiOutlineSend
                  className="send-icon"
                  style={{ width: "30px", height: "30px" }}
                />
              )}
            </IconButton>
          </>
        )}
      </form>
    </>
  );
};

export default MessageInput;
