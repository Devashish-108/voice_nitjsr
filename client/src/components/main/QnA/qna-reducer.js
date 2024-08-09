import constants from "./qna-constants";

const initialState = {
  QnAs: [],
  successfulPost: false,
};

const qnas = (state = initialState, action) => {
  switch (action.type) {
    case constants.FETCH_QNAS_SUCCESS:
      return { ...state, QnAs: action.payload };
    case constants.UPDATE_QNA_STATUS_SUCCESS:
      var queries = state.QnAs.map((q) => {
        if (q.id === action.payload.id) {
          var { status } = action.payload;
          return { ...q, status };
        }
        return q;
      });

      return { ...state, QnAs: queries };

    case constants.DELETE_QNA_SUCCESS:
      var QnAs = state.QnAs.filter((q) => {
        return q.id !== action.payload.id;
      });
      return { ...state, QnAs };

    case constants.ADD_QNA_SUCCESS:
      return { ...state, successfulPost: true };

    case constants.RESET_QNA_SUCCESS:
      return { ...state, successfulPost: false };

    default:
      return state;
  }
};

export default qnas;
