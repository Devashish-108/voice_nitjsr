import constants from "./queries-constants";

export const fetchQueriesList = () => ({
  type: constants.FETCH_QUERIES_ACTION,
});
export const updateQueryStatus = (values) => {
  return {
    type: constants.UPDATE_QUERY_STATUS,
    payload: {
      ...values,
    },
  };
};

export const deleteQuery = (values) => {
  return {
    type: constants.DELETE_QUERY,
    payload: {
      ...values,
    },
  };
};
