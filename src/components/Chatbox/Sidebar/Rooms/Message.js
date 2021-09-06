import React from "react";
import { formatDate } from "../../formatDate";

const Message = ({ data, user }) => {
  return (
    <>
      <p
        className={`message-timestamp ${
          user.displayName === data.senderId ? "right" : "left"
        }`}
      >
        {data.timestamp}
      </p>
      <div
        className={`message-wrapper ${
          user.displayName === data.senderId ? "sent" : "received"
        }`}
      >
        <p className="message">{data.message}</p>
      </div>
    </>
  );
};

export default React.memo(Message);
