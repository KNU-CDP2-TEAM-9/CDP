import { Outlet } from "react-router-dom";

const RootLayout = () => {
  console.log("sadsads");
  return (
    <>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};

export async function loader() {
  console.log("sadsa");
}

export default RootLayout;
