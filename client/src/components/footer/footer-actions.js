import constants from "./footer-constants";

export const submitQuery = (queryInfo) => {
  return {
    type: constants.SUBMIT_QUERY_ACTION,
    payload: queryInfo,
  };
};
