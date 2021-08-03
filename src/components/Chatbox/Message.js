import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";

const Message = ({ data, user }) => {
  return (
    <>
      <div
        className={`message-wrapper ${
          user === data.sender ? "sent" : "received"
        }`}
      >
        <p className="message">{data.message}</p>
      </div>
    </>
  );
};

export default Message;
