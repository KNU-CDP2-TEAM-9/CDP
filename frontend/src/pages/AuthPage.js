import React from "react";
import { json, redirect } from "react-router-dom";
import AuthForm from "../component/AuthForm";

const AuthPage = () => {
  return <AuthForm></AuthForm>;
};

export default AuthPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:8080/" + mode, {
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
  if (resData.message === "SIGNIN") {
    return redirect("/");
  } else if (resData.message === "LOGIN") {
    const id = resData.id;
    const token = resData.token;
    localStorage.setItem("id", id);
    localStorage.setItem("token", token);
    return redirect("/main");
  }
}