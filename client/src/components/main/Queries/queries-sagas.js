import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./queries-resources";
import constants from "./queries-constants";

export function* fetchQueriesList() {
  try {
    const response = yield call(restApi.fetchQueriesList);

    yield put({ type: constants.FETCH_QUERIES_SUCCESS, payload: response });
  } catch (error) {
    yield put({
      type: constants.FETCH_QUERIES_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchFetchQueriesList() {
  yield takeLatest(constants.FETCH_QUERIES_ACTION, fetchQueriesList);
}

export function* updateQueryStatus({ payload }) {
  try {
    yield call(restApi.updateQueryStatus, payload);
    yield put({ type: constants.UPDATE_QUERY_STATUS_SUCCESS, payload });
  } catch (error) {
    yield put({
      type: constants.UPDATE_QUERY_STATUS_FAILURE,
      payload: error.message,
    });
  }
}

export function* watchUpdateQueryStatus() {
  yield takeLatest(constants.UPDATE_QUERY_STATUS, updateQueryStatus);
}

export function* deleteQuery({ payload }) {
  try {
    yield call(restApi.deleteQuery, payload);
    yield put({ type: constants.DELETE_QUERY_SUCCESS, payload });
  } catch (error) {
    yield put({ type: constants.DELETE_QUERY_FAILURE, payload: error.message });
  }
}

export function* watchDeleteQuery() {
  yield takeLatest(constants.DELETE_QUERY, deleteQuery);
}

export const QueriesSagas = [
  fork(watchFetchQueriesList),
  fork(watchUpdateQueryStatus),
  fork(watchDeleteQuery),
];
