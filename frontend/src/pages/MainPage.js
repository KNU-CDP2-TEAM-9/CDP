import { Suspense } from "react";
import { Await } from "react-router-dom";
import { Outlet, defer } from "react-router-dom";
import Contents from "../component/Contents";
const MainPage = () => {
  return <Contents></Contents>;
};
export default MainPage;

export async function loader({ request, params }) {
  const id = params.id;
  console.log(id);
  return defer({});
}
