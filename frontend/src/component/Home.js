import { Link, NavLink } from "react-router-dom";
import classes from "../css/Home.module.css";
const Home = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  return (
    <>
      <header>
        <NavLink to={"/"} reloadDocument>
          <div className={classes.logo}></div>
        </NavLink>

        <nav className={classes.nav1}>
          <ul>
            <li>
              <NavLink className={classes.navlink} to={"/graph"}>
                Graph◿
              </NavLink>
            </li>
            <li>Developers◿</li>
            <li>Project◿</li>
            <li>Details◿</li>
          </ul>
        </nav>

        <nav className={classes.nav2}>
          <ul>
            <li>
              <NavLink className={classes.navlink} to={"/login?mode=init"}>
                Login↗
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`${classes.navlink} ${classes.signUp}`}
                to={"/signup"}
              >
                SignUp↗
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className={classes.home}>
          <div className={classes.left}>
            <div className={classes.h1Text}>Welcome to KNUIS!</div>
            <div className={classes.description}>
              경북대학교 점보검색 시스템 KNUIS 입니다.
              <br></br>
              원하시는 정보를 키워드로 입력하시면 경로를 검색해드립니다.
            </div>
            <div className={classes.ButtonArea}>
              <div className={classes.start}>
                <NavLink className={classes.navlink} to={"/login?mode=init"}>
                  시작하기↗
                </NavLink>
              </div>
            </div>
          </div>
          <div className={classes.right}>
            <div className={classes.image}></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
