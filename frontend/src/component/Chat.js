import React, { useState, useEffect } from "react";
import classes from "./Chat.module.css";
import ChatForm from "./ChatForm";
const Chat = (props) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    console.log(props.field);
  }, [props.field]);

  const AddChatToList = (items) => {
    setChatList((prev) => {
      return [...prev, items];
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.ulWrapper}>
        <ul className={classes.list}>
          {chatList.map((item, index) => {
            return (
              <li className={classes.item} key={index}>
                {item}
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
