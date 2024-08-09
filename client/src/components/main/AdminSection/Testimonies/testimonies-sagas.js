import { call, fork, put, takeLatest } from "redux-saga/effects";
import constants from "./testimonies-constants";
import * as restApi from "./testimonies-resources";

export function* addTestimonies({ payload }) {
  try {
    var response = yield call(restApi.addTestimonies, payload);

    yield put({ type: constants.ADD_TESTIMONIES_SUCCESS, payload: response });
  } catch (err) {
    yield put({ type: constants.ADD_TESTIMONIES_FAILURE, payload: err });
  }
}

export function* watchAddTestimonies() {
  yield takeLatest(constants.ADD_TESTIMONIES, addTestimonies);
}

export function* fetchTestimonies({ payload }) {
  try {
    var response = yield call(restApi.fetchTestimonies, payload);
    const testimonies = [];

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };

      testimonies.push(data);
    });

    yield put({
      type: constants.FETCH_TESTIMONIES_SUCCESS,
      payload: testimonies,
    });
  } catch (err) {
    yield put({ type: constants.FETCH_TESTIMONIES_FAILURE, payload: err });
  }
}

export function* watchFetchTestimonies() {
  yield takeLatest(constants.FETCH_TESTIMONIES, fetchTestimonies);
}

export const TestimoniesSagas = [
  fork(watchAddTestimonies),
  fork(watchFetchTestimonies),
];
