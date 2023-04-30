import React, { useState } from "react";
import classes from "./Contents.module.css";
import Chat from "./Chat";
import Bottom from "./Bottom";
import Side from "./Side";
import ChatInit from "./ChatInit";

const Contents = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        {props.isDefault ? <ChatInit></ChatInit> : <Chat />}
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Side />
      </div>
    </div>
  );
};

export default Contents;
