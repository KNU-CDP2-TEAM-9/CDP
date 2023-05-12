import React, { useState, useEffect, useRef } from "react";
import classes from "../css/Chat.module.css";
import MessageForm from "./MessageForm";
import BotMessage from "./BotMessage";

const Chat = (props) => {
  const [msgList, setMsgList] = useState([]);
  const divRef = useRef();

  useEffect(() => {
    if (props.list !== undefined) {
      setMsgList(props.list);
    }
  }, [props.list]);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  });

  const AddMsgHandler = (item) => {
    const value = { isUser: true, text: item };
    setMsgList((prev) => {
      return [...prev, value];
    });
  };

  const AddBotHandler = (item) => {
    const value = { isUser: false, text: item };
    setMsgList((prev) => {
      return [...prev, value];
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.ulWrapper} ref={divRef}>
        <ul className={classes.list}>
          {msgList.map((item, index) => {
            return item.isUser ? (
              <li className={classes.item} key={index}>
                {item.text}
              </li>
            ) : (
              <li className={classes.item} key={index}>
                <BotMessage
                  text={item.text}
                  onAdd={AddMsgHandler}
                  onAddBot={AddBotHandler}
                ></BotMessage>
              </li>
            );
          })}
        </ul>
      </div>
      <MessageForm
        onAdd={AddMsgHandler}
        chatId={props.chatId}
        onAddBot={AddBotHandler}
      ></MessageForm>
    </div>
  );
};

export default React.memo(Chat);
