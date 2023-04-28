import React, { useState } from "react";
import classes from "./Contents.module.css";
import Chat from "./Chat";
import Bottom from "./Bottom";
import Side from "./Side";

const Contents = () => {
  const [curField, setCurField] = useState(0);

  const curFieldHandler = (cur) => {
    setCurField(cur);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <Chat field={curField} />
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Side onChangeField={curFieldHandler} />
      </div>
    </div>
  );
};

export default Contents;
