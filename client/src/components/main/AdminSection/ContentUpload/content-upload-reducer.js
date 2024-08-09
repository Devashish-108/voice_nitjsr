import constants from "./content-upload-constants";

const initial_state = { dynamicContent: [], dynamicContentAdded: false };

const dynamicContentReducer = (state = initial_state, action) => {
  switch (action.type) {
    case constants.ADD_DYNAMIC_CONTENT_SUCCESS:
      return { ...state, dynamicContentAdded: true };

    case constants.ADD_DYNAMIC_CONTENT_FAILURE:
      return { ...state, dynamicContentAdded: false };

    case constants.FETCH_DYNAMIC_CONTENT:
      return { ...state, dynamicContentAdded: false };

    case constants.FETCH_DYNAMIC_CONTENT_SUCCESS:
      return { ...state, dynamicContent: action.payload };

    default:
      return state;
  }
};

export default dynamicContentReducer;
