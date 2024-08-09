import constants from "./user-list-constants";

export const changeUsersMainView = (view) => {
  return {
    type: constants.CHANGE_USERS_VIEW,
    payload: view,
  };
};

export const fetchUsersList = (payload) => ({
  type: constants.FETCH_USERS_LIST_ACTION,
  payload,
});

export const updateUserType = (values) => {
  return {
    type: constants.UPDATE_USER_TYPE,
    payload: {
      ...values,
    },
  };
};
