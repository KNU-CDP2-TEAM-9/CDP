import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import MainIdPage from "./pages/MainIdPage";
import MainRoot from "./pages/MainRoot";
import { loader as mainLoader } from "./pages/MainRoot";
import { loader as chatLoader } from "./pages/MainIdPage";
import { action as messageAction } from "./pages/MainIdPage";
import { action as authAction } from "./pages/AuthPage";

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
        element: <MainRoot></MainRoot>,
        loader: mainLoader,
        children: [
          {
            index: true,
            element: <MainPage></MainPage>,
          },
          {
            path: ":chatId",
            id: "chat",
            element: <MainIdPage></MainIdPage>,
            loader: chatLoader,
            action: messageAction,
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
