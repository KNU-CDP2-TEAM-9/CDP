import { Suspense } from "react";
import {
  useLoaderData,
  useRouteLoaderData,
  defer,
  Await,
  redirect,
} from "react-router-dom";
import React from "react";
import Chat from "../component/Chat";

const MainIdPage = () => {
  const { msgList, chatId } = useRouteLoaderData("chat");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={msgList}>
        {(loadedList) => <Chat list={loadedList} chatId={chatId} />}
      </Await>
    </Suspense>
  );
};

async function loadMessageList(cId) {
  console.log("adf");
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
    throw new Response("Bad Request", { status: 401 });
  }
  if (resData.message === "unvalid routing") {
    throw new Response("Bad Request", { status: 422 });
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

// export async function action({ request }) {
//   const searchParams = new URL(request.url).pathname;
//   const chatId = searchParams.split("/")[2];
//   const data = await request.formData();
//   const msgText = data.get("message");
//   const token = localStorage.getItem("token");
//   const msgInfo = {
//     text: msgText,
//     token: token,
//     chatId: chatId,
//   };
//   const response = await fetch("http://localhost:8080/chat/msg", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//     body: JSON.stringify(msgInfo),
//   });
//   const resData = await response.json();
//   if (resData.message === "Not Authenticated.") {
//     throw new Response("Bad Request", { status: 401 });
//   }
//   return resData;
// }

export default React.memo(MainIdPage);
