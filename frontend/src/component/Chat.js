import React, { useState, useEffect } from "react";
import classes from "../css/Chat.module.css";
import ChatForm from "./ChatForm";
import { useLocation } from "react-router-dom";
const Chat = () => {
  const location = useLocation();
  const locationList = location.pathname.split("/");
  const arrLength = locationList.length;
  const fieldId = locationList[arrLength - 1];
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const loadList = async (fId) => {
      console.log(fId);
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      const fieldId = fId;
      const fieldInfo = { id: id, fieldId: fieldId };
      const response = await fetch("http://localhost:8080/chat/" + fieldId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(fieldInfo),
      });
      const resData = await response.json();
      const resList = resData.list.map((data) => {
        return {
          isUser: data.isUser,
          message: data.message,
        };
      });
      setChatList(resList);
    };
    loadList(fieldId);
  }, [location]);

  const AddChatToList = (items) => {
    const value = { isUser: true, message: items };
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
                {item.message}
              </li>
            );
          })}
        </ul>
      </div>
      <ChatForm fieldId={fieldId} onAdd={AddChatToList}></ChatForm>
    </div>
  );
};

export default Chat;
