import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../css/MessageForm.module.css";
const MessageForm = (props) => {
  const [msgText, setMsgText] = useState("");
  const navigate = useNavigate();

  const msgTextHandler = (event) => {
    setMsgText(event.target.value);
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    props.onAdd(msgText);
    const token = localStorage.getItem("token");
    const msgInfo = {
      text: msgText,
      token: token,
      chatId: props.chatId,
    };
    const response = await fetch("http://localhost:8080/chat/msg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(msgInfo),
    });
    const resData = await response.json();
    if (resData.message === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }

    setMsgText("");

    const BotText = resData.BotText.text;

    props.onAddBot(BotText);
  };

  return (
    <>
      <form action="#" id="Chatting" onSubmit={SubmitHandler}>
        <input
          className={classes.InputChat}
          type="text"
          placeholder="원하시는 정보를 키워드 위주로 입력하여 주세요"
          value={msgText}
          onChange={msgTextHandler}
        ></input>
      </form>
    </>
  );
};

export default MessageForm;
