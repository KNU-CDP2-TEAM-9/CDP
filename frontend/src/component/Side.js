import React from "react";
import { Link } from "react-router-dom";
import classes from "../css/Side.module.css";
import { useEffect, useState } from "react";

const Side = () => {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const info = { token: token };
      const response = await fetch("http://localhost:8080/chat/chatList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(info),
      });
      const resData = await response.json();
      setChatList(resData.list);
    };
    fetchData();
  }, []);

  const addNewChatting = async () => {
    const token = localStorage.getItem("token");
    const info = { token: token };
    const response = await fetch("http://localhost:8080/chat/chatAdd", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(info),
    });
    const resData = await response.json();
    const value = { userId: resData.userId, chatId: resData.chatId };
    setChatList((prev) => {
      return [...prev, value];
    });
  };

  return (
    <div className={classes.wrapper}>
      <button onClick={addNewChatting}>New</button>
      <ul>
        {chatList.map((item, index) => {
          return (
            <li className={classes.item} key={index}>
              <Link to={`/main/${item.chatId}`}>{item.chatId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Side);
