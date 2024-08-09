import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import calendarIcon from "../../../assets/img/calendar.svg";
import { getEvent } from "./EventAdmin/eventAdminActions";
import moment from "moment";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";

export const map = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "December",
};

function EventDetails(props) {
  const event = props.currentEvent
  const { id } = useParams();

  useEffect(()=>{
    props.getEvent("events", id);
  }, []);

  
    if(!event){
      return <div
        style={{ minHeight: "100vh", alignItems: "center" }}
        className="event-container p-3 m-2 d-flex"
      >
        <Spinner className="m-auto" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    }
    const date = moment(new Date(event.date)).format("DD-MMM-yyyy");
    return (
      <div>
        <h1 className="mb-2 mt-3 text-center blueH1">{event.title}</h1>
        <div className="event-details-main">
          <div className="event-image-div event-detail-child">
            <img
              style={{ width: "100%" }}
              src={event.imageUrl}
              alt={event.title}
            />
          </div>
          <div className="event-details-text event-detail-child">
            <span className="mb-3">
              <img
                className="me-3"
                style={{ width: "24px" }}
                src={calendarIcon}
                alt="calendar"
              />
              {date}
            </span>
            <div className="event-description">
              {/* {event.description} */}
              {event.description.split("\n").map((i, key) => {
                return <p key={key}>{i}</p>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => {
  return { currentEvent: state.eventSection.eventToShow };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getEvent: bindActionCreators(getEvent, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EventDetails);
