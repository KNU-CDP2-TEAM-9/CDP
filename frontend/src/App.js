import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import { action as authAction } from "./pages/AuthPage";
import { loader as chatLoader } from "./pages/MainPage";
import asd from "./pages/newenwewen";

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
        path: "/main",
        element: <asd></asd>,
      },
      {
        path: "/main/:id",
        id: "chat-field",
        element: <MainPage></MainPage>,
        loader: chatLoader,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
