import constants from "../Login/login-constants";

const initial_state = { user: null, showEditMenu: false, error: null };

const profileSection = (state = initial_state, action) => {
  switch (action.type) {
    case "UPDATE_USER_SUCCESS":
      const user = action.payload;
      user.tier = user.userType === 'admin' || user.userType === 'inmate' ? 'tier2' : 'tier1';

      return { ...state, user };
    case constants.SIGNOUT_ACTION:
      return { ...state, user: null };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        user: action.payload,
        showEditMenu: false,
        error: null,
      };
    case "UPDATE_PROFILE_FAILURE":
      return { ...state, error: action.payload.message };
    case "CHANGE_EDIT_SHOW":
      return { ...state, showEditMenu: action.payload, error: null };
    default:
      return state;
  }
};

export default profileSection;
