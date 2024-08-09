import constants from "./queries-constants";

const initialState = {
  queries: [],
};

const queries = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_QUERIES_SUCCESS:
      return { ...state, queries: action.payload };
    case constants.UPDATE_QUERY_STATUS_SUCCESS:
      var queries = state.queries.map((q) => {
        if (q.id === action.payload.id) {
          var { status } = action.payload;
          return { ...q, status };
        }
        return q;
      });

      return { ...state, queries };
    case constants.DELETE_QUERY_SUCCESS:
      var queries = state.queries.filter((q) => {
        return q.id !== action.payload.id;
      });
      return { ...state, queries };
    default:
      return state;
  }
};

export default queries;
