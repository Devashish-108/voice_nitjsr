import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { updateProfile } from "./profile-action";

class EditProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.counsellors = [
      "H.G. Raj Gopinath Prabhu",
      "H.G. Ram Raghav Prabhu",
      "H.G. Shyam Murari Prabhu",
      "H.G. Ananat Gaur Sundar Prabhu",
      "H.G. Prem Svaroop Prabhu",
      "H.G. Mukund Kirtan Prabhu",
      "H.G. Naam Prem Prabhu",
      "H.G. Nimai Anand Prabhu",
      "Others",
    ];
  }
  renderError = ({ error, touched }) => {
    if (touched && error) {
      console.log(error);
      return <div className="">{error}</div>;
    }
  };
  renderInput = ({ input, label, meta }) => {
    if (input.name === "counsellorName") {
      var jsx = this.counsellors.map((c) => {
        return <option value={c}>{c}</option>;
      });
      return (
        <div className="mt-2 d-flex editProfileFormDivs">
          <strong className="me-2 strong-label">{label} </strong>

          <select
            defaultValue={this.props.initialValues.counsellorName}
            {...input}
            type="select"
            required
            className="form-select mt-2"
          >
            {jsx}
          </select>
        </div>
      );
    }
    return (
      <div className="mt-2 d-flex editProfileFormDivs">
        <strong className="me-2 strong-label">{label} </strong>
        <input
          {...input}
          type={input.name === "dateOfBirth" ? "date" : "text"}
          required
          className="form-control mt-2"
        />
        {this.renderError(meta)}
      </div>
    );
  };

  onEditProfileSubmit = (values) => {
    this.props.updateProfile(this.props.userId, values);
  };

  render() {
    return (
      <form
        id="editProfileForm"
        onSubmit={this.props.handleSubmit(this.onEditProfileSubmit)}
      >
        <Field name="contact" component={this.renderInput} label="Contact" />
        <Field
          name="yearOfPassing"
          component={this.renderInput}
          label="Year of passing"
        />

        <Field
          name="dateOfBirth"
          component={this.renderInput}
          label="Date of birth"
        />
        <Field
          name="counsellorName"
          component={this.renderInput}
          label="Counsellor"
        />
        <Field
          name="currentJob"
          component={this.renderInput}
          label="Current Job"
        />
        <Field
          name="currentJobRole"
          component={this.renderInput}
          label="Designation"
        />
        <Field name="address" component={this.renderInput} label="Address" />
        <Field name="gotra" component={this.renderInput} label="Gotra" />

        <button
          style={{ width: "60%", margin: "auto" }}
          className="btn btn-primary mt-3 mb-2"
        >
          Submit
        </button>
      </form>
    );
  }
}
const validate = (formValues) => {
  // Rethink
  var errors = {};
  // if(!formValues.email){
  //     errors.email = 'Enter appropriate email'
  // }
  // if(!formValues.password){
  //     errors.password = 'Enter valid password'
  // }
  return errors;
};
const mapStateToProps = (state) => {
  var user = state.profileSection.user;
  return {
    userId: state.auth.userId,
    initialValues: {
      ...user,
    },
  };
};
export default connect(mapStateToProps, { updateProfile })(
  reduxForm({ form: "editProfileForm" }, validate)(EditProfileForm)
);
