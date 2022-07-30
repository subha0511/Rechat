import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Message = ({ data, user }) => {
  return (
    <>
      <p
        className={`message-timestamp ${
          user.uid === data.senderId.uid ? "right" : "left"
        }`}
      >
        {dayjs(data.timestamp?.toDate()).fromNow()}
      </p>
      <div
        className={`message-wrapper ${
          user.uid === data.senderId.uid ? "sent" : "received"
        }`}
      >
        <p className="message">{data.message}</p>
      </div>
    </>
  );
};

export default Message;
