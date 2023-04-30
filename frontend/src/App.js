import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import InitPage from "./pages/InitPage";
import { action as authAction } from "./pages/AuthPage";
import { loader as chatLoader } from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "auth", element: <AuthPage></AuthPage>, action: authAction },
      {
        path: "main",
        children: [
          {
            index: true,
            id: "chat-default",
            element: <InitPage is={true}></InitPage>,
          },
          {
            path: ":id",
            id: "chat-field",
            element: <InitPage is={false}></InitPage>,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
