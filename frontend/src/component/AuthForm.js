import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  return (
    <>
      <Form method="post">
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div>
          <Link to="/main">Login</Link>
        </div>
      </Form>
    </>
  );
};

export default AuthForm;
