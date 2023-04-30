import { Link } from "react-router-dom";
import classes from "./Side.module.css";
import { useEffect, useState } from "react";

const Side = (props) => {
  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      const info = { id: id };
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
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const info = { id: id };
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
            <Link to={`/main/${item.fieldId}`}>
              <li key={index}>{item.fieldId}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Side;
