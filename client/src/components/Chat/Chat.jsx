import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Chat = ({ socket, username, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMsg = async () => {
    if (currentMsg !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      setMessageList((list) => [...list, messageData]);
      await socket.emit("send_message", messageData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);


  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => (
            <Message messageContent={messageContent} me={username} />
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          placeholder="..."
          onChange={(e) => setCurrentMsg(e.target.value)}
          value={currentMsg}
          onKeyUp={(e) => e.key === "Enter" && sendMsg()}
        />
        <button onClick={sendMsg}>&#9658; Send</button>
      </div>
    </div>
  );
};

export default Chat;
