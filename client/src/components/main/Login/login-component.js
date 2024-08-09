import React, { useEffect } from "react";
import ModalMenu from "./ModalMenu";
import { Button } from "react-bootstrap";
import { changeShowAuthMenu } from "./login-action";
import { connect } from "react-redux";
import fire from "../../../fire";
import loginFactory from "../../../assets/lib/factories/login-factory";
import { initializeAuth, getAnonymousLoginData } from "./login-action";
import { fetchTestimonies } from "../AdminSection/Testimonies/testimonies-action";

const LoginComponent = (props) => {
  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (user && user.uid && user.email) {
        props.initializeAuth({
          userId: user.uid,
          isLoggedIn: true,
          email: user.email,
          isAnonymous: false,
        });
      } else if (user && user.isAnonymous) {
        props.initializeAuth({
          userId: null,
          isLoggedIn: true,
          email: null,
          isAnonymous: true,
        });
      } else {
        if (!loginFactory.get("isLoggingIn")) {
          props.initializeAuth({
            userId: null,
            isLoggedIn: false,
            email: null,
          });
          props.getAnonymousLoginData();
        }
      }
    });
  }, []);

  const handleShow = () => {
    props.changeShowAuthMenu();
  };

  return (
    <React.Fragment>
      <Button
        className="header-nav-link header-nav-button"
        variant="outline-primary"
        onClick={handleShow}
      >
        Login
      </Button>
      <ModalMenu />
    </React.Fragment>
  );
};

export default connect(null, {
  changeShowAuthMenu,
  initializeAuth,
  getAnonymousLoginData,
  fetchTestimonies,
})(LoginComponent);
