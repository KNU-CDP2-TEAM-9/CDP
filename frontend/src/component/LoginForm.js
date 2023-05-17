import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import classes from "../css/LoginForm.module.css";
import { useEffect } from "react";

const LoginForm = () => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  useEffect(() => {
    if (data && data.message === "ErrorLogin") {
      navigate(-1);
    }
  }, [data]);

  return (
    <>
      <Form method="post">
        <div className={classes.wrapper_login}>
          {/* <h1>Login</h1> */}
          <div className={classes.img_logo}></div>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => {
                return <li key={err}>{err}</li>;
              })}
            </ul>
          )}
          <p>
            {/* <label className={classes.label_email} htmlFor="email">Email</label> */}
            <input className={classes.input_email} 
              placeholder="email"
              id="email" type="text" name="email" required />
          </p>
          <p>
            {/* <label className={classes.label_pw} htmlFor="password">Password</label> */}
            <input className={classes.input_pw} 
              placeholder="password"
              id="password" type="password" name="password" required />
          </p>
          <div>
            <button className={classes.btn_login} disabled={isSubmitting}>
              {isSubmitting ? "Submitting ..." : "Login"}
            </button>
            <Link to="/signup">
              <div className={classes.link_new}>Create new User</div>
              </Link>
          </div>
        </div>
      </Form>
    </>
  );
};

export default LoginForm;
