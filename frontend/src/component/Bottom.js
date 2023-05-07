import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "../css/Bottom.module.css";
import UserInfoForm from "./UserInfoForm";
import Memo from "./Memo";
import { useLocation } from "react-router-dom";
const Bottom = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState({});
  const [memo, setMemo] = useState([]);
  useEffect(() => {
    if (props.userInfo !== undefined) {
      setUserInfo(props.userInfo);
    }
    if (props.memo !== undefined) {
      setMemo(props.memo);
    }
  }, [props.userInfo, props.memo]);

  const fixUserInfoHandler = (id, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fixMemoHandler = (list) => {
    setMemo(list);
  };

  const AddMemoHandler = (item) => {
    setMemo((prev) => {
      return [...prev, item];
    });
  };

  const LogOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login?mode=init");
  };

  const curParam = location.hash;
  return (
    <>
      <div className={classes.wrapper}>
        {curParam !== "#userInfo" ? (
          <Link to="#userInfo" relative="path">
            <div>userInfo</div>
          </Link>
        ) : (
          <div>userInfo</div>
        )}
        {curParam !== "#memo" ? (
          <Link to="#memo" relative="path">
            <div>Memo</div>
          </Link>
        ) : (
          <div>Memo</div>
        )}
        <div>
          <button onClick={LogOutHandler}>LogOut</button>
        </div>
        {curParam === "#userInfo" && (
          <UserInfoForm
            userInfo={userInfo}
            onFix={fixUserInfoHandler}
          ></UserInfoForm>
        )}
        {curParam === "#memo" && (
          <Memo
            memoList={memo}
            onAdd={AddMemoHandler}
            onFix={fixMemoHandler}
          ></Memo>
        )}
      </div>
    </>
  );
};

export default React.memo(Bottom);
