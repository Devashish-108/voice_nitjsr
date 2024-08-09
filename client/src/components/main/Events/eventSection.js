import React, { Component } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getAllEvents } from "./EventAdmin/eventAdminActions";
import { EventCardMain } from "./EventCard";
import "./rowEvents.css";
import "./events.css";

class EventUpcoming extends Component {
  render() {
    const type = this.props.type;
    var upcomingEvents, previousEvents;
    if (!this.props.events) {
      this.props.getAllEvents();

      upcomingEvents = (
        <Spinner className="m-auto" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else if (Object.keys(this.props.events).length === 0) {
      upcomingEvents = (
        <div className="blueH1 text-center">No upcoming events</div>
      );
    } else {
      upcomingEvents = Object.values(this.props.events).map((e) => (
        <EventCardMain event={e} key={e.id} type={"full"} date={"e.date"} />
      ));
    }

    if (!this.props.previousEvents) {
      this.props.getAllEvents();

      previousEvents = (
        <Spinner className="m-auto" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      );
    } else if (Object.keys(this.props.previousEvents).length === 0) {
      previousEvents = (
        <div className="blueH1 text-center">No previous Events</div>
      );
    } else {
      previousEvents = Object.values(this.props.previousEvents).map((e) => (
        <EventCardMain event={e} key={e.id} type={"partial"} />
      ));
    }

    return (
      <div>
        <div
          className="event-items-holder"
          style={{
            display: "flex",
            minHeight: "200px",
            justifyContent: "space-around",
            flexWrap: "wrap",
            alignContent: "space-between",
          }}
        >
          {type == "upcoming" ? upcomingEvents : previousEvents}
        </div>
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

export default connect(mapStateToProps, { getAllEvents })(EventUpcoming);
