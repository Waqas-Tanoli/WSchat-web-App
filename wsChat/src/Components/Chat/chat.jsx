import React, { useEffect } from "react";
import { user } from "../Join/Join";
import "./chat.css";
import io from "socket.io-client";
import { FaPaperPlane } from "react-icons/fa";
import { useState } from "react";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { MdClose } from "react-icons/md";

let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
  const [id, setId] = useState("");
  const [message, setMessage] = useState([]);
  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id, username: user });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setId(socket.id);
    });

    socket.emit("Joined", { user });

    socket.on("Welcome", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("userJoined", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    socket.on("leave", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit("Disconnect");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...message, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [message]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>wsChat</h2>
          <a href="/" className="cicon">
            {" "}
            <MdClose />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {message.map((item, i) => (
            <Message
              key={i}
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
            type="text"
            name=""
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            <FaPaperPlane className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
