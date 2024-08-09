import constants from "./testimonies-constants";

export const changeTestimoniesView = (view) => {
  return {
    type: constants.CHANGE_TESTIMONIES_VIEW,
    payload: view,
  };
};
export const addTestimonies = (payload) => {
  return {
    type: constants.ADD_TESTIMONIES,
    payload,
  };
};

export const resetAddTestimoniesState = () => {
  return {
    type: constants.RESET_ADD_TESTIMONIES,
  };
};

export const fetchTestimonies = (payload) => {
  return {
    type: constants.FETCH_TESTIMONIES,
    payload,
  };
};
