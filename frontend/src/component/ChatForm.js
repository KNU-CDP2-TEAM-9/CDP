import React, { useState } from "react";
import classes from "../css/ChatForm.module.css";
const ChatForm = (props) => {
  const [chatText, setChatText] = useState("");

  const chatTextHandler = (event) => {
    setChatText(event.target.value);
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    props.onAdd(chatText);
    const token = localStorage.getItem("token");
    const chatInfo = {
      message: chatText,
      token: token,
      fieldId: props.fieldId,
    };
    const response = await fetch("http://localhost:8080/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(chatInfo),
    });
    const resData = await response.json();
    console.log(resData);
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

export default ChatForm;
