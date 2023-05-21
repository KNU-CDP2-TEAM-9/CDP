import { Form, useActionData, useNavigation } from "react-router-dom";
import classes from "../css/SignUpForm.module.css";

const SignUpForm = () => {
  const data = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post">
        <div className={classes.wrapper_create}>
          {/* <h1>Create a new user</h1> */}
          <div className={classes.img_logo}></div>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => {
                return <li key={err}>{err}</li>;
              })}
            </ul>
          )}
          <p className={classes.wrapper_input}>
            {/* <label htmlFor="email">Email</label> */}
            <input
              className={classes.Input}
              placeholder="email"
              id="email"
              type="text"
              name="email"
              required
            />
          </p>
          <p className={classes.wrapper_input}>
            {/* <label htmlFor="password">Password</label> */}
            <input
              className={classes.Input}
              placeholder="password"
              id="password"
              type="password"
              name="password"
              required
            />
          </p>
          <p className={classes.wrapper_input}>
            {/* <label htmlFor="nickName">nickName</label> */}
            <input
              className={classes.Input}
              placeholder="nickName"
              id="nickName"
              type="text"
              name="nickName"
              required
            />
          </p>
          <p className={classes.wrapper_input}>
            {/* <label htmlFor="nickName">nickName</label> */}
            <input
              className={classes.Input}
              placeholder="firstName"
              id="firstName"
              type="text"
              name="firstName"
              required
            />
          </p>
          <p className={classes.wrapper_input}>
            {/* <label htmlFor="nickName">nickName</label> */}
            <input
              className={classes.Input}
              placeholder="lastName"
              id="lastName"
              type="text"
              name="lastName"
              required
            />
          </p>
          <div>
            <button className={classes.btn_save} disabled={isSubmitting}>
              {isSubmitting ? "Submitting ..." : "Create User"}
            </button>
          </div>
        </div>
      </Form>
    </>
  );
};

export default SignUpForm;
