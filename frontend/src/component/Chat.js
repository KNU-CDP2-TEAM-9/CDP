import React, { useState, useEffect } from "react";
import classes from "./Chat.module.css";
import ChatForm from "./ChatForm";
const Chat = (props) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const field = props.field;
    const fieldInfo = { id: id, field: field };
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/chat/field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(fieldInfo),
      });
      const resData = await response.json();
      setChatList(resData.list);
    };
    fetchData();
  }, [props.field]);

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
      <ChatForm field={props.field} onAdd={AddChatToList}></ChatForm>
    </div>
  );
};

export default Chat;
