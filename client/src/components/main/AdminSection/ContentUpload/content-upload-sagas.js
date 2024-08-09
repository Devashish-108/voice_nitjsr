import { call, fork, put, takeLatest } from "redux-saga/effects";
import constants from "./content-upload-constants";
import * as restApi from "./content-upload-resources";

export function* addDynamicContent({ payload }) {
  try {
    var response = yield call(restApi.addDynamicContent, payload);

    yield put({
      type: constants.ADD_DYNAMIC_CONTENT_SUCCESS,
      payload: response,
    });
  } catch (err) {
    yield put({ type: constants.ADD_DYNAMIC_CONTENT_FAILURE, payload: err });
  }
}

export function* watchAddDynamicContent() {
  yield takeLatest(constants.ADD_DYNAMIC_CONTENT, addDynamicContent);
}

export function* fetchDynamicContent({ payload }) {
  try {
    var response = yield call(restApi.fetchDynamicContent, payload);
    const contents = [];

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };

      contents.push(data);
    });
    yield put({
      type: constants.FETCH_DYNAMIC_CONTENT_SUCCESS,
      payload: contents,
    });
  } catch (err) {
    yield put({ type: constants.FETCH_DYNAMIC_CONTENT_FAILURE, payload: err });
  }
}

export function* watchFetchDynamicContent() {
  yield takeLatest(constants.FETCH_DYNAMIC_CONTENT, fetchDynamicContent);
}

export const ContentSagas = [
  fork(watchAddDynamicContent),
  fork(watchFetchDynamicContent),
];
