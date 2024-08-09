import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signUp } from "./login-action";
import { bindActionCreators } from "redux";

class Register extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="">{error}</div>;
    }
  };
  renderInput = ({ input, type, label, meta }) => {
    if (input.name === "contact") {
      return (
        <>
          <input
            {...input}
            type={type}
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            placeholder={label}
            className="form-control mt-2"
          />
        </>
      );
    }
    if (input.name === "password") {
      return (
        <>
          <input
            {...input}
            type={type}
            required
            placeholder={label}
            className="form-control mt-2"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
          />
        </>
      );
    }
    return (
      <>
        <input
          {...input}
          type={type}
          required
          placeholder={label}
          className="form-control mt-2"
        />
        <div
          style={{
            color: "#fc6b5b",
            fontWeight: "bold",
            fontFamily: "'Quicksand', sans-serif",
          }}
        >
          {this.renderError(meta)}
        </div>
      </>
    );
  };
  onLoginSubmit = (values) => {
    this.props.signUpAction(values);
  };
  render() {
    return (
      <form
        className="auth-form"
        onSubmit={this.props.handleSubmit(this.onLoginSubmit)}
      >
        <Field
          name="name"
          type="text"
          component={this.renderInput}
          label="Name"
        />
        <Field
          name="email"
          type="email"
          component={this.renderInput}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={this.renderInput}
          label="Password"
        />
        <Field
          name="confirmPassword"
          type="password"
          component={this.renderInput}
          label="Confirm Password"
        />
        <Field
          name="contact"
          type="tel"
          component={this.renderInput}
          label="Contact Number"
        />

        <button className="btn btn-primary mt-2 mb-2 ps-5 pe-5">
          Register
        </button>
      </form>
    );
  }
}
const validate = (formValues) => {
  var errors = {};
  if (formValues.password !== formValues.confirmPassword) {
    errors.confirmPassword = "Passwords don't match";
  }

  return errors;
};

function mapStateToProps(state) {
  return {
    signUpState: state.form.signUpState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signUpAction: bindActionCreators(signUp, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "registerForm", validate })(Register));
