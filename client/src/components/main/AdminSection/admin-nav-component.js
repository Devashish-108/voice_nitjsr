import React from "react";
import { NavLink } from "react-router-dom";
import './admin.css'

class AdminNavComponent extends React.Component {

  scrollTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="admin-main-component mb-2">
        <h1 className="Subheading mb-3 text-center blueH1">ADMIN SECTION</h1>
        <div className="admin-actions-div btn m-1 me-2">
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/users"
          >
            Users
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/testimonies"
          >
            Testimonies
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/events"
          >
            Events
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/courses"
          >
            Courses
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/queries"
          >
            Queries
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/qna"
          >
            QnA
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/finance"
          >
            Financial Details
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/content-upload"
          >
            Content Upload
          </NavLink>
          <NavLink
            className="admin-section-link btn m-1 me-2" 
            activeClassName="selected"
            onClick={this.scrollTop}
            to="/admin-section/blogs"
          >
            Blogs
          </NavLink>
        </div>
      </div>
    );
  }
}

export default AdminNavComponent;