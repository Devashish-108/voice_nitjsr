import constants from "./footer-constants";

const initial_state = { queryStatus: null };

const footerReducer = (state = initial_state, action) => {
  switch (action.type) {
    case constants.SUBMIT_QUERY_SUCCESS:
      return { ...state, queryStatus: action.payload };
    default:
      return state;
  }
};

export default footerReducer;
