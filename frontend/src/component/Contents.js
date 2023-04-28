import React, { useState } from "react";
import classes from "./Contents.module.css";
import ChatUI from "./Chat";
import BottomUI from "./Bottom";
import SideUI from "./Side";

const Contents = () => {
  const [curField, setCurField] = useState(0);

  const curFieldHandler = (cur) => {
    setCurField(cur);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <ChatUI field={curField} />
        <BottomUI />
      </div>
      <div className={classes.secondary}>
        <SideUI onChangeField={curFieldHandler} />
      </div>
    </div>
  );
};

export default Contents;
