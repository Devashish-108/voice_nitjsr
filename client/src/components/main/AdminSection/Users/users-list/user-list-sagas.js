import { call, fork, put, takeLatest } from "redux-saga/effects";
import * as restApi from "./user-list-resources";
import constants from "./user-list-constants";
import { singleFilter } from "../../../../../assets/lib/utils/search";

export function* getUsersList({ payload }) {
  try {
    const { searchInput } = payload;
    const response = yield call(restApi.getUsersList, payload);
    const users = [];

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };

      if (searchInput) {
        if (singleFilter(data, constants.SEARCH_PARAMS, searchInput)) {
          users.push(data);
        }
      } else {
        users.push(data);
      }
    });

    yield put({ type: constants.FETCH_USERS_LIST_SUCCESS, payload: users });
  } catch (error) {
    yield put({ type: constants.FETCH_USERS_LIST_FAILURE, payload: error });
  }
}

export function* watchGetUsersList() {
  yield takeLatest(constants.FETCH_USERS_LIST_ACTION, getUsersList);
}

export function* updateUserType({ payload }) {
  try {
    yield call(restApi.updateUserType, payload);

    yield put({ type: constants.UPDATE_USER_TYPE_SUCCESS, payload });
  } catch (error) {
    yield put({ type: constants.FETCH_USERS_LIST_FAILURE, payload: error });
  }
}

export function* watchUpdateUserType() {
  yield takeLatest(constants.UPDATE_USER_TYPE, updateUserType);
}

export const UsersListSagas = [
  fork(watchGetUsersList),
  fork(watchUpdateUserType),
];
