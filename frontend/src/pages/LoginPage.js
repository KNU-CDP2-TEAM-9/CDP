import React from "react";
import { json, redirect } from "react-router-dom";
import LoginForm from "../component/LoginForm";

const LoginPage = () => {
  return <LoginForm></LoginForm>;
};

export default LoginPage;

export async function action({ request }) {
  const mode = "login";

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/auth/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem("token", token);
  console.log(token);
  return redirect("/main");
}
