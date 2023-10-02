import React from "react";

const Message = ({messageContent, me}) => {
  return (
    <div className="message" id={messageContent.author === me? "you":"other"}>
      <div className="message-content">
        <p>{messageContent.message}</p>
      </div>
      <div className="message-data">
        <p id="time">{messageContent.time}</p>
        <p id="author">{messageContent.author}</p>
      </div>
    </div>
  );
};

export default Message;
