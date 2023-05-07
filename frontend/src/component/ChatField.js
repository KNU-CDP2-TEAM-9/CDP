import { Link, useLocation } from "react-router-dom";

const ChatField = (props) => {
  return (
    <>
      <Link to={`/main/${props.chatId}` + props.curParam}>{props.chatId}</Link>
    </>
  );
};

export default ChatField;
