import React, { useState, useEffect } from "react";
import classes from "./Chat.module.css";
import ChatForm from "./ChatForm";
const Chat = (props) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    setChatList(props.field.list);
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
      <ChatForm fieldId={props.field.fid} onAdd={AddChatToList}></ChatForm>
    </div>
  );
};

export default Chat;
