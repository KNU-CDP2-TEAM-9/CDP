import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MemoForm = (props) => {
  const [memoText, setMemoText] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (props.memoId !== undefined) {
      setMemoText(props.memoText);
    }
  }, [props.memoId]);

  const memoTextHandler = (event) => {
    setMemoText(event.target.value);
  };

  const SubmitHandler = async (event) => {
    console.log(props.memoText);
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (props.memoId === undefined) {
      const memoInfo = {
        memoText: memoText,
        token: token,
      };
      console.log(memoInfo);
      const response = await fetch("http://localhost:8080/memo/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(memoInfo),
      });
      const resData = await response.json();
      console.log(resData);
      if (resData.message === "Not Authenticated.") {
        navigate("/login?mode=error", { replace: true });
      } else {
        props.onAdd(resData);
        props.onBack();
        setMemoText("");
      }
    } else {
      const memoInfo = {
        memoId: props.memoId,
        memoText: memoText,
        token: token,
      };
      const response = await fetch("http://localhost:8080/memo/item", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify(memoInfo),
      });
      const resData = await response.json();
      if (resData.message === "Not Authenticated.") {
        navigate("/login?mode=error", { replace: true });
      } else {
        props.onFix(resData);
        props.onBack();
        setMemoText("");
      }
    }
  };
  return (
    <>
      <form action="#" id="newMemo" onSubmit={SubmitHandler}>
        <input
          type="text"
          name="memo"
          value={memoText || ""}
          onChange={memoTextHandler}
        ></input>
      </form>
    </>
  );
};

export default MemoForm;
