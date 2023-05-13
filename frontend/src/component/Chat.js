import React, { useState, useEffect, useRef } from "react";
import classes from "../css/Chat.module.css";
import MessageForm from "./MessageForm";

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
              <div className={classes.wrapper_question}>
                <li className={classes.item_question} key={index}>
                  {item.text}
                </li>
              </div>
            ) : (
              <div className={classes.wrapper_answer}>
                <li className={classes.item_answer} key={index}>
                  
                  {item.text.split("\n").map((value, key) => {
                    return (
                      <div key={key}>
                        {value}
                        <br />
                      </div>
                    );
                  })}
                </li>
              </div>
              
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
