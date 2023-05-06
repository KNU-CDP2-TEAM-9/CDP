import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../css/UserInfoForm.module.css";
const UserInfoForm = (props) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickName: undefined,
    firstName: undefined,
    lastName: undefined,
    dept: undefined,
    phoneNumber: undefined,
    grade: undefined,
    earned_credit: undefined,
    goal_credit: undefined,
  });
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
  useEffect(() => {
    if (props.userInfo !== undefined) {
      setUserInfo(props.userInfo);
    }
  }, [props.userInfo]);
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
    setUserInfo((prev) => ({
      ...prev,
      [edit]: info.editValue,
    }));
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
      nickName
      {isEditing.nickName === false ? (
        <div id="nickName" onClick={ClickHandler}>
          {userInfo.nickName ? userInfo.nickName : "----"}
        </div>
      ) : (
        <form action="#" id="nickName" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.nickName}
          ></input>
        </form>
      )}
      firstName
      {isEditing.firstName === false ? (
        <div id="firstName" onClick={ClickHandler}>
          {userInfo.firstName ? userInfo.firstName : "----"}
        </div>
      ) : (
        <form action="#" id="firstName" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.firstName}
          ></input>
        </form>
      )}
      lastName
      {isEditing.lastName === false ? (
        <div id="lastName" onClick={ClickHandler}>
          {userInfo.lastName ? userInfo.lastName : "----"}
        </div>
      ) : (
        <form action="#" id="lastName" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.lastName}
          ></input>
        </form>
      )}
      dept
      {isEditing.dept === false ? (
        <div id="dept" onClick={ClickHandler}>
          {userInfo.dept ? userInfo.dept : "----"}
        </div>
      ) : (
        <form action="#" id="dept" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.dept}
          ></input>
        </form>
      )}
      phoneNumber
      {isEditing.phoneNumber === false ? (
        <div id="phoneNumber" onClick={ClickHandler}>
          {userInfo.phoneNumber ? userInfo.phoneNumber : "----"}
        </div>
      ) : (
        <form action="#" id="phoneNumber" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.phoneNumber}
          ></input>
        </form>
      )}
      grade
      {isEditing.grade === false ? (
        <div id="grade" onClick={ClickHandler}>
          {userInfo.grade ? userInfo.grade : "----"}
        </div>
      ) : (
        <form action="#" id="grade" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.grade}
          ></input>
        </form>
      )}
      earned_credit
      {isEditing.earned_credit === false ? (
        <div id="earned_credit" onClick={ClickHandler}>
          {userInfo.earned_credit ? userInfo.earned_credit : "----"}
        </div>
      ) : (
        <form action="#" id="earned_credit" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.earned_credit}
          ></input>
        </form>
      )}
      goal_credit
      {isEditing.goal_credit === false ? (
        <div id="goal_credit" onClick={ClickHandler}>
          {userInfo.goal_credit ? userInfo.goal_credit : "----"}
        </div>
      ) : (
        <form action="#" id="goal_credit" onSubmit={SubmitHandler}>
          <input
            className={classes.Input}
            type="text"
            name="Input"
            value={userInfo.goal_credit}
          ></input>
        </form>
      )}
    </>
  );
};

export default UserInfoForm;
