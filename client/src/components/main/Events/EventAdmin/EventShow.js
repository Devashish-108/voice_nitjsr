import React from "react";
import { connect } from "react-redux";
import { getAllEvents } from "./eventAdminActions";
import { Spinner } from "react-bootstrap";
import EventCard from "../EventCard";

class EventShow extends React.Component {
  componentDidMount() {
    this.props.getAllEvents();
  }
  render() {
    if (!this.props.events || !this.props.previousEvents) {
      return (
        <div style={{ minHeight: "150px", width: "100%" }}>
          <Spinner className="m-auto" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }
    if (Object.keys(this.props.events).length === 0 && Object.keys(this.props.previousEvents).length === 0) {
      return <div className="blueH1 text-center">No events</div>;
    }

    var upcomingJSX = Object.keys(this.props.events).map((k) => {
      var e = this.props.events[k];
      return <EventCard key={e.id} event={e} />;
    });

    var previousJSX = Object.keys(this.props.previousEvents).map((k) => {
      var e = this.props.previousEvents[k];
      return <EventCard key={e.id} event={e} />;
    });

    return (
      <div className="events-showcase">
        <h5>Upcoming/Ongoing Events</h5>
        <hr/>
        <div className="event-cards-container">{upcomingJSX}</div>
        <h5 style={{marginTop: "80px"}}> Previous Events</h5>
        <hr/>
        <div className="event-cards-container">{previousJSX}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    events: state.eventSection.events,
    previousEvents: state.eventSection.previousEvents,
  };
};

export default connect(mapStateToProps, { getAllEvents })(EventShow);
