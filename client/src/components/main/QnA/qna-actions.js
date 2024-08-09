import qnaconstants from "./qna-constants";

export const fetchQnAsList = () => ({ type: qnaconstants.FETCH_QNAS_ACTION });

export const addQnA = (values) => {
  return {
    type: qnaconstants.ADD_QNA,
    payload: {
      ...values,
    },
  };
};

export const resetQnaSuccess = () => {
  return {
    type: qnaconstants.RESET_QNA_SUCCESS,
  };
};

export const updateQnAStatus = (values) => {
  return {
    type: qnaconstants.UPDATE_QNA_STATUS,
    payload: {
      ...values,
    },
  };
};

export const deleteQnA = (values) => {
  return {
    type: qnaconstants.DELETE_QNA,
    payload: {
      ...values,
    },
  };
};
