import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ErrorPage = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  let title = "An error occurred!";
  let message = "Something went wrong!";
  useEffect(() => {
    if (error.status === 422) {
      navigate(-1, { replace: true });
    } else if (error.status === 401) {
      navigate("/login?mode=error&isroute=true", { replace: true });
    }
  }, []);

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return <>asdsad</>;
};

export default ErrorPage;
