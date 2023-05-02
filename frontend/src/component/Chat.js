import React, { useState, useEffect } from "react";
import { useActionData } from "react-router-dom";
import classes from "../css/Chat.module.css";
import MessageForm from "./MessageForm";

const Chat = (props) => {
  const data = useActionData();
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    if (props.list !== undefined) {
      setMsgList(props.list);
    }
    if (data !== undefined && data !== null) {
      setMsgList((prev) => {
        return [...prev, data];
      });
    }
  }, [props.list, data]);

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
      <MessageForm></MessageForm>
    </div>
  );
};

export default Chat;
