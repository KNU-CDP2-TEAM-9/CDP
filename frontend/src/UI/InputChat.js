import React, { useState } from "react";
import classes from "./InputChat.module.css";

const InputChat = () => {
  const [chatText, setChatText] = useState("");

  const chatTextHandler = (event) => {
    setChatText(event.target.value);
  };

  return (
    <>
      <input
        className={classes.Input}
        type="text"
        value={chatText}
        onChange={chatTextHandler}
      ></input>
    </>
  );
};

export default InputChat;
