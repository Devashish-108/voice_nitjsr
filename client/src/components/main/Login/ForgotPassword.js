import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { resetPassword } from "./login-action";

class ForgotPassword extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return <div className="">{error}</div>;
    }
  };

  renderInput = ({ input, type, label, meta }) => {
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
  onResetSubmit = (values) => {
    this.props.resetPassword(values);
    console.log(values);
  };
  render() {
    return (
      <form
        className="auth-form"
        onSubmit={this.props.handleSubmit(this.onResetSubmit)}
      >
        <Field
          name="email"
          type="email"
          component={this.renderInput}
          label="Email"
        />
        <br />
        <button className="btn btn-primary mt-2 mb-2 ps-5 pe-5">
          Reset Password
        </button>
      </form>
    );
  }
}
const validate = (formValues) => {
  var errors = {};
  if (formValues.email === "") {
    errors.email = "Please provide an email address";
  }

  return errors;
};
// const mapStateToProps = (state) => {
//     return {}
// }
export default connect(null, { resetPassword })(
  reduxForm({ form: "recoverPasswordForm", validate })(ForgotPassword)
);
