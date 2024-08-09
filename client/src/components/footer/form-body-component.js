import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { submitQuery } from "./footer-actions";

class ContactFormBody extends React.Component {
  state = {
    queryStatus: null,
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
      </>
    );
  };
  onLoginSubmit = (values) => {
    this.props.submitQuery({
      ...values,
      date: { display: new Date().toLocaleString(), sort: Date.now() },
      status: "unresolved",
    });
  };

  componentWillReceiveProps(nextProps, prevState) {
    if (
      nextProps.queryStatus !== this.props.queryStatus &&
      nextProps.queryStatus === "successful"
    ) {
      this.props.handleClose();
    }
  }

  render() {
    return (
      <form
        className="contact-form"
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
          name="message"
          required
          className="form-control mt-2"
          component={"textarea"}
          placeholder="Your message here"
        />

        <button className="btn btn-primary mt-2 mb-2 ps-5 pe-5">Send</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    queryStatus: state.footerReducer.queryStatus,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitQuery: bindActionCreators(submitQuery, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ form: "contactForm" })(ContactFormBody));
