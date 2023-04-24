import React, { useState } from "react";
import classes from "./InputChat.module.css";

const InputChat = (props) => {
  const [chatText, setChatText] = useState("");

  const chatTextHandler = (event) => {
    setChatText(event.target.value);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();
    props.onAdd(chatText);
    setChatText("");
  };

  return (
    <>
      <form action="#" id="Chatting" onSubmit={SubmitHandler}>
        <input
          className={classes.InputChat}
          type="text"
          value={chatText}
          onChange={chatTextHandler}
        ></input>
      </form>
    </>
  );
};

export default InputChat;
