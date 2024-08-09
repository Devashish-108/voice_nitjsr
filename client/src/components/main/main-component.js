import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./main.css";
import Header from "../header/header-component";
import Footer from "../footer/footer-component";
import Content from "../main-content/main-content-component";
import { BrowserRouter as Router } from "react-router-dom";
import { deleteAnonymousLoginUser } from "./Login/login-action";
import history from "../history";
import Headroom from 'react-headroom'

const Main = (props) => {
  const handleBeforeUnload = () => {
    props.deleteAnonymousLoginUser();
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <div className="main">
      <Router history={history}>
        <Headroom>
          <Header />
        </Headroom>
        <div className="middle-body">
          <Content/>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    deleteAnonymousLoginUser: bindActionCreators(
      deleteAnonymousLoginUser,
      dispatch
    ),
  };
}

export default connect(null, mapDispatchToProps)(Main);
