import constants from "./login-constants";

const initial_state = { show: "login" };

const view = (state = initial_state, action) => {
  switch (action.type) {
    case "CHANGE_VIEW":
      return { ...state, show: action.payload };
    case "CLOSE_AUTHMENU":
    case constants.SIGNOUT_ACTION:
    case constants.GET_SIGNUP_SUCCESS:
      return { ...state, show: "login" };
    default:
      return state;
  }
};

export default view;
