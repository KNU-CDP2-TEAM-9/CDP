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
  const str1 = str.split(";")[0];
  const str2 = str.split(";")[1];
  const str3 = str.split(";")[2];
  const str4 = str.split(";")[3];

  const list1 = (str1 || "").split("*");
  const list2 = (str2 || "").split(">");
  const list3 = (str3 || "").split("|");
  const list4 = (str4 || "").split(">");

  const path =
    list1[0] !== "죄송합니다. 원하시는 정보를 찾을 수 없습니다."
      ? list1.map((item) => {
          return (
            <>
              <div>{item}</div>
            </>
          );
        })
      : [];
  const child =
    list2[0] !== ""
      ? list2.map((item) => {
          return (
            <>
              <div onClick={ClickHandler}>{item}</div>
            </>
          );
        })
      : [];

  const text =
    list3[0] !== ""
      ? list3.map((item) => {
          const sp = item.split("-");
          return (
            <>
              <div>
                {sp.map((item) => {
                  return <div>{item}</div>;
                })}
              </div>
              <br></br>
            </>
          );
        })
      : [];

  const question =
    list4[0] !== ""
      ? list4.map((item) => {
          return (
            <>
              <div onClick={ClickHandler}>{item}</div>
            </>
          );
        })
      : [];

  return (
    <>
      {path.length !== 0 ? (
        <div>경로입니다.</div>
      ) : (
        <div>죄송합니다. 원하시는 정보를 찾을 수 없습니다.</div>
      )}
      <div>{path}</div>
      {child.length !== 0 ? <div>추가 정보입니다.</div> : <div></div>}
      <div>{child}</div>
      {text.length !== 0 ? <div>상세 정보입니다.</div> : <div></div>}
      <div>{text}</div>
      {question.length !== 0 ? <div>추가 질문입니다.</div> : <div></div>}
      <div>{question}</div>
    </>
  );
};

export default BotMessage;
