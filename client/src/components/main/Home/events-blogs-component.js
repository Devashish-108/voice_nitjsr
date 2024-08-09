import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../Events/EventAdmin/eventAdminActions";
import { fetchBlogs } from "../AdminSection/Blogs/blogs-admin-actions"
import homeConstants from "./home-constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BsBoxArrowUpRight } from 'react-icons/bs';

const EventsBlogsPanel = (props) => {

  useEffect(() => {
    props.getAllEvents();
    props.fetchBlogs()
  }, []);

  const Events = useMemo(()=>{
    const events = [];

    if(props.events){
      Object.values(props.events).forEach(evt => {
        const tier = props.user ? props.user.tier : 'tier1';

        if (homeConstants.displayUserEvents[tier].includes(evt.tier)) {
          events.push(<Link to={"/events/" + evt.id}>
            <p><BsBoxArrowUpRight/> {evt.title}</p>
          </Link>);
        }
      })
    }
    return events.length ? events : null;
  },[props.events, props.user])

  return (
    <div>
      <div className="events-container">
        <h5>Latest Events</h5>
        <hr/>
        <div className="events-content">
          <div>
            {Events || <p><i>No Upcoming Events...</i></p>}
          </div>
        </div>
      </div>
      <div className="blogs-container">
        <h5>Latest Blogs</h5>
        <hr />
        {props.blogs ? props.blogs.map(blog=>
          <div className="blogs-content">
            <p>
              {blog.title}
              <hr/>
            </p>
          </div>
        ) : <p><i>No Blogs...</i></p>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventSection.events,
    user: state.profileSection.user,
    blogs: state.blogs ? state.blogs.blogs : [],
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAllEvents: bindActionCreators(
      getAllEvents,
      dispatch
    ),
    fetchBlogs: bindActionCreators(fetchBlogs, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsBlogsPanel);
