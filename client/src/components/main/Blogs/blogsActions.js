import constants from "./blogsConstants";

export const getAllBlogs = () => {
    return {
      type: constants.GET_ALL_BLOGS,
      payload: constants.BLOGS,
    };
  };