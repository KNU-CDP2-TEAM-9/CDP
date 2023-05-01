import React from "react";
import { Link } from "react-router-dom";
import classes from "../css/Side.module.css";
import { useEffect, useState } from "react";

const Side = () => {
  console.log("hi");
  const [fieldList, setFieldList] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const info = { token: token };
      const response = await fetch("http://localhost:8080/chat/field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(info),
      });
      const resData = await response.json();
      setFieldList(resData.list);
    };
    fetchData();
  }, []);

  const addNewChatting = async () => {
    const token = localStorage.getItem("token");
    const info = { token: token };
    const response = await fetch("http://localhost:8080/chat/field", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(info),
    });
    const resData = await response.json();
    const value = { id: resData.id, fieldId: resData.fieldId };
    setFieldList((prev) => {
      return [...prev, value];
    });
  };

  return (
    <div className={classes.wrapper}>
      <button onClick={addNewChatting}>New</button>
      <ul>
        {fieldList.map((item, index) => {
          return (
            <li className={classes.item} key={index}>
              <Link to={`/main/${item.fieldId}`}>{item.fieldId}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default React.memo(Side);
