import React from "react";
import classes from "../css/ChatInit.module.css";
const ChatInit = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.ulWrapper}>
        <div className={classes.img_hobanu}></div>
        <p className={classes.txt_chatinit}>
          채팅 목록을 선택하여 주세요
          </p>
      </div>
    </div>
  );
};

export default ChatInit;
