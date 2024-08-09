import React, { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllEvents } from "../Events/EventAdmin/eventAdminActions";
import homeConstants from "./home-constants";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BsBoxArrowUpRight } from 'react-icons/bs';

const EventsNewsPanel = (props) => {

  useEffect(() => {
    props.getAllEvents();
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
      <div className="news-container">
        <h5>Latest News</h5>
        <hr />
        <div className="news-content">
          <p>
            HG Radheshyam Prabhuji's visit to VOICE on 10th July
            <hr/>
          </p>
          <p>
            Software Training Workshop is going on for 1st Years Students
            <hr/>
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    events: state.eventSection.events,
    user: state.profileSection.user,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getAllEvents: bindActionCreators(
      getAllEvents,
      dispatch
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EventsNewsPanel);
