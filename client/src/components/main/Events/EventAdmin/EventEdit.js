import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  editEvent,
  changeEventView,
  getEventImages,
} from "./eventAdminActions";
import firebase from "../../../../fire";
import ImageCard from "./ImageCard";
const random = () => {
  var a = Math.floor(Math.random() * 10000);
  var b = Math.floor(Math.random() * 10000);

  return a * b;
};
class EventEdit extends React.Component {
  componentDidMount = () => {
    console.log("Loading Images in background..");
    this.props.getEventImages("events", this.props.eventId, "images");
  };
  renderError = ({ error, touched }) => {
    if (touched && error) {
      console.log(error);
      return <div className="">{error}</div>;
    }
  };

  onChange = (e) => {
    this.image = null;
    this.image = e.target.files[0];
    // console.log(this.image);
  };

  additionalImageUploadHandler = (e) => {
    var imageFlileToUpload = e.target.files[0];

    var filename = this.props.eventId + random();

    var DBcollection = `events/${this.props.eventId}/images`;

    const uploadTask = firebase
      .storage()
      .ref(`eventsPosters/${filename}`)
      .put(imageFlileToUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
        alert("Image Upload Failed!");
      },
      () => {
        firebase
          .storage()
          .ref("eventsPosters")
          .child(filename)
          .getDownloadURL()
          .then((url) => {
            var imageDetailsObject = { filename, url };

            firebase
              .firestore()
              .collection(DBcollection)
              .add(imageDetailsObject)
              .then(console.log("added successfully"));
          });
      }
    );
  };

  renderImages = () => {
    var images = this.props.images;
    if (images) {
      let keys = Object.keys(images);
      return keys.map((k) => (
        <ImageCard
          image={images[k]}
          collection={`events/${this.props.eventId}/images`}
        />
      ));
    }

    return null;
  };

  renderInput = ({ input, label, meta, type, name }) => {
    if (type === "file") {
      return (
        <div className="mt-2 field-div">
          <div style={{ display: "flex" }}>
            <div
              className="addEventLabels"
              style={{ display: "flex", alignItems: "center" }}
            >
              <strong className="me-2">{label} </strong>
            </div>
            <input
              type="file"
              accept=".jpg, .png, .jpeg"
              onChange={this.onChange}
              className="form-control mt-2 mb-2"
            />
          </div>
          <div className="d-flex justify-content-center">
            <img
              style={{ width: "50%", margin: "auto" }}
              src={this.props.initialValues.imageUrl}
              alt={this.props.initialValues.title}
            />
          </div>
        </div>
      );
    }
    if (type === "textarea") {
      return (
        <div style={{ display: "flex" }} className="mt-2 field-div">
          <strong className="me-2 addEventLabels">{label} </strong>
          <textarea
            {...input}
            type={type}
            className="form-control mt-2"
            style={{ height: "150px" }}
          />
          {this.renderError(meta)}
        </div>
      );
    }
    var jsx = (
      <input {...input} type={type} required className="form-control mt-2" />
    );

    if (input.name === "title") {
      jsx = (
        <input
          {...input}
          type={type}
          readOnly
          required
          className="form-control mt-2"
        />
      );
    }
    return (
      <div style={{ display: "flex" }} className="mt-2 field-div">
        <strong className="me-2 addEventLabels">{label} </strong>
        {jsx}
        {this.renderError(meta)}
      </div>
    );
  };

  onEditEventSubmit = (values) => {
    if (!this.image) {
      this.props.editEvent(this.props.eventId, values);
    } else {
      firebase
        .storage()
        .ref(`eventsPosters/${this.props.initialValues.imageName}`)
        .delete();

      const uploadTask = firebase
        .storage()
        .ref(`eventsPosters/${values.title}`)
        .put(this.image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref("eventsPosters")
            .child(values.title)
            .getDownloadURL()
            .then((url) => {
              values.imageUrl = url;
              values.imageName = values.title;

              this.props.editEvent(this.props.eventId, values);
            });
        }
      );
    }
  };
  render() {
    // Handling an unknown error
    if (!this.props.initialValues) {
      return <></>;
    }
    // Need to check what is exactly wrong

    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div id="extraImagesDiv">
          <input
            type="file"
            id="eventImg"
            onChange={this.additionalImageUploadHandler}
            accept=".png, .jpg, .jpeg"
          />
          <button><label htmlFor="eventImg">Upload new image</label></button>
        </div>
        <div
          id="multiImg"
          className="d-flex p-1"
          style={{ overflow: "scroll" }}
        >
          {this.renderImages()}
        </div>
        <form
          id="addEventForm"
          onSubmit={this.props.handleSubmit(this.onEditEventSubmit)}
        >
          <Field
            name="image"
            type="file"
            component={this.renderInput}
            label="Poster"
          />
          <Field
            name="title"
            type="text"
            component={this.renderInput}
            label="Title"
          />
          <Field
            name="date"
            type="date"
            component={this.renderInput}
            label="Date"
          />
          <Field
            name="description"
            type="textarea"
            component={this.renderInput}
            label="Description"
          />
          <button className="btn btn-primary" id="editEventSubmit">
            Submit
          </button>
          <p
            onClick={() => this.props.changeEventView("show")}
            className="btn btn-danger mt-1 EventCancel"
          >
            Cancel
          </p>
        </form>
      </div>
    );
  }
}
const validate = (formValues) => {
  // Rethink
  var errors = {};

  return errors;
};

const mapStateToProps = (state) => {
  var eventId = state.eventSection.eventToShow;
  var images = state.eventSection.images;
  return {
    eventId,
    images,
    initialValues: state.eventSection.events[eventId],
  };
};
const actionCreators = { editEvent, changeEventView, getEventImages };
export default connect(
  mapStateToProps,
  actionCreators
)(reduxForm({ form: "editEventForm" }, validate)(EventEdit));
