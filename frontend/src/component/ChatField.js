import { Link, useLocation } from "react-router-dom";

const ChatField = (props) => {
  const location = useLocation();
  const curLocation = location.pathname.split("/")[2];
  return (
    <>
      {curLocation !== props.chatId ? (
        <Link to={`/main/${props.chatId}`}>{props.chatId}</Link>
      ) : (
        <p>{props.chatId}</p>
      )}
    </>
  );
};

export default ChatField;
