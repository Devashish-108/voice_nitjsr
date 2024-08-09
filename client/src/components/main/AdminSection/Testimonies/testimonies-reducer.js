import constants from "./testimonies-constants";

const initial_state = { 
  testimonies: [], 
  testimoniesAdded: false,
  view: "show"
};

const testimoniesReducer = (state = initial_state, action) => {
  switch (action.type) {
    case constants.ADD_TESTIMONIES_SUCCESS:
      return { ...state, testimoniesAdded: true };

    case constants.RESET_ADD_TESTIMONIES:
      return { ...state, testimoniesAdded: false };

    case constants.FETCH_TESTIMONIES:
      return { ...state, testimoniesAdded: false };

    case constants.FETCH_TESTIMONIES_SUCCESS:
      return { ...state, testimonies: action.payload };

    case constants.CHANGE_TESTIMONIES_VIEW:
      return {...state, view: action.payload}

    default:
      return state;
  }
};

export default testimoniesReducer;
