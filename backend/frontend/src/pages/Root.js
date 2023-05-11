import React from "react";
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

export default React.memo(RootLayout);
