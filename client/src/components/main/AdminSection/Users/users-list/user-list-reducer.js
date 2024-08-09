import constants from "./user-list-constants";

const initial_state = {
  usersList: [],
  view: "masterList"
};

const userList = (state = initial_state, action) => {
  switch (action.type) {
    case constants.CHANGE_USERS_VIEW:
      return {...state, view: action.payload}
    case constants.FETCH_USERS_LIST_SUCCESS:
      return { ...state, usersList: action.payload };
    case constants.UPDATE_USER_TYPE_SUCCESS:
      var usersList = state.usersList.map((u) => {
        if (u.id === action.payload.id)
          return { ...u, userType: action.payload.userType };

        return u;
      });
      return { ...state, usersList };
    default:
      return state;
  }
};

export default userList;
