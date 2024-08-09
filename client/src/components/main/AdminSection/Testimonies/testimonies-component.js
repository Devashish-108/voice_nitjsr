import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../../../history";
import TestimoniesAdd from "./testimonies-add";
import "./testimonies.css";
import { changeTestimoniesView } from "./testimonies-action";
// import EventEdit from "./EventEdit";
import TestimoniesShow from "./testimonies-show";

const TestimoniesComponent = (props) => {

  useEffect(()=>{
    props.changeTestimoniesView("show");
  }, [])
  const viewChangeHandler = (view) => {
    props.changeTestimoniesView(view);
  };
  if (!props.user || props.user.userType !== "admin") {
    history.push("/");
    return <> </>;
  }

  return (
    <div className="mt-2" id="events_main" style={{ minHeight: "60vh" }}>
      <h1 className="mb-3 mt-3 text-center blueH1">TESTIMONY ADMIN</h1>
      <div className="event-admin-panel">
        <div className="controls">
          <p
            onClick={() => viewChangeHandler("show")}
            className="event-control-button"
          >
            View Testimonies
          </p>
          <p
            onClick={() => viewChangeHandler("add")}
            className="event-control-button"
          >
            Add Testimony
          </p>
        </div>
        <div className="view">
          {props.view === 'show' && <TestimoniesShow />}
          {props.view === 'add' && <TestimoniesAdd />}
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.profileSection.user,
    view: state.testimoniesSection.view,
  };
}

export default connect(mapStateToProps, { changeTestimoniesView })(
    TestimoniesComponent
);
