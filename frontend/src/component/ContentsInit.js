import React, { useState } from "react";
import classes from "./Contents.module.css";
import ChatInit from "./ChatInit";
import Bottom from "./Bottom";
import Side from "./Side";

const ContentsInit = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <ChatInit />
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Side />
      </div>
    </div>
  );
};

export default ContentsInit;
