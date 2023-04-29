import React, { useState } from "react";
import classes from "./Content_main.module.css";
import Bottom from "./Bottom";
import chatM from "./hihi";
import Side from "./Side";

const ContentMain = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <chatM></chatM>
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Side />
      </div>
    </div>
  );
};

export default ContentMain;
