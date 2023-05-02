import { Suspense } from "react";
import { useRouteLoaderData, defer, Await } from "react-router-dom";
import React from "react";
import Chat from "../component/Chat";

const MainIdPage = () => {
  const { msgList } = useRouteLoaderData("chat");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={msgList}>
        {(loadedList) => <Chat list={loadedList} />}
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
  });
}

export async function action({ request }) {
  const searchParams = new URL(request.url).pathname;
  const chatId = searchParams.split("/")[2];
  const data = await request.formData();
  const msgText = data.get("message");
  const token = localStorage.getItem("token");
  const msgInfo = {
    text: msgText,
    token: token,
    chatId: chatId,
  };
  const response = await fetch("http://localhost:8080/chat/msg", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(msgInfo),
  });
  const resData = await response.json();
  return resData;
}

export default MainIdPage;
