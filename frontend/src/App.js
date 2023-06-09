import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
import MainIdPage from "./pages/MainIdPage";
import MainRoot from "./pages/MainRoot";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import GraphPage from "./pages/GraphPage";
import { loader as mainLoader } from "./pages/MainRoot";
import { loader as chatLoader } from "./pages/MainIdPage";
import { action as loginAction } from "./pages/LoginPage";
import { action as SignUpAction } from "./pages/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "graph", element: <GraphPage></GraphPage> },
      { path: "login", element: <LoginPage></LoginPage>, action: loginAction },
      {
        path: "signup",
        element: <SignUpPage></SignUpPage>,
        action: SignUpAction,
      },
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
