import { useState, useEffect } from "react";
import React from "react";
import MemoForm from "./MemoForm";

const Memo = (props) => {
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [memoId, setMemoId] = useState(undefined);

  const newMemoHandler = () => {
    setIsWriteMode(true);
    setMemoId(undefined);
  };

  const modifyHandler = (event) => {
    setIsWriteMode(true);
    setMemoId(event.target.id);
  };

  const backHandler = () => {
    setIsWriteMode(false);
    setMemoId(undefined);
  };

  const AddHandler = (item) => {
    console.log(";asdfsdf");
    props.onAdd(item);
  };
  const FixHandler = (item) => {
    const updateList = props.memoList.map((obj) => {
      if (obj.memoId === item.memoId) {
        return { ...obj, memoText: item.memoText, writeDate: item.writeDate };
      } else {
        return obj;
      }
    });
    props.onFix(updateList);
  };

  return (
    <>
      <button onClick={newMemoHandler}>New memo</button>
      {isWriteMode === true ? (
        <MemoForm
          onBack={backHandler}
          memoId={memoId}
          memoText={
            memoId !== undefined
              ? props.memoList.find((obj) => obj.id === memoId)?.memoText
              : ""
          }
          onAdd={AddHandler}
          onFix={FixHandler}
        ></MemoForm>
      ) : (
        <ul>
          {props.memoList.map((item) => {
            return (
              <li id={item.memoId} onClick={modifyHandler} key={item.memoId}>
                {item.memoText} , {item.writeDate}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Memo;
