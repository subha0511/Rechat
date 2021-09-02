import React from "react";

const Message = ({ data, user }) => {
  return (
    <>
      <div
        className={`message-wrapper ${
          user.displayName === data.sender ? "sent" : "received"
        }`}
      >
        <p className="message">{data.message}</p>
      </div>
    </>
  );
};

export default Message;
