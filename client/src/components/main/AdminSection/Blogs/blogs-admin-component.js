import React, { Fragment, useEffect, useReducer, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import AdminSectionTemplate from "../../../../assets/lib/components/admin-section-template/admin-section-template-component";
import "../../../../assets/lib/components/forms/admin-section-forms/admin-section-forms.css";
import { addBlog, deleteBlog, fetchBlogs, updateBlogStatus } from "./blogs-admin-actions";
import './blogs-admin-component.css';
import BlogsAdminRequestsComponent from "./blogs-admin-requests-component";

const blogsReducer = (state, action) => {
    switch (action.type) {
        case "title":
            return {
                ...state,
                title: action.value,
            };
        case "desc":
            return {
                ...state,
                desc: action.value,
            };
        case "photo":
            return {
                ...state,
                photo: action.value,
            };
        default:
            return state;
    }
  };

const Blogs = (props) => {
    const [view, setView] = useState('view');
    const [blogsState, dispatch] = useReducer(blogsReducer, {
        title: '',
        desc: '',
        timestamp: new Date(),
        author: props.user.name,
        // profileImage: props.user.profileImage,
        photo: '',
        likes: 0,
        comments: 0,
        isNew: true,
        isApproved: false,
        tier: "visitor", /* (visitor, inmate, admin) */
        userId: 1
    });

    const handleInput = (evt) => {
        const type = evt.target.name, value = evt.target.value;

        dispatch({type, value });
    }

    const handleSubmit = (evt) => {
        const user = props.user;
        console.log("user", user, "\nblogsState",blogsState)
        evt.preventDefault()
        if(user) {
            props.addBlog(blogsState);
        }
        else {
            alert("Please Log In to Create Blog")
        }
    }

    const handleViewChange = (evt) => {
        setView(evt.target.dataset.viewType);
    }

    useEffect(()=>{
        setView('view')
        props.fetchBlogs()
    }, [props.addedBlogs]);

    return (
        <AdminSectionTemplate className="admin-blogs-container">
        <div className="admin-blogs-tabs-panel">
            <div data-view-type="view" onClick={handleViewChange} className="admin-blogs-tab">View</div>
            <div data-view-type="add" onClick={handleViewChange} className="admin-blogs-tab">Add</div>
            <div data-view-type="requests" onClick={handleViewChange} className="admin-blogs-tab">Requests</div>
        </div>
        <div className="view-panel">
            <div className="admin-blogs-content-container">
            {view === 'view' && <Fragment>
                <div className="admin-blogs-content-item list-heading">
                    <div>Title</div>
                </div>
                {props.blogs.map(blog=>
                <div className="admin-blogs-content-item">
                    <h6>{blog.title}</h6>
                    <div>
                        <button>View</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>)}
            </Fragment>
            }
            {view === 'add' &&
                <form onSubmit={handleSubmit} className="admin-form">
                    <label htmlFor="title">Title: </label>
                    <input onChange={handleInput} name="title" type="text" required />
                    <label htmlFor="text">Description: </label>
                    <div>
                    <textarea
                        onChange={handleInput}
                        name="desc"
                        type="textarea"
                        required
                    />
                    <div>
                        <p>
                        <sup>**</sup>Please enter the text in the format (paragraph) you
                        want to see in the blogs. You can also expand the text area
                        by dragging the bottom right corner.{" "}
                        </p>
                    </div>
                    <label htmlFor="photo">Photo: </label>
                    <input onChange={handleInput} name="photo" type="file" accept="image/*" />
                    </div>
                    <input className="admin-form--submit" type="submit" value="Submit" />
                </form>
            }
            {view === 'requests' && 
                <BlogsAdminRequestsComponent/>
            }
            </div>
        </div>
    </AdminSectionTemplate>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.profileSection.user,
        blogs: state.blogsAdminSection.blogs,
        addedBlogs: state.blogsAdminSection.addedBlogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addBlog: bindActionCreators(addBlog, dispatch),
        fetchBlogs: bindActionCreators(fetchBlogs, dispatch),
        deleteBlog: bindActionCreators(deleteBlog, dispatch),
        updateBlogStatus: bindActionCreators(updateBlogStatus, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);