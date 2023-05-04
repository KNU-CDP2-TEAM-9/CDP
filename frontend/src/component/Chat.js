import React, { useState, useEffect } from "react";
import classes from "../css/Chat.module.css";
import MessageForm from "./MessageForm";

const Chat = (props) => {
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    if (props.list !== undefined) {
      setMsgList(props.list);
    }
  }, [props.list]);

  const AddMsgHandler = (item) => {
    const value = { isUser: true, text: item };
    setMsgList((prev) => {
      return [...prev, value];
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.ulWrapper}>
        <ul className={classes.list}>
          {msgList.map((item, index) => {
            return (
              <li className={classes.item} key={index}>
                {item.text}
              </li>
            );
          })}
        </ul>
      </div>
      <MessageForm onAdd={AddMsgHandler} chatId={props.chatId}></MessageForm>
    </div>
  );
};

export default React.memo(Chat);
