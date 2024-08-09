import React from "react";
import { Container } from "react-bootstrap";

class Under_construction extends React.Component {
  render() {
    return (
      <Container style={{ height: "50vh" }} className="pt-3">
        <h1 className="mb-3 mt-3 text-center blueH1">
          This page is under construction
        </h1>
        <p className="text-center">Please visit again</p>
      </Container>
    );
  }
}

export default Under_construction;
