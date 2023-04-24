import React, { useState } from "react";
import classes from "./InputChat.module.css";

const InputChat = (props) => {
  const [chatText, setChatText] = useState("");

  const chatTextHandler = (event) => {
    setChatText(event.target.value);
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    props.onAdd(chatText);
    const response = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: chatText,
      }),
    });
    const responseData = await response.json();
    console.log(responseData);
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
