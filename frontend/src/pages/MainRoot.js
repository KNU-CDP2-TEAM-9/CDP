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
  const { chatList, userInfo, memo } = useLoaderData();
  const navigate = useNavigate();
  useEffect(() => {
    if (chatList === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
    if (userInfo === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
    if (memo === "Not Authenticated") {
      navigate("/login?mode=error", { replace: true });
    }
  }, [chatList, userInfo, memo]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <Outlet></Outlet>
        <div className={classes.icon_logo}></div>
      </div>
      <div className={classes.secondary}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={chatList}>
            {(loadedList) => <Side list={loadedList} />}
          </Await>
        </Suspense>

        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={{ userInfo, memo }}>
            {(loadedObject) => (
              <Bottom
                userInfo={loadedObject.userInfo}
                memo={loadedObject.memo}
              />
            )}
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

async function loadMemo() {
  const token = localStorage.getItem("token");
  const info = { token: token };
  const response = await fetch("http://localhost:8080/memo", {
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

export async function loader() {
  console.log("sdfdsfadsfsdafafadf");
  return defer({
    chatList: await loadChatList(),
    userInfo: await loadUserInfo(),
    memo: await loadMemo(),
  });
}

export default React.memo(MainRoot);
