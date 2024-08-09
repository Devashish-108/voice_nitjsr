import React from "react";
import "./sq.css";

class SQ extends React.Component {
  render() {
    return (
      <div className="sq_redirect">
        <div className="sq-child">
          <h1 style={{ color: "rgb(240, 246, 252)" }}>
            Spiritual Quotient Assesment
          </h1>
          <a
            id="goto"
            rel="noreferrer"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSdmUnNPADXS9Zilam2jlDB56EqYSzCkFareMF2DfYkU7W08qw/viewform"
          >
            Go To Test
          </a>
        </div>
      </div>
    );
  }
}

export default SQ;
