import constants from "./content-upload-constants";

export const addDynamicContent = (payload) => {
  return {
    type: constants.ADD_DYNAMIC_CONTENT,
    payload,
  };
};

export const fetchDynamicContent = (payload) => {
  return {
    type: constants.FETCH_DYNAMIC_CONTENT,
    payload,
  };
};
