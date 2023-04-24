import classes from "./MainUI.module.css";
import ChatUI from "./ChatUI";
import BottomUI from "./BottomUI";
import SideUI from "./SideUI";

const MainUI = () => {
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

export default MainUI;
