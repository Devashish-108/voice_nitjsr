import { call, fork, put, takeLatest } from "redux-saga/effects";
import constants from "./EventAdmin/eventConstants";
import * as restApi from "./eventResources";

export function* getAllEvents({ payload }) {
  try {
    const response = yield call(restApi.getAllEvents, payload);
    const events = {},
      previousEvents = {};

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };
      const today = new Date().setUTCHours(0, 0, 0, 0);
      const eventDate = new Date(data.date).setUTCHours(0, 0, 0, 0);
      if (today <= eventDate) {
        events[d.id] = data;
      } else {
        previousEvents[d.id] = data;
      }
    });
    yield put({
      type: constants.GET_ALL_EVENTS_SUCCESS,
      payload: { events, previousEvents },
    });
  } catch (error) {
    yield put({ type: constants.GET_ALL_EVENTS_FAILURE, payload: error });
  }
}

export function* watchGetAllEvents() {
  yield takeLatest(constants.GET_ALL_EVENTS, getAllEvents);
}

export function* getEvent({ payload }) {
  try {
    const response = yield call(restApi.getEvent, payload);

    yield put({ type: constants.GET_EVENT_SUCCESS, payload: response.data() });
  } catch (error) {
    yield put({ type: constants.GET_EVENT_FAILURE, payload: error });
  }
}

export function* watchGetEvent() {
  yield takeLatest(constants.GET_EVENT, getEvent);
}

export function* addEvent({ payload }) {
  try {
    const response = yield call(restApi.addEvent, payload);
    yield put({ type: constants.ADD_EVENT_SUCCESS, payload: response });
  } catch (error) {
    yield put({ type: constants.ADD_EVENT_FAILURE, payload: error });
  }
}

export function* watchAddEvent() {
  yield takeLatest(constants.ADD_EVENT, addEvent);
}

export function* editEvent({ payload }) {
  try {
    yield call(restApi.updateEvent, payload);
    yield put({ type: constants.UPDATE_EVENT_SUCCESS });
  } catch (error) {
    yield put({ type: constants.UPDATE_EVENT_FAILURE, payload: error });
  }
}

export function* watchEditEvent() {
  yield takeLatest(constants.UPDATE_EVENT, editEvent);
}

export function* deleteEvent({ payload }) {
  try {
    const response = yield call(restApi.getEventImages, {
      collection: "events",
      doc: payload.id,
      subCollection: "images",
    });
    response.forEach((d) => {
      restApi.deleteImageFromStorage(d.data());
      restApi.deleteImageFromDB({
        dbcollection: `events/${payload}/images`,
        docId: d.id,
      });
    });

    yield call(restApi.deleteEvent, payload);

    yield put({ type: constants.DELETE_EVENT_SUCCESS, payload });
  } catch (error) {
    yield put({ type: constants.DELETE_EVENT_FAILURE, payload: error });
  }
}

export function* watchDeleteEvent() {
  yield takeLatest(constants.DELETE_EVENT, deleteEvent);
}

export function* getEventImages({ payload }) {
  try {
    const response = yield call(restApi.getEventImages, payload);
    const images = {};

    response.forEach((d) => {
      const data = { ...d.data(), id: d.id };
      images[d.id] = data;
    });
    yield put({ type: constants.GET_EVENT_IMAGES_SUCCESS, payload: images });
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetEventImages() {
  yield takeLatest(constants.GET_EVENT_IMAGES, getEventImages);
}

export function* deleteEventImage({ payload }) {
  try {
    yield call(restApi.deleteImageFromStorage, payload);
    yield call(restApi.deleteImageFromDB, payload);

    yield put({
      type: constants.DELETE_IMAGE_SUCCESS,
      payload: { id: payload.docId },
    });
  } catch (error) {
    yield put({ type: constants.DELETE_IMAGE_FAILURE, payload: error });
  }
}

export function* watchDeleteEventImage() {
  yield takeLatest(constants.DELETE_IMAGE, deleteEventImage);
}

export const EventSagas = [
  fork(watchGetAllEvents),
  fork(watchGetEvent),
  fork(watchDeleteEvent),
  fork(watchAddEvent),
  fork(watchEditEvent),
  fork(watchGetEventImages),
  fork(watchDeleteEventImage),
];
