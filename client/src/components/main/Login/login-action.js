import constants from "./login-constants";

export const initializeAuth = (user) => {
  return {
    type: constants.AUTH_INIT,
    payload: user,
  };
};

export const resetPassword = ({ email }) => {
  return {
    type: constants.RESET_PASSWORD,
    payload: {
      email,
    },
  };
};

export const signIn = ({ email, password }) => {
  //login with email & password and get a user id
  return {
    type: constants.LOGIN_ACTION,
    payload: {
      email,
      password,
    },
  };
};

export const signUp = ({ name, email, password, contact }) => {
  return {
    type: constants.SIGNUP_ACTION,
    payload: {
      name,
      email,
      password,
      contact,
    },
  };
};

export const signOut = () => {
  return {
    type: constants.SIGNOUT_ACTION,
  };
};

export const changeShowAuthMenu = () => {
  return {
    type: constants.CHANGE_SHOW,
  };
};
export const closeAuthMenu = () => {
  return {
    type: constants.CLOSE_AUTHMENU,
  };
};
export const changeAuthMenuView = (value) => {
  return {
    type: constants.CHANGE_VIEW,
    payload: value,
  };
};

export const getAnonymousLoginData = () => {
  return {
    type: constants.ANONYMOUS_LOGIN_ACTION,
  };
};

export const deleteAnonymousLoginUser = () => {
  return {
    type: constants.DELETE_ANONYMOUS_LOGIN_ACTION,
  };
};

