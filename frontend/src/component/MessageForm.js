import React, { useState, useEffect } from "react";
import { Form, useActionData } from "react-router-dom";
import classes from "../css/MessageForm.module.css";
const MessageForm = () => {
  const data = useActionData();
  const [msgText, setMsgText] = useState("");

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setMsgText("");
    }
  }, [data]);

  const msgTextHandler = (event) => {
    setMsgText(event.target.value);
  };

  return (
    <>
      <Form method="post">
        <input
          id="message"
          className={classes.InputChat}
          type="text"
          value={msgText}
          onChange={msgTextHandler}
          name="message"
          required
        ></input>
      </Form>
    </>
  );
};

export default MessageForm;
