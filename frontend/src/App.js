import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
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
        children: [
          {
            index: true,
            element: <MainPage isDefault={true}></MainPage>,
          },
          {
            path: ":id",
            element: <MainPage isDefault={false}></MainPage>,
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
