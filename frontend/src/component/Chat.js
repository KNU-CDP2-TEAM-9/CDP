import React, { useState, useEffect } from "react";
import classes from "../css/Chat.module.css";
import ChatForm from "./ChatForm";

const Chat = (props) => {
  const [chatList, setMsgList] = useState([]);

  useEffect(() => {
    if (props.list !== undefined) {
      setMsgList(props.list);
    }
  }, [props.list]);

  const AddChatToList = (items) => {
    const value = { isUser: true, text: items };
    setMsgList((prev) => {
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
    </div>
  );
};

export default Chat;
