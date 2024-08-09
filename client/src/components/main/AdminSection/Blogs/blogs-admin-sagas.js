import constants from './blogs-admin-constants'
import {fork, takeLatest, call, put } from 'redux-saga/effects';
import * as restApi from './blogs-admin-resources'

function* addBlog (action) {
    try {
        const response = yield call(restApi.addBlog, action.payload);

        yield put({ type: constants.ADD_BLOG_SUCCESS, payload: { id: response.id, ...action.payload }});
    } catch (error) {
        yield put({ type: constants.ADD_BLOG_FAILURE, payload: error.message});
    }
}

function* watchAddBlogs () {
    yield takeLatest(constants.ADD_BLOG_ACTION, addBlog)
}

function* fetchBlogs () {
    try {
        const response = yield call(restApi.fetchBlogs);

        yield put({ type: constants.FETCH_BLOG_SUCCESS, payload: response });
    } catch (error) {
        yield put({ type: constants.FETCH_BLOG_FAILURE, payload: error.message});
    }
}

function* watchFetchBlogs () {
    yield takeLatest(constants.FETCH_BLOG_ACTION, fetchBlogs)
}

function* deleteBlog ({ payload }) {
    try {
        yield call(restApi.deleteBlog, payload);
        yield put({ type: constants.DELETE_BLOG_SUCCESS, payload });
    } catch (error) {
        yield put({ type: constants.DELETE_BLOG_FAILURE, payload: error.message });
    }
}

function* watchDeleteBlog () {
    yield takeLatest(constants.DELETE_BLOG_ACTION, deleteBlog);
}

function* updateBlogStatus ({ payload }) {
    try {
        yield call(restApi.updateBlogStatus, payload);
        yield put({ type: constants.UPDATE_BLOG_SUCCESS, payload });
    } catch (error) {
        yield put({ type: constants.UPDATE_BLOG_FAILURE, payload: error.message });
    }
}

function* watchUpdateBlogStatus () {
    yield takeLatest(constants.UPDATE_BLOG_ACTION, updateBlogStatus);
}

export const blogsAdminSagas = [
    fork(watchAddBlogs),
    fork(watchFetchBlogs),
    fork(watchDeleteBlog),
    fork(watchUpdateBlogStatus)
]

