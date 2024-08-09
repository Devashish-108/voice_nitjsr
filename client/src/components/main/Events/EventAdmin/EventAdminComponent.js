import React from "react";
import { connect } from "react-redux";
import history from "../../../history";
import EventAdd from "./EventAdd";
import "./eventAdmin.css";
import { changeEventView } from "./eventAdminActions";
import EventEdit from "./EventEdit";
import EventShow from "./EventShow";

class EventAdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props.changeEventView("show");
  }
  viewChangeHandler = (view) => {
    this.props.changeEventView(view);
  };
  render() {
    if (!this.props.user || this.props.user.userType !== "admin") {
      history.push("/");
      return <> </>;
    }
    var JSX = null;
    console.log(this.props.view);
    switch (this.props.view) {
      case "show":
        JSX = <EventShow />;
        break;
      case "add":
        JSX = <EventAdd />;
        break;
      case "edit":
        JSX = <EventEdit />;
        break;
      default:
        break;
    }
    return (
      <div className="mt-2" id="events_main" style={{ minHeight: "60vh" }}>
        <h1 className="mb-3 mt-3 text-center blueH1">EVENT ADMIN</h1>
        <div className="event-admin-panel">
          <div className="controls">
            <p
              onClick={() => this.viewChangeHandler("show")}
              className="event-control-button"
            >
              View Events
            </p>
            <p
              onClick={() => this.viewChangeHandler("add")}
              className="event-control-button"
            >
              Add Event
            </p>
          </div>
          <div className="view">{JSX}</div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.profileSection.user,
    view: state.eventSection.view,
  };
}

export default connect(mapStateToProps, { changeEventView })(
  EventAdminComponent
);
