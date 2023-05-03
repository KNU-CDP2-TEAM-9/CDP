import { Form, Link, useActionData, useNavigation } from "react-router-dom";
import classes from "../css/LoginForm.module.css";

const LoginForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post">
        <h1>Login</h1>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => {
              return <li key={err}>{err}</li>;
            })}
          </ul>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" name="email" required />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div>
          <Link to="/signup">Create new User</Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting ..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
