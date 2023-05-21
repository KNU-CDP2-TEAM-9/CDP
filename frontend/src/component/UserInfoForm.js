import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../css/UserInfoForm.module.css";
const UserInfoForm = (props) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState({
    nickName: false,
    firstName: false,
    lastName: false,
    dept: false,
    phoneNumber: false,
    grade: false,
    earned_credit: false,
    goal_credit: false,
  });
  const SubmitHandler = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const edit = event.target.id;
    console.log(edit);
    const info = {
      editId: edit,
      editValue: event.target.elements.Input.value,
      token: token,
    };
    console.log(info.editValue);
    const response = await fetch("http://localhost:8080/userInfo", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(info),
    });
    const resData = await response.json();
    if (resData.message === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
    props.onFix(edit, info.editValue);
    setIsEditing((prev) => ({
      ...prev,
      [edit]: false,
    }));
  };

  const ClickHandler = (event) => {
    const edit = event.target.id;
    setIsEditing((prev) => ({
      ...prev,
      [edit]: true,
    }));
  };
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>nickName</div>
          {isEditing.nickName === false ? (
            <div
              className={classes.text_info}
              id="nickName"
              onClick={ClickHandler}
            >
              {props.userInfo.nickName ? props.userInfo.nickName : "----"}
            </div>
          ) : (
            <form action="#" id="nickName" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.nickName}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>firstName</div>
          {isEditing.firstName === false ? (
            <div
              className={classes.text_info}
              id="firstName"
              onClick={ClickHandler}
            >
              {props.userInfo.firstName ? props.userInfo.firstName : "----"}
            </div>
          ) : (
            <form action="#" id="firstName" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.firstName}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>lastName</div>
          {isEditing.lastName === false ? (
            <div
              className={classes.text_info}
              id="lastName"
              onClick={ClickHandler}
            >
              {props.userInfo.lastName ? props.userInfo.lastName : "----"}
            </div>
          ) : (
            <form action="#" id="lastName" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.lastName}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>dept</div>
          {isEditing.dept === false ? (
            <div className={classes.text_info} id="dept" onClick={ClickHandler}>
              {props.userInfo.dept ? props.userInfo.dept : "----"}
            </div>
          ) : (
            <form action="#" id="dept" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.dept}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>phoneNumber</div>
          {isEditing.phoneNumber === false ? (
            <div
              className={classes.text_info}
              id="phoneNumber"
              onClick={ClickHandler}
            >
              {props.userInfo.phoneNumber ? props.userInfo.phoneNumber : "----"}
            </div>
          ) : (
            <form action="#" id="phoneNumber" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.phoneNumber}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>grade</div>
          {isEditing.grade === false ? (
            <div
              className={classes.text_info}
              id="grade"
              onClick={ClickHandler}
            >
              {props.userInfo.grade ? props.userInfo.grade : "----"}
            </div>
          ) : (
            <form action="#" id="grade" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.grade}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>earned_credit</div>
          {isEditing.earned_credit === false ? (
            <div
              className={classes.text_info}
              id="earned_credit"
              onClick={ClickHandler}
            >
              {props.userInfo.earned_credit
                ? props.userInfo.earned_credit
                : "----"}
            </div>
          ) : (
            <form action="#" id="earned_credit" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.earned_credit}
              ></input>
            </form>
          )}
        </div>

        <div className={classes.wrapper_info}>
          <div className={classes.label_info}>goal_credit</div>
          {isEditing.goal_credit === false ? (
            <div
              className={classes.text_info}
              id="goal_credit"
              onClick={ClickHandler}
            >
              {props.userInfo.goal_credit ? props.userInfo.goal_credit : "----"}
            </div>
          ) : (
            <form action="#" id="goal_credit" onSubmit={SubmitHandler}>
              <input
                className={classes.Input}
                type="text"
                name="Input"
                defaultValue={props.userInfo.goal_credit}
              ></input>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserInfoForm;
