import React from "react";
import classes from "../css/Side.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ChatField from "./ChatField";
import AddChat from "./AddChat";

const Side = (props) => {
  const location = useLocation();
  const curLocation = location.pathname.split("/")[2];
  const curParam = location.hash;
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (props.list !== undefined) {
      setChatList(props.list);
    }
  }, []);

  const addNewChatting = (item) => {
    const value = { userId: item.userId, chatId: item.chatId };
    setChatList((prev) => {
      return [...prev, value];
    });
  };

  return (
    <div className={classes.wrapper}>
      <AddChat onAdd={addNewChatting}></AddChat>
      <ul>
        {chatList.map((item, index) => {
          return (
            <li className={classes.item} key={index}>
              {curLocation !== item.chatId ? (
                <ChatField chatId={item.chatId} curParam={curParam}></ChatField>
              ) : (
                <div className={classes.onclick_chatId}>
                  <p>{item.chatId}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Side);
