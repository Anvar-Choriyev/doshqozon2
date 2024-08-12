import styles from "./Header.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navbar from "../../utils/navbar";
import { useContext } from "react";
import AppContext from "../../context/AppContext";

// components
import Form from "../Generics/Form/Form";
import Input from "../Generics/Input/Input";
import Button from "../Generics/Button/Button";

// icons
import Arrow from "../../assets/icons/Arrow";
import Chervon from "../../assets/icons/Chervon";
import Bell from "../../assets/icons/Bell";
import Clock from "../../assets/icons/Clock";
import Search from "../../assets/icons/Search";

const Header = () => {
  const pathname = useLocation().pathname;
  const exactRoute = navbar.find((elem) => pathname.includes(elem.path));
  const exactPathName = exactRoute?.title;
  const exactInnerRoute = pathname
    .replace(`/${exactPathName.toLowerCase()}/`, "")
    .replace("/", "")
    .replace(/\d/gi, "")
    .replace("-", " ");
  const ctx = useContext(AppContext);

  function logOut() {
    ctx.onReset();
  }

  return (
    <header className={styles.header}>
      <div className={styles["header__row"]}>
        <div className={styles["header__left"]}>
          <Link to={exactRoute.path} className="subtitle light">
            {exactPathName}
          </Link>
          <Button size="small" mode="transparent">
            <Chervon />
          </Button>
          <h4 className="subtitle">
            {exactInnerRoute.replaceAll("/", " ") || ""}
          </h4>
        </div>
        <div className={styles["header__right"]}>
          <Button size="small" mode="transparent">
            <Bell />
          </Button>
          <Button size="small" mode="transparent">
            <Clock />
          </Button>
          <Form>
            <div className={styles["header__form-wrapper"]}>
              <Button size="small" mode="transparent">
                <Search />
              </Button>
              <Input
                onChange={(e) => ctx.setSearch(e.target.value)}
                placeholder="Qidirish..."
              />
            </div>
          </Form>
          <Button
            size="big"
            mode="orange"
            className="main-text"
            onClick={logOut}
          >
            Chiqish
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
