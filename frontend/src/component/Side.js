import { Link } from "react-router-dom";
import classes from "./Side.module.css";

const Side = (props) => {
  return (
    <div className={classes.wrapper}>
      <button>button1</button>
      <button>button2</button>
      <button>button3</button>
      <Link to="/main/one">
        <button>Link1</button>
      </Link>
      <Link to="/main/two">
        <button>Link2</button>
      </Link>
      <Link to="/main/three">
        <button>Link3</button>
      </Link>
    </div>
  );
};

export default Side;
