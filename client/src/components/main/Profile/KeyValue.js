import React from "react";

class KeyValue extends React.Component {
  render() {
    return (
      <div className="mt-2 d-flex flex-wrap">
        <strong className="me-2" style={{ flex: "0 0 150px" }}>
          <div>{this.props.keyy}</div>
        </strong>
        {this.props.value}
      </div>
    );
  }
}

export default KeyValue;
