import React from "react";
import "./home.css";
import Welcome from "./Welcome.js";
import MainPanel from "./main-panel-component";
import "bootstrap/dist/css/bootstrap.min.css";
class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Welcome />
        <MainPanel />
      </React.Fragment>
    );
  }
}

export default Home;
