import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Link to={"/login?mode=init"}>hello</Link>
      <br />
      <Link to={"/graph"}>graph</Link>
    </>
  );
};

export default Home;
