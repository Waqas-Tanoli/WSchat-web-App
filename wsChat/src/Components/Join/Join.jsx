import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;
const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img
          src="https://i.pinimg.com/736x/a8/eb/ef/a8ebef5df20a1696630aa395b36b6efd.jpg"
          alt="Logo Image"
        />
        <h1>wsChat</h1>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Your Name"
          type="text"
          id="joinInput"
        />
        <Link to="/chat" onClick={(e) => (!name ? e.preventDefault() : null)}>
          <button className="joinbtn" onClick={sendUser}>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
