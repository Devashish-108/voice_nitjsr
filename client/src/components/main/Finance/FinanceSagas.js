import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./FinanceResources";
import constants from "./FinanceConstants";

export function* getDonorsList({ payload }) {
  try {
    const response = yield call(restApi.getDonorsList, payload);
    const donors = [];

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };
      donors.push(data);
    });

    yield put({ type: constants.FETCH_DONORS_LIST_SUCCESS, payload: donors });
  } catch (error) {
    yield put({ type: constants.FETCH_DONORS_LIST_FAILURE, payload: error });
  }
}

export function* watchGetDonorsList() {
  yield takeLatest(constants.FETCH_DONORS_LIST_ACTION, getDonorsList);
}

export function* getExpensesList({ payload }) {
  try {
    const response = yield call(restApi.getExpensesList, payload);
    const expenses = {};

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };
      expenses[d.id] = data;
    });

    yield put({
      type: constants.FETCH_EXPENSES_LIST_SUCCESS,
      payload: expenses,
    });
  } catch (error) {
    yield put({ type: constants.FETCH_DONORS_LIST_FAILURE, payload: error });
  }
}

export function* watchGetExpensesList() {
  yield takeLatest(constants.FETCH_EXPENSES_LIST_ACTION, getExpensesList);
}

export const DonorsListSagas = [
  fork(watchGetDonorsList),
  fork(watchGetExpensesList),
];
