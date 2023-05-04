import React from "react";
import { Suspense } from "react";
import { useLoaderData, defer, Await, Outlet } from "react-router-dom";
import classes from "../css/Contents.module.css";
import Bottom from "../component/Bottom";
import Side from "../component/Side";

const MainRoot = () => {
  const { list } = useLoaderData();
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <Outlet></Outlet>
        <Bottom />
      </div>
      <div className={classes.secondary}>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Await resolve={list}>
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
  return resData.list;
}

export async function loader() {
  return defer({
    list: await loadChatList(),
  });
}

export default React.memo(MainRoot);
