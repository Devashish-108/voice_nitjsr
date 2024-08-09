import constants from "./FinanceConstants";

const initial_state = {
  donorsList: [],
  expenses: [],
};

const donorsList = (state = initial_state, action) => {
  switch (action.type) {
    case constants.FETCH_DONORS_LIST_SUCCESS:
      return { ...state, donorsList: action.payload };
    case constants.FETCH_EXPENSES_LIST_SUCCESS:
      return { ...state, expenses: action.payload };
    default:
      return state;
  }
};

export default donorsList;
