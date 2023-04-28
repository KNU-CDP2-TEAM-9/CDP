import classes from "./Side.module.css";

const Side = (props) => {
  const changeFieldHandler1 = () => {
    props.onChangeField(1);
  };
  const changeFieldHandler2 = () => {
    props.onChangeField(2);
  };
  const changeFieldHandler3 = () => {
    props.onChangeField(3);
  };

  return (
    <div className={classes.wrapper}>
      <button onClick={changeFieldHandler1}>button1</button>
      <button onClick={changeFieldHandler2}>button2</button>
      <button onClick={changeFieldHandler3}>button3</button>
    </div>
  );
};

export default Side;
