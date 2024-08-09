import { call, fork, put, takeLatest } from "redux-saga/effects";
import constants from "./blogsConstants";
import * as restApi from "./blogsResources.js";

export function* getAllBlogs({ payload }) {
  try {
    const response = yield call(restApi.getAllBlogs, payload);
    const blogs = {};

    response.forEach((d) => {
      const data = { ...d.data() , id: d.id}; 
      blogs[d.id] = data;
    });
    yield put({
      type: constants.GET_ALL_BLOGS_SUCCESS,
      payload: {blogs},
    });
  } catch (error) {
    yield put({ type: constants.GET_ALL_BLOGS_FAILURE, payload: error });
  }
}

export function* watchGetAllBlogs() {
  yield takeLatest(constants.GET_ALL_BLOGS, getAllBlogs);
}

export const blogsSagas = [
    fork(watchGetAllBlogs)
];
