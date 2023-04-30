import React from "react";
import classes from "../css/Contents.module.css";
import ChatInit from "./ChatInit";
import Bottom from "./Bottom";
import Side from "./Side";
import Chat from "./Chat";

const Contents = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        {props.isDefault ? <ChatInit /> : <Chat />}
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Side />
      </div>
    </div>
  );
};

export default Contents;
