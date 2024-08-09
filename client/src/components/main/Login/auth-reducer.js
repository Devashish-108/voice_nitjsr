import constants from "./login-constants";
import firebase from "../../../fire";
import loginFactory from "../../../assets/lib/factories/login-factory";

const intial_state = {
  isLoggedIn: null,
  userId: null,
  showAuthMenu: false,
  message: null,
  isAnonymous: true,
};

const auth = (state = intial_state, action) => {
  switch (action.type) {
    case "AUTH_INIT":
      return { ...state, ...action.payload };

    case constants.ANONYMOUS_LOGIN_ACTION:
    case constants.LOGIN_ACTION:
      loginFactory.set({ isLoggingIn: true });
      return { ...state, isLoggedIn: false, userId: null };

    case constants.SIGNOUT_ACTION:
      return { ...state, showAuthMenu: false, isLoggedIn: false, userId: null };

    case constants.GET_LOGIN_DATA_SUCCESS:
      loginFactory.set({ isLoggingIn: false });
      // get usertype and set flags
      return {
        ...state,
        isLoggedIn: true,
        isAnonymous: action.payload.isAnonymous,
        tier: action.payload.isAnonymous ? 'tier1' : action.payload.tier,
        userId: !action.payload.isAnonymous ? action.payload.user.uid : null,
        showAuthMenu: false,
      };

    case constants.DELETE_ANONYMOUS_LOGIN_SUCCESS:
      // get usertype and set flags
      return {
        ...state,
        userId: null,
      };

    case constants.GET_LOGIN_DATA_FAILURE:
      return { ...state, message: action.payload.message };

    case constants.GET_SIGNUP_SUCCESS:
      // todo: call an action to do this
      firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          name: action.payload.name,
          email: action.payload.user.email,
          contact: action.payload.contact,
          joined: new Date().toLocaleDateString(),
          userType: "visitor",
        });

      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.user.uid,
        showAuthMenu: false,
        isAnonymous: false,
      };

    case constants.RESET_PASSWORD_SUCCESS:
      var message = { msg: "Please check your mail for password reset link." };
      return { ...state, message };

    case constants.RESET_PASSWORD_FAILURE:
      return { ...state, message: action.payload.message };

    case constants.GET_SIGNUP_FAILURE:
      return { ...state, message: action.payload.message };

    case "CHANGE_SHOW":
      return { ...state, message: null, showAuthMenu: !state.showAuthMenu };
    case "CLOSE_AUTHMENU":
      return { ...state, message: null, showAuthMenu: false };
    case "CHANGE_VIEW":
      return { ...state, message: null };
    default:
      return state;
  }
};

export default auth;
