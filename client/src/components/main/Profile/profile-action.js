export const loadUserData = (userId) => {
  return {
    type: "UPDATE_ACTION",
    payload: {
      userId,
    },
  };
};
export const editMenuShowAction = (show) => {
  return {
    type: "CHANGE_EDIT_SHOW",
    payload: show,
  };
};
export const updateProfile = (userId, values) => {
  return {
    type: "UPDATE_PROFILE_ACTION",
    payload: {
      userId,
      values,
    },
  };
};
