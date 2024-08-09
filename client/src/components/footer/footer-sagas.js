import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./footer-resources";
import constants from "./footer-constants";

export function* submitQuery({ payload }) {
  try {
    yield call(restApi.submitQuery, payload);

    yield put({ type: constants.SUBMIT_QUERY_SUCCESS, payload: "successful" });
  } catch (error) {
    yield put({ type: constants.SUBMIT_QUERY_FAILED, payload: error });
  }
}

export function* watchSubmitQuery() {
  yield takeLatest(constants.SUBMIT_QUERY_ACTION, submitQuery);
}

export const FooterSaga = [fork(watchSubmitQuery)];
