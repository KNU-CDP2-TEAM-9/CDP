import React from "react";
import classes from "../css/Side.module.css";
import { useEffect, useState } from "react";
import ChatField from "./ChatField";
import AddChat from "./AddChat";

const Side = (props) => {
  console.log("hi");
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    if (props.list !== undefined) {
      setChatList(props.list);
    }
  }, []);

  const addNewChatting = (item) => {
    console.log("adsfdsfasdfdsf");
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
              <ChatField chatId={item.chatId}></ChatField>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Side);
