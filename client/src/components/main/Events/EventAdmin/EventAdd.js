import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { addEvent } from "./eventAdminActions";
import firebase from "../../../../fire";
import { convertFileToUrl } from "../../../../assets/lib/utils/utility";

class EventAdd extends React.Component {
  state = {
    imagePath: ''
  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      console.log(error);
      return <div className="">{error}</div>;
    }
  };

  onChange = (e) => {
    this.image = e.target.files[0];
    if (this.image) {
      this.setState({
        imagePath: convertFileToUrl(this.image)
      });
    }
  };

  renderInput = ({ input, label, meta, type }) => {
    if (type === "file") {
      return (
        <div style={{ display: "flex" }} className="mt-2 field-div">
          <strong className="me-2 addEventLabels">{label} </strong>
          <input
            required
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={this.onChange}
            className="form-control mt-2"
          />
        </div>
      );
    }
    if (type === "textarea") {
      return (
        <div style={{ display: "flex" }} className="mt-2 field-div">
          <strong className="me-2 addEventLabels">{label} </strong>
          <textarea {...input} type={type} className="form-control mt-2" />
          {this.renderError(meta)}
        </div>
      );
    }
    if (type === 'dropdown') {
      return (
        <div style={{ display: "flex" }} className="mt-2 field-div">
          <strong className="me-2 addEventLabels">{label} </strong>
          <select {...input} type={type} required={true} className="form-control mt-2" >
            <option value={''}>Select</option>
            <option value={'tier1'}>tier1</option>
            <option value={'tier2'}>tier2</option>
          </select>
          {this.renderError(meta)}
        </div>
      );
    }
    return (
      <div style={{ display: "flex" }} className="mt-2 field-div">
        <strong className="me-2 addEventLabels">{label} </strong>
        <input {...input} type={type} required className="form-control mt-2" />
        {this.renderError(meta)}
      </div>
    );
  };

  onAddEventSubmit = (values) => {
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
          .ref(`eventsPosters`)
          .child(values.title)
          .getDownloadURL()
          .then((url) => {
            values.imageUrl = url;
            values.imageName = values.title;

            this.props.addEvent("events", values);
          });
      }
    );
  };
  render() {
    return (
      <form
        id="addEventForm"
        onSubmit={this.props.handleSubmit(this.onAddEventSubmit)}
      >
        <Field
          name="image"
          type="file"
          component={this.renderInput}
          label="Poster"
        />
        <img
          alt="Poster Preview"
          className="event-add-image-preview"
          src={this.state.imagePath}
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
        <Field
          name="tier"
          type="dropdown"
          component={this.renderInput}
          label="Tier"
        />
        <button className="btn btn-primary" id="addEventSubmit">
          Submit
        </button>
      </form>
    );
  }
}
const validate = (formValues) => {
  // Rethink
  var errors = {};

  return errors;
};

export default connect(null, { addEvent })(
  reduxForm({ form: "addEventForm" }, validate)(EventAdd)
);

export { EventAdd };
