import { useReducer } from "react";
import AppContext from "./AppContext";
import appReducer from "./appReducer";
import CartContextProvider from "./cart/CartContextProvider";

const token = localStorage.getItem("token") || "";
const user = JSON.parse(localStorage.getItem("user")) || {};

const defaultAppState = {
  jwt: token,
  user: user,
  isAuth: token ? true : false,
  visible: false,
  search: "",
  categoryId:null
};

const AppContextProvider = (props) => {
  const [appState, dispatch] = useReducer(appReducer, defaultAppState);

  const setAppDataHandler = (item) => {
    dispatch({ type: "LOGIN", item });
  };
  const setSearch = (search) => {
    dispatch({ type: "SETSEARCH", search });
  };
  const setCategoryId=(id)=>{
    dispatch({ type: "SETCATEGORY",id})
  }

  const restart = () => {
    dispatch({ type: "RESET" });
  };

  const handleVisibility = (item) => {
    dispatch({ type: "HIDE", item });
  };

  const contextApp = {
    token: appState?.token,
    user: appState?.user,
    isAuth: appState?.isAuth,
    visible: appState?.visible,
    setAppData: setAppDataHandler,
    onReset: restart,
    setVisibility: handleVisibility,
    search: appState?.search,
    setSearch: setSearch,
    setCategoryId:setCategoryId,
    categoryId:appState?.categoryId
  };

  return (
    <AppContext.Provider value={contextApp}>
      <CartContextProvider>{props.children}</CartContextProvider>
    </AppContext.Provider>
  );
};

export default AppContextProvider;
