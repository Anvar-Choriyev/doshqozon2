import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import navbar from "../../utils/navbar";
import { Fragment, useEffect } from "react";

const SidebarList = ({ location }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const state = user?.userRole === "ADMIN";

  return (
    <>
      {navbar.map(
        ({ id = () => {}, path, title, icon = () => {}, hidden, admin }) => {
          if (!hidden) {
            if (admin) {
              if (state) {
                return (
                  <li key={id()} className={styles["aside__item"]}>
                    <NavLink
                      to={path}
                      className={`subtitle ${styles["aside__link"]}`}
                    >
                      {icon && location.pathname.includes(path)
                        ? icon(true)
                        : icon()}
                      <p>{title}</p>
                    </NavLink>
                  </li>
                );
              }else{
				return <Fragment key={id()}></Fragment>
			  }
            } else {
              return (
                <li key={id()} className={styles["aside__item"]}>
                  <NavLink
                    to={path}
                    className={`subtitle ${styles["aside__link"]}`}
                  >
                    {icon && location.pathname.includes(path)
                      ? icon(true)
                      : icon()}
                    <p>{title}</p>
                  </NavLink>
                </li>
              );
            }
          }
        }
      )}
    </>
  );
};

export default SidebarList;
