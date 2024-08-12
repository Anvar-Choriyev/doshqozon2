const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        token: action.item.token,
        user: action.item.user,
        isAuth: action.item.isAuth,
      };
    case "HIDE":
      return {
        ...state,
        visible: action.item.visible,
      };
    case "SETSEARCH":
      return {
        ...state,
        search: action.search,
      };
    case "SETCATEGORY":
      return {
        ...state,
        categoryId: action.id,
      };
    case "RESET":
      return (
        {
          ...state,
          token: "",
          user: {},
          isAuth: false,
          search: "",
        },
        localStorage.clear()
      );
    default:
      return state;
  }
};

export default appReducer;
