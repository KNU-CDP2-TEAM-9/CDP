const BotMessage = (props) => {
  const ClickHandler = async (event) => {
    event.preventDefault();
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

    setMsgText("");

    const BotText = resData.BotText.text;

    props.onAddBot(BotText);
  };

  const str = props.text;
  const str1 = str.split("/")[0];
  const str2 = str.split("/")[1];
  const list1 = (str1 || "").split("*");
  const list2 = (str2 || "").split(">");
  const path = list1.map((item) => {
    return (
      <>
        {item}
        <br />
      </>
    );
  });
  const child = list2.map((item) => {
    return (
      <>
        {item}
        <br />
      </>
    );
  });

  return (
    <>
      <div>{path}</div>
      <br />
      <div>{child}</div>
    </>
  );
};

export default BotMessage;
