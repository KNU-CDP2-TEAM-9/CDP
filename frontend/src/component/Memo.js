import { useState } from "react";
import React from "react";
import MemoForm from "./MemoForm";
import classes from "../css/memo.module.css";

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
      <button className={classes.button_newMemo} onClick={newMemoHandler}>
        <div className={classes.icon_plus}></div>
        <div className={classes.text_plus}>New memo</div>
      </button>
      <div className={classes.memo_wrapper}>
        {isWriteMode === true ? (
          <MemoForm
            onBack={backHandler}
            memoId={memoId}
            memoText={
              memoId !== undefined
                ? props.memoList.find((obj) => obj.memoId === memoId)?.memoText
                : ""
            }
            onAdd={AddHandler}
            onFix={FixHandler}
          ></MemoForm>
        ) : (
          <ul>
            {props.memoList.map((item) => {
              return (
                <div className={classes.wrapper_memo}>
                  <p className={classes.text_date}>{item.writeDate}</p>
                  <div className={classes.memo_content}>
                    <p
                      className={classes.text_memo}
                      id={item.memoId}
                      onClick={modifyHandler}
                      key={item.memoId}
                    >
                      {item.memoText}
                    </p>
                  </div>
                </div>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Memo;
