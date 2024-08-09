import React from "react";
import { Spinner } from "react-bootstrap";
import "./loader.css";

const Loader = () => {
  return (
    <div className="spinner-container">
      <Spinner className="m-auto" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loader;
