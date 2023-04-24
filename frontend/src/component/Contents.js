import classes from "./Contents.module.css";
import ChatUI from "./Chat";
import BottomUI from "./Bottom";
import SideUI from "./Side";

const Contents = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.primary}>
        <ChatUI />
        <BottomUI />
      </div>
      <div className={classes.secondary}>
        <SideUI />
      </div>
    </div>
  );
};

export default Contents;
