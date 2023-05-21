import { NavLink, Link } from "react-router-dom";
import classes from "../css/ChatField.module.css";
const ChatField = (props) => {
  return (
    <>
      <NavLink
        className={classes.item}
        to={`/main/${props.chatId}` + props.curParam}
      >
        {props.chatTime}
      </NavLink>
    </>
  );
};

export default ChatField;
