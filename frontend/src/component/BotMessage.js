import { useNavigate } from "react-router-dom";

const BotMessage = (props) => {
  const navigate = useNavigate();
  const ClickHandler = async (event) => {
    event.preventDefault();
    const msgText = event.target.textContent;
    props.onAdd(msgText);
    const token = localStorage.getItem("token");
    const msgInfo = {
      text: msgText,
      token: token,
      chatId: props.chatId,
    };
    const response = await fetch("http://localhost:8080/chat/msg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(msgInfo),
    });
    const resData = await response.json();
    if (resData.message === "Not Authenticated.") {
      navigate("/login?mode=error", { replace: true });
    }

    const BotText = resData.BotText.text;

    props.onAddBot(BotText);
  };

  const str = props.text;
  const str1 = str.split("/")[0];
  const str2 = str.split("/")[1];
  const str3 = str.split("/")[2];
  const str4 = str.split("/")[3];
  const list1 = (str1 || "").split("*");
  const list2 = (str2 || "").split(">");
  const list3 = (str3 || "").split("*");
  const list4 = (str4 || "").split("*");
  const path = list1.map((item) => {
    return (
      <>
        <div>{item}</div>
        <br />
      </>
    );
  });
  const child = list2.map((item) => {
    return (
      <>
        <div onClick={ClickHandler}>{item}</div>
        <br />
      </>
    );
  });
  const text = list3.map((item) => {
    return (
      <>
        <div>{item}</div>
        <br />
      </>
    );
  });
  const question = list4.map((item) => {
    return (
      <>
        <div onClick={ClickHandler}>{item}</div>
        <br />
      </>
    );
  });

  return (
    <>
      <div>{path}</div>
      <div>{child}</div>
      <div>{text}</div>
      <div>{question}</div>
    </>
  );
};

export default BotMessage;
