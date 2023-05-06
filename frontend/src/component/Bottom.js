import React from "react";
import classes from "../css/Bottom.module.css";
import UserInfoForm from "./UserInfoForm";
const Bottom = (props) => {
  return (
    <div className={classes.wrapper}>
      <UserInfoForm userInfo={props.userInfo}></UserInfoForm>
    </div>
  );
};

export default React.memo(Bottom);
