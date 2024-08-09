import { call, fork, put, takeLatest } from "redux-saga/effects";

import * as restApi from "./login-resources";
import constants from "./login-constants";
import history from "../../history";
import { getUserData } from "../Profile/profile-resources";
import profileConstants from "../Profile/profile-constants";

export function* getAnonymousLoginData({ payload }) {
  try {
    const response = yield call(restApi.getAnonymousLoginData, payload);
    response.isAnonymous = true;
    yield put({ type: constants.GET_LOGIN_DATA_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: constants.GET_LOGIN_DATA_FAILURE, payload: error });
  }
}

export function* watchGetAnonymousLoginData() {
  yield takeLatest(constants.ANONYMOUS_LOGIN_ACTION, getAnonymousLoginData);
}

export function* deleteAnonymousLoginUser() {
  try {
    const response = yield call(restApi.deleteAnonymousLoginUser);

    yield put({
      type: constants.DELETE_ANONYMOUS_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    yield put({
      type: constants.DELETE_ANONYMOUS_LOGIN_FAILURE,
      payload: error,
    });
  }
}

export function* watchDeleteAnonymousLoginUser() {
  yield takeLatest(
    constants.DELETE_ANONYMOUS_LOGIN_ACTION,
    deleteAnonymousLoginUser
  );
}

export function* getLoginData({ payload }) {
  try {
    const deleteAnonymousUser = yield call(restApi.deleteAnonymousLoginUser);
    const response = yield call(restApi.getLoginData, payload);
    const profileData = yield call(getUserData, {userId: response.user.uId});

    yield put({
      type: constants.DELETE_ANONYMOUS_LOGIN_SUCCESS,
      payload: deleteAnonymousUser,
    });
    yield put({ type: constants.GET_LOGIN_DATA_SUCCESS, payload: response });
    yield put({ type: profileConstants.UPDATE_USER_SUCCESS, payload: profileData.data() });
    history.push("/user/profile");
  } catch (error) {
    yield put({ type: constants.GET_LOGIN_DATA_FAILURE, payload: error });
  }
}

export function* watchGetLoginData() {
  yield takeLatest(constants.LOGIN_ACTION, getLoginData);
}

export function* resetPassword({ payload }) {
  try {
    const response = yield call(restApi.forgotPassword, payload);
    yield put({ type: constants.RESET_PASSWORD_SUCCESS, payload: response });
    // history.push('/');
  } catch (error) {
    yield put({ type: constants.RESET_PASSWORD_FAILURE, payload: error });
  }
}

export function* watchResetPassword() {
  yield takeLatest(constants.RESET_PASSWORD, resetPassword);
}

export function* doRegistration({ payload }) {
  try {
    var response = yield call(restApi.doRegistration, payload);
    response = { ...response, name: payload.name, contact: payload.contact };
    yield put({ type: constants.GET_SIGNUP_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: constants.GET_SIGNUP_FAILURE, payload: error });
  }
}

export function* watchDoRegistration() {
  yield takeLatest(constants.SIGNUP_ACTION, doRegistration);
}

export const LoginSagas = [
  fork(watchGetAnonymousLoginData),
  fork(watchDeleteAnonymousLoginUser),
  fork(watchGetLoginData),
  fork(watchDoRegistration),
  fork(watchResetPassword),
];
