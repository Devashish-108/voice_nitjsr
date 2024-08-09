import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./qna-resources";
import constants from "./qna-constants";

export function* fetchQnAList() {
  try {
    const response = yield call(restApi.fetchQnAList);

    yield put({ type: constants.FETCH_QNAS_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: constants.FETCH_QNAS_FAILURE, payload: error.message });
  }
}

export function* watchFetchQnAList() {
  yield takeLatest(constants.FETCH_QNAS_ACTION, fetchQnAList);
}

export function* deleteQnA({ payload }) {
  try {
    yield call(restApi.deleteQnA, payload);
    yield put({ type: constants.DELETE_QNA_SUCCESS, payload });
  } catch (error) {
    yield put({ type: constants.DELETE_QNA_FAILURE, payload: error.message });
  }
}

export function* watchDeleteQnA() {
  yield takeLatest(constants.DELETE_QNA, deleteQnA);
}

export function* updateQnAStatus({ payload }) {
  try {
    yield call(restApi.updateQnAStatus, payload);
    yield put({ type: constants.UPDATE_QNA_STATUS_SUCCESS, payload });
  } catch (error) {
    yield put({
      type: constants.UPDATE_QNA_STATUS_FAILURE,
      payload: error.message,
    });
    console.log(error.message);
  }
}

export function* watchUpdateQnAStatus() {
  yield takeLatest(constants.UPDATE_QNA_STATUS, updateQnAStatus);
}

export function* addQnA({ payload }) {
  try {
    yield call(restApi.addQnA, payload);
    yield put({ type: constants.ADD_QNA_SUCCESS, payload });
  } catch (error) {
    yield put({ type: constants.ADD_QNA_FAILURE, payload: error.message });
    console.log(error.message);
  }
}

export function* watchAddQnA() {
  yield takeLatest(constants.ADD_QNA, addQnA);
}

export const QnAsSagas = [
  fork(watchFetchQnAList),
  fork(watchDeleteQnA),
  fork(watchUpdateQnAStatus),
  fork(watchAddQnA),
];