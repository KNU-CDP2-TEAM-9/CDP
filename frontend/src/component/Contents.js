import React, { useState } from "react";
import classes from "./Contents.module.css";
import Chat from "./Chat";
import Bottom from "./Bottom";
import Side from "./Side";

const Contents = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <Chat />
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Side />
      </div>
    </div>
  );
};

export default Contents;
