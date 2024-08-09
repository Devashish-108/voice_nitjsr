import constants from "./blogs-admin-constants";

const initialState = {
    blogs: [],
    addedBlogs: null,
    requestedBlogs: null,
}

function blogsReducer(state= initialState, action) {
    switch(action.type){
        case constants.ADD_BLOG_ACTION:
            return { ...state, addedBlogs: null }

        case constants.ADD_BLOG_SUCCESS:
            return { ...state, addedBlogs: action.payload};

        case constants.FETCH_BLOG_SUCCESS:
                return { ...state, blogs: action.payload};
        
        case constants.DELETE_BLOG_SUCCESS:
            return { ...state, blogs: state.blogs.filter(blog => blog.id !== action.payload) };

        case constants.UPDATE_BLOG_SUCCESS:
            return { ...state, blogs: state.blogs.map(blog => blog.id === action.payload.id ? { ...blog, isApproved: action.payload.isApproved } : blog) };
        
        default:
            return state;
    }

}

export default blogsReducer;