import { Suspense } from "react";
import { Await, defer, useRouteLoaderData } from "react-router-dom";
import Contents from "../component/Contents";
const MainPage = () => {
  const { list, fid } = useRouteLoaderData("chat-field");
  const fieldInfo = { list: list, fid: fid };
  return (
    <>
      <Suspense
        fallback={
          <p
            style={{
              textAlign: "center",
            }}
          >
            Loading...
          </p>
        }
      >
        <Await resolve={fieldInfo}>
          {(loadedInfo) => <Contents field={loadedInfo} />}
        </Await>
      </Suspense>
    </>
  );
};
export default MainPage;

const loadList = async (fId) => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const fieldId = fId;
  const fieldInfo = { id: id, fieldId: fieldId };
  const response = await fetch("http://localhost:8080/chat/" + fieldId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(fieldInfo),
  });
  const resData = await response.json();
  console.log(resData);
  const resList = resData.list.map((data) => {
    return {
      isUser: data.isUser,
      message: data.message,
    };
  });
  return resList;
};

export async function loader({ request, params }) {
  const id = params.id;
  return defer({
    list: await loadList(id),
    fid: id,
  });
}
