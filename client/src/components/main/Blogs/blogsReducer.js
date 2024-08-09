import constants from "./blogsConstants";

const initial_state = {
    blogs: []
}

const blogsSection = (state = initial_state, action) => {
    switch (action.type) {
      case constants.GET_ALL_BLOGS_SUCCESS:
        return {
          ...state,
          blogs: action.payload.blogs,
        };
      case constants.GET_ALL_BLOGS_FAILURE:
        return state;
      default:
        return state;
    }
};

export default blogsSection;