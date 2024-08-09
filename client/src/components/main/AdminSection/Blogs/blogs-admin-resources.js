export const addBlog = (payload) => 
    fetch('/.netlify/functions/api/blog/create', {
        method: 'POST',
        body: {payload}
    }).then(res => res.json())
        .then(res => res.data)
        .catch((err) => err);

export const fetchBlogs = () => 
    fetch('/.netlify/functions/api/blogs/fetch').then(res => res.json())
        .then(res => res.data)
        .catch((err) => err);

export const deleteBlog = ({ id }) => 
    fetch('/.netlify/functions/api/blog/delete', {
        method: 'DELETE',
        body: {id}
    }).then(res => res.json())
        .then(res => res.data)
        .catch((err) => err);    

export const updateBlogStatus = ({ id, isApproved }) => 
    fetch('/.netlify/functions/api/blog/updateStatus', {
        method: 'PATCH',
        body: {id, isApproved}
    }).then(res => res.json())
        .then(res => res.data)
        .catch((err) => err);