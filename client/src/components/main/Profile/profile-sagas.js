import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./profile-resources";
import constants from "./profile-constants";

export function* getUserData({ payload }) {
  try {
    const response = yield call(restApi.getUserData, payload);

    yield put({ type: constants.UPDATE_USER_SUCCESS, payload: response.data() });
  } catch (error) {
    yield put({ type: "UPDATE_USER_FAILED", payload: error });
  }
}

export function* watchGetUserData() {
  yield takeLatest("UPDATE_ACTION", getUserData);
}

export function* updateUserProfile({ payload }) {
  try {
    yield call(restApi.updateUserProfile, payload);
    const response = yield call(restApi.getUserData, payload);
    yield put({ type: "UPDATE_PROFILE_SUCCESS", payload: response.data() });
  } catch (error) {
    yield put({ type: "UPDATE_PROFILE_FAILURE", payload: error });
  }
}

export function* watchUpdateUserProfile() {
  yield takeLatest("UPDATE_PROFILE_ACTION", updateUserProfile);
}

export const ProfileSagas = [
  fork(watchGetUserData),
  fork(watchUpdateUserProfile),
];
