import constants from './blogs-admin-constants';

export const addBlog = (payload) => {
    return {
        type: constants.ADD_BLOG_ACTION,
        payload
    }
}

export const fetchBlogs = (payload) => {
    return {
        type: constants.FETCH_BLOG_ACTION,
        payload
    }
}

export const resetBlogSuccess = () => {
    return {
        type: constants.RESET_BLOG_SUCCESS
    }
}

export const deleteBlog = (values) => {
    return {
        type: constants.DELETE_BLOG_ACTION,
        payload: {
            ...values,
        },
    };
}

export const updateBlogStatus = (values) => {
    return {
        type: constants.UPDATE_BLOG_ACTION,
        payload: {
            ...values,
        },
    };
}