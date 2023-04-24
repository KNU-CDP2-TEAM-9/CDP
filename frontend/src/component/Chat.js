import React, { useState } from "react";
import classes from "./Chat.module.css";
import InputChat from "./ChatForm";
const Chat = () => {
  const [chatList, setChatList] = useState([]);
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
      <InputChat onAdd={AddChatToList}></InputChat>
    </div>
  );
};

export default Chat;
