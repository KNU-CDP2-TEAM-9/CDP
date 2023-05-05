import { useNavigate } from "react-router-dom";

const AddChat = (props) => {
  const navigate = useNavigate();

  const SubmitHandler = async () => {
    console.log("sadfasdaasdsasdasda");
    const token = localStorage.getItem("token");
    const info = { token: token };
    const response = await fetch("http://localhost:8080/chat/chatAdd", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(info),
    });
    const resData = await response.json();
    if (resData.message === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }
    props.onAdd(resData);
  };

  return <button onClick={SubmitHandler}>New Chat</button>;
};

export default AddChat;
