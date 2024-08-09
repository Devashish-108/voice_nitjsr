import React from "react";
import Login from "./login-form";
import Register from "./register-form";
import { connect } from "react-redux";
import {
  changeShowAuthMenu,
  changeAuthMenuView,
  closeAuthMenu,
} from "./login-action";
import { Modal, Alert } from "react-bootstrap";
import logo from "../../../assets/img/sl.png";
import ForgotPassword from "./ForgotPassword";

class ModalMenu extends React.Component {
  renderError = (message) => {
    if (message) {
      if (typeof message === "object") {
        return <Alert variant="success">{message.msg}</Alert>;
      }
      return <Alert variant="danger">{message}</Alert>;
    }
    return null;
  };
  handleClose = () => {
    this.props.closeAuthMenu();
  };
  onTypeChange = (e) => {
    e.preventDefault();
    if (this.props.view.show === "login") {
      this.props.changeAuthMenuView("register");
    } else {
      this.props.changeAuthMenuView("login");
    }
  };

  forgotPasswordCliked = (e) => {
    e.preventDefault();
    this.props.changeAuthMenuView("forgot");
  };

  render() {
    var text =
      this.props.view.show === "login"
        ? "Not registered with us? "
        : this.props.view.show === "forgot"
        ? ""
        : "Already registered? ";
    var aText =
      this.props.view.show === "login" ? "Register Here" : "Back to login";
    var clickHandler = (
      <a
        style={{ cursor: "pointer", color: "#3f6cb5" }}
        onClick={this.onTypeChange}
      >
        {aText}
      </a>
    );
    var conditionalJSX = (
      <label>
        {text} {clickHandler}
      </label>
    );

    var forgotPassword = (
      <div style={{}}>
        Forgot Password?{" "}
        <a
          style={{ cursor: "pointer", color: "#3f6cb5" }}
          onClick={this.forgotPasswordCliked}
        >
          Click to recover
        </a>
      </div>
    );
    return (
      <Modal
        show={this.props.showAuthMenu}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="blueH1">
            <img
              style={{ width: "50px", margin: "0 10px" }}
              alt="Voice"
              src={logo}
            />
            {this.props.view.show === "login"
              ? "Login"
              : this.props.view.show === "forgot"
              ? "Recover Password"
              : "Register"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {this.renderError(this.props.message)}
          {this.props.view.show === "login" ? (
            <Login />
          ) : this.props.view.show === "forgot" ? (
            <ForgotPassword />
          ) : (
            <Register />
          )}
          {this.props.view.show === "login" ? forgotPassword : null}
          <label>{conditionalJSX}</label>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    showAuthMenu: state.auth.showAuthMenu,
    view: state.view,
  };
};
export default connect(mapStateToProps, {
  changeShowAuthMenu,
  changeAuthMenuView,
  closeAuthMenu,
})(ModalMenu);
