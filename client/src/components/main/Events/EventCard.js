import React from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import trashBin from "../../../assets/img/trash.svg";
import editIcon from "../../../assets/img/editt.svg";
import viewIcon from "../../../assets/img/view.svg";
import { deleteEvent, showSelectedEvent } from "./EventAdmin/eventAdminActions";
import firebase from "../../../fire";
import { Link } from "react-router-dom";
import moment from "moment";
import Modal from "../../../assets/lib/components/modal/modal";

class EventCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      selectedEvent: ''
    };
  }

  deleteEventModal = () => { this.setState({ isModalOpen: true }) };
  onModalClose = () => { this.setState({ isModalOpen: false }) };

  renderDeleteButton = (q) => {
    return (
      <button
        style={{ fontSize: "inherit" }}
        className="btn btn-outline-danger qna-button"
        onClick={() => {
          console.log("delete image first");
          firebase
            .storage()
            .ref(`eventsPosters/${this.props.event.imageName}`)
            .delete()
            .then(() => {
              console.log("now delete event");
              this.props.deleteEvent("events", this.props.event.id);
            });
          this.onModalClose();
        }}
      >
        Delete
      </button>
    );
  };
  renderCloseButton = () => {
    return (
      <div className="me-4">
        <button
          style={{ fontSize: "inherit" }}
          className="btn btn-outline-success qna-button"
          onClick={() => setTimeout(this.onModalClose, 400)}
        >
          Cancel
        </button>
      </div>
    );
  };


  renderModelUI = () => {
    return (
      <div>
        <div>
          <h1 style={{ color: "#131e30" }}>Events</h1>
        </div>
        <div>
          <span className="qna-details-title">
            Are you sure you want to delete this Event ?
          </span>
        </div>
        <div>
          <span className="qna-details-title">Event : </span>
          {this.props.event.title}
        </div>
        <div className="qna-details-2button">
          {this.renderCloseButton()}
          {this.renderDeleteButton()}
        </div>
      </div>
    );
  };



  render() {
    const event = this.props.event;
    return (
      <div
        className="event-card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          boxShadow: "0px 1px 7px #023047",
          marginBottom: "15px"
        }}
      >
        <div
          className="mb-2 me-2"
          style={{ padding: "6px" }}
        >
          <strong>{this.props.event.title}</strong>
        </div>
        <div className="event-controls">
          <Link to={{ pathname: `/events/${event.id}`, event }}>
            <Button style={{ width: "35px" }} className="me-2 p-1 pt-0">
              <img style={{ width: "16px" }} src={viewIcon} alt="show" />
            </Button>
          </Link>
          <Button
            onClick={() =>
              this.props.showSelectedEvent("edit", this.props.event.id)
            }
            style={{ width: "35px" }}
            className="btn-warning me-2 p-1 pt-0"
          >
            <img style={{ width: "16px" }} src={editIcon} alt="edit" />
          </Button>
          <Button
            onClick={this.deleteEventModal}
            style={{ width: "35px" }}
            className="btn-danger p-1 pt-0"
          >
            <img style={{ width: "16px" }} src={trashBin} alt="delete" />
          </Button>
        </div>
        <Modal open={this.state.isModalOpen} onClose={this.onModalClose}>
          <div className="qna-details-container">{this.renderModelUI()}</div>
        </Modal>
      </div>
    );
  }
}

class EventCardMain extends React.Component {
  render() {
    const { event, type } = this.props;
    const { title, imageUrl, id } = event;
    const date = moment(new Date(event.date)).format("DD-MMM-yyyy");
    return (
      <>
        {type == "full" ? (
          // Upcoming Event Card will show image: type = "full"
          <div className="main-event-card">
            <img src={imageUrl} alt={title} />
            <div>
              <p className="h4 text-center">{title}</p>
              <p className="h5 text-center">{date}</p>
              <Link to={{ pathname: `/events/${id}`, event }}>
                <button className="m-3 mt-1">Details</button>
              </Link>
            </div>
          </div>
        ) : (
          // else 
          // while Previous Event Card won't show image: type = "partial"
          <div className="card" style={{width: "60vw"}}>
            <h4 className="card__title">{title}</h4>
            <h6 className="card__title">{date}</h6>
            <Link
              to={{ pathname: `/events/${id}`, event }}
              className="card__apply"
            >
              <button className="card__link">Details</button>
            </Link>
          </div>
        )}
      </>
    );
  }
}

export { EventCardMain };
export default connect(null, { deleteEvent, showSelectedEvent })(EventCard);
