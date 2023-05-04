import React from "react";
import classes from "../css/Bottom.module.css";

const Bottom = () => {
  console.log("boot");
  return <div className={classes.wrapper}></div>;
};

export default React.memo(Bottom);
