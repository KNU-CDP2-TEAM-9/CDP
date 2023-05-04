import React from "react";
import { json, redirect } from "react-router-dom";
import SignUpForm from "../component/SignUpForm";

const SignUpPage = () => {
  return <SignUpForm></SignUpForm>;
};

export default SignUpPage;

export async function action({ request }) {
  const mode = "signup";

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
    nickName: data.get("nickName"),
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

  return redirect("/login");
}
