import React, { useState, useEffect } from "react";
import classes from "../css/Chat.module.css";
import ChatForm from "./ChatForm";
import { useLocation } from "react-router-dom";

const Chat = () => {
  const location = useLocation();
  const locationList = location.pathname.split("/");
  const arrLength = locationList.length;
  const chatId = locationList[arrLength - 1];
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const loadList = async (cId) => {
      const token = localStorage.getItem("token");
      const chatId = cId;
      const chatInfo = { token: token, chatId: chatId };
      const response = await fetch("http://localhost:8080/chat/" + chatId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(chatInfo),
      });
      const resData = await response.json();
      const resList = resData.list.map((data) => {
        return {
          isUser: data.isUser,
          text: data.text,
        };
      });
      console.log(resList);
      setChatList(resList);
    };
    loadList(chatId);
  }, [location, chatId]);

  const AddChatToList = (items) => {
    const value = { isUser: true, text: items };
    setChatList((prev) => {
      return [...prev, value];
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.ulWrapper}>
        <ul className={classes.list}>
          {chatList.map((item, index) => {
            return (
              <li className={classes.item} key={index}>
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
      <ChatForm chatId={chatId} onAdd={AddChatToList}></ChatForm>
    </div>
  );
};

export default Chat;
