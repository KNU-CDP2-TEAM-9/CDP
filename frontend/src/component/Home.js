import { Link } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <Link to={token !== null ? "/main" : "/login?mode=init"}>hello</Link>
    </>
  );
};

export default Home;
