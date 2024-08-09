import constants from "./eventConstants";

export const changeEventView = (view) => {
  return {
    type: constants.CHANGE_EVENT_VIEW,
    payload: view,
  };
};
export const showSelectedEvent = (view, id) => {
  return {
    type: constants.SHOW_SELECTED_EVENT,
    payload: {
      view,
      id,
    },
  };
};
export const getEvent = (collection, id) => {
  return {
    type: constants.GET_EVENT,
    payload: {
      collection,
      id,
    },
  };
};
export const getAllEvents = () => {
  return {
    type: constants.GET_ALL_EVENTS,
    payload: constants.EVENTS,
  };
};

export const addEvent = (collection, event) => {
  return {
    type: constants.ADD_EVENT,
    payload: {
      collection,
      event,
    },
  };
};

export const editEvent = (eventId, values) => {
  return {
    type: constants.UPDATE_EVENT,
    payload: {
      eventId,
      values,
    },
  };
};

export const deleteEvent = (collection, id) => {
  return {
    type: constants.DELETE_EVENT,
    payload: {
      collection,
      id,
    },
  };
};

export const getEventImages = (collection, doc, subCollection) => {
  return {
    type: constants.GET_EVENT_IMAGES,
    payload: {
      collection,
      doc,
      subCollection,
    },
  };
};

export const deleteImage = (filename, dbcollection, docId) => {
  return {
    type: constants.DELETE_IMAGE,
    payload: { filename, dbcollection, docId },
  };
};
