import constants from "./EventAdmin/eventConstants";

const initial_state = {
  events: null,
  previousEvents: null,
  view: "show",
  eventToShow: null,
  images: {},
};

const eventSection = (state = initial_state, action) => {
  switch (action.type) {
    case constants.CHANGE_EVENT_VIEW:
      return { ...state, view: action.payload, eventToShow: null, images: {} };
    case constants.GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.events,
        previousEvents: action.payload.previousEvents,
      };
    case constants.GET_ALL_EVENTS_FAILURE:
      return state;
    case constants.GET_EVENT_SUCCESS:
      return { ...state, eventToShow: action.payload };
    case constants.SHOW_SELECTED_EVENT:
      var { view, id } = action.payload;
      return { ...state, view, eventToShow: id };
    case constants.UPDATE_EVENT_SUCCESS:
      return { ...state, view: "show", images: {} };
    case constants.ADD_EVENT_SUCCESS:
      return { ...state, view: "show" };
    case constants.DELETE_EVENT_SUCCESS:
      var events = { ...state.events };
      delete events[action.payload.id];
      return { ...state, events };
    case constants.GET_EVENT_IMAGES_SUCCESS:
      return { ...state, images: action.payload };
    case constants.DELETE_IMAGE_SUCCESS:
      var images = { ...state.images };
      delete images[action.payload.id];
      return { ...state, images };
    default:
      return state;
  }
};

export default eventSection;
