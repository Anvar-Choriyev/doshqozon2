import styles from "./Layout.module.css";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
const Layout = ({ children }) => {
  return (
    <section className={styles.layout}>
      <Sidebar />
      <section className={styles["layout__right"]}>
        <Header />
        <section className={styles["layout__child"]}>{children}</section>
      </section>
    </section>
  );
};

export default Layout;
