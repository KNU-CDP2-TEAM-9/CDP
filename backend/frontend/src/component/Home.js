import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Link to={"/login?mode=init"}>hello</Link>
    </>
  );
};

export default Home;