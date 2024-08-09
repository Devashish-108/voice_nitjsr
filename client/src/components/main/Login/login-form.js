import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "./login-action";
import "./login.css";
import { bindActionCreators } from "redux";

class Login extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      console.log(error);
      return <div className="">{error}</div>;
    }
  };
  renderInput = ({ input, label, meta }) => {
    return (
      <>
        <input
          {...input}
          type={input.name}
          required
          placeholder={label}
          className="form-control mt-2"
        />
        {this.renderError(meta)}
      </>
    );
  };
  onLoginSubmit = (values) => {
    this.props.logInAction(values);
  };
  render() {
    return (
      <form
        className="auth-form"
        onSubmit={this.props.handleSubmit(this.onLoginSubmit)}
      >
        <Field name="email" component={this.renderInput} label="Email" />
        <Field name="password" component={this.renderInput} label="Password" />
        <button className="btn btn-primary mt-2 mb-2 ps-5 pe-5">Submit</button>
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

function mapStateToProps(state) {
  return {
    loginState: state.form.loginState,
    auth: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logInAction: bindActionCreators(signIn, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "loginForm" }, validate)(Login));
