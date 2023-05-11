import { Suspense, useEffect } from "react";
import {
  useRouteLoaderData,
  useNavigate,
  defer,
  Await,
} from "react-router-dom";
import React from "react";
import Chat from "../component/Chat";

const MainIdPage = () => {
  const { msgList, chatId } = useRouteLoaderData("chat");
  const navigate = useNavigate();
  useEffect(() => {
    console.log("asdf");
    if (msgList === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
    if (msgList === "unvalid routing") {
      navigate("/main", { replace: true });
    }
  }, [msgList]);
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={msgList}>
        {(loadedList) => <Chat list={loadedList} chatId={chatId} />}
      </Await>
    </Suspense>
  );
};

async function loadMessageList(cId) {
  const token = localStorage.getItem("token");
  const chatId = cId;
  const chatInfo = { token: token, chatId: chatId };
  const response = await fetch("http://localhost:8080/chat/" + chatId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(chatInfo),
  });
  const resData = await response.json();
  if (resData.message === "Not Authenticated.") {
    return "Not Authenticated.";
  } else if (resData.message === "unvalid routing") {
    return "unvalid routing";
  }
  const resList = resData.list.map((data) => {
    return {
      isUser: data.isUser,
      text: data.text,
    };
  });
  return resList;
}

export async function loader({ request, params }) {
  const chatId = params.chatId;
  return defer({
    msgList: await loadMessageList(chatId),
    chatId: chatId,
  });
}

export default React.memo(MainIdPage);
