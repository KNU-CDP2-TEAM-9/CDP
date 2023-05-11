import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = "sorry";
  }
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return <>{message}</>;
};

export default ErrorPage;
