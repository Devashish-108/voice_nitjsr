import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { deleteImage } from "./eventAdminActions";
class ImageCard extends React.Component {
  deleteImage = () => {
    var { filename, id } = this.props.image;
    var dbcollection = this.props.collection;

    this.props.deleteImage(filename, dbcollection, id);
  };
  render() {
    return (
      <div
        style={{
          width: "200px",
          margin: "2px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "100%", margin: "2px" }}
          src={this.props.image.url}
          alt={this.props.image.filename}
        />
        <Button onClick={this.deleteImage} className="btn-danger">
          {" "}
          Delete{" "}
        </Button>
      </div>
    );
  }
}

export default connect(null, { deleteImage })(ImageCard);
