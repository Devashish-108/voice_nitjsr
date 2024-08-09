import constants from "./FinanceConstants";

export const fetchDonorsList = () => ({
  type: constants.FETCH_DONORS_LIST_ACTION,
  payload: constants.DONORS,
});

export const fetchExpensesList = () => ({
  type: constants.FETCH_EXPENSES_LIST_ACTION,
  payload: constants.EXPENSES,
});
