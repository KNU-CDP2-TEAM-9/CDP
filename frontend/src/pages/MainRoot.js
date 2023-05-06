import React, { useEffect } from "react";
import { Suspense } from "react";
import {
  useLoaderData,
  defer,
  Await,
  Outlet,
  useNavigate,
} from "react-router-dom";
import classes from "../css/Contents.module.css";
import Bottom from "../component/Bottom";
import Side from "../component/Side";

const MainRoot = () => {
  const { chatList, userInfo } = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    if (chatList === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
    if (userInfo === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
  }, [chatList, userInfo]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <Outlet></Outlet>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={userInfo}>
            {(loadedObject) => <Bottom userInfo={loadedObject} />}
          </Await>
        </Suspense>
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={chatList}>
            {(loadedList) => <Side list={loadedList} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

async function loadChatList() {
  const token = localStorage.getItem("token");
  const info = { token: token };
  const response = await fetch("http://localhost:8080/chat/chatList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(info),
  });
  const resData = await response.json();
  if (resData.message === "Not Authenticated.") {
    return "Not Authenticated.";
  }
  return resData.list;
}

async function loadUserInfo() {
  const token = localStorage.getItem("token");
  const info = { token: token };
  const response = await fetch("http://localhost:8080/userInfo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(info),
  });
  const resData = await response.json();
  if (resData.message === "Not Authenticated.") {
    return "Not Authenticated.";
  }
  return resData.info;
}

export async function loader() {
  return defer({
    chatList: await loadChatList(),
    userInfo: await loadUserInfo(),
  });
}

export default React.memo(MainRoot);
