import React from "react";
import "./user-details.css";
import userAvtar from "../../../../../../assets/img/user.svg";
import { render } from "@testing-library/react";
import { updateUserType } from "../user-list-actions";
import { connect } from "react-redux";

class UserDetails extends React.Component {
  changeUserType = (e) => {
    var userType = e.target.value;
    var id = this.props.data.id;

    this.props.updateUserType({ id, userType });
  };

  render() {
    const {
      name,
      joined,
      userType,
      profileImage,
      address,
      pincode,
      mobile,
      gotra,
      batch,
      wifeName,
      fatherName,
      motherName,
      contact,
      contact2,
      initiatedName,
      whatsapp,
      gradYear,
      dateOfBirth,
      counsellorName,
      currentJob,
      currentJobRole,
      email,
    } = this.props.data;
    const joinedElement = joined ? (
      <span className="text-center">Member since {joined}</span>
    ) : null;

    const selectUserType = () => {
      if (this.props.user === this.props.data.id) {
        return <div>{userType}</div>;
      }
      var userTypes = ["visitor", "inmate", "admin"];
      var jsx = userTypes.map((c) => {
        return (
          <option key={c} value={c}>
            {c}
          </option>
        );
      });

      return (
        <div>
          <select
            onChange={this.changeUserType}
            defaultValue={userType}
            style={{ fontSize: "inherit" }}
            className="form-select"
          >
            {jsx}
          </select>
        </div>
      );
    };

    return (
      <div className="user-details-parent-container">
        <div
          style={{ height: "90vh", paddingBottom: "10px", maxWidth: "500px" }}
          className="user-details-info-container"
        >
          <div className="user-details-header">
            <span
              className="user-details-close"
              onClick={this.props.onModalClose}
            >
              <span>&times;</span>
            </span>
          </div>
          <div className="user-info-content">
            <div>
              <img
                id="profile-image"
                src={profileImage || userAvtar}
                alt="user"
              />
            </div>
            <div>
              <strong>{name}</strong>
            </div>
            {initiatedName ? (
              <div>
                <strong>Inititated Name:</strong>
                {initiatedName}
              </div>
            ) : null}
            {joinedElement}
            <div style={{ overflowY: "scroll", width: "90%", margin: "auto" }}>
              <div className="d-flex align-items-center">
                <span className="me-2">User Type: </span> {selectUserType()}
              </div>
              <div>
                <strong>Email:</strong> {email}
              </div>
              {batch ? (
                <div>
                  <strong>Batch:</strong> {batch}{" "}
                </div>
              ) : null}
              {dateOfBirth ? (
                <div>
                  <strong>D.O.B:</strong> {dateOfBirth}{" "}
                </div>
              ) : null}
              {mobile ? (
                <div>
                  <strong>Mobile:</strong> {mobile}{" "}
                </div>
              ) : null}
              {whatsapp ? (
                <div>
                  <strong>Whatsapp:</strong> {whatsapp}{" "}
                </div>
              ) : null}
              {contact ? (
                <div>
                  <strong>Contact:</strong> {contact}{" "}
                </div>
              ) : null}
              {currentJob ? (
                <div>
                  <strong>Current Job:</strong> {currentJob}
                </div>
              ) : null}
              {currentJobRole ? (
                <div>
                  <strong>Designation:</strong> {currentJobRole}
                </div>
              ) : null}
              {fatherName ? (
                <div>
                  <strong>Father:</strong> {fatherName}
                </div>
              ) : null}
              {motherName ? (
                <div>
                  <strong>Mother:</strong> {motherName}
                </div>
              ) : null}
              {wifeName ? (
                <div>
                  <strong>Wife:</strong> {wifeName}
                </div>
              ) : null}
              {counsellorName ? (
                <div>
                  <strong>Counsellor:</strong> {counsellorName}{" "}
                </div>
              ) : null}
              {gradYear ? (
                <div>
                  <strong>Graduation Year:</strong> {gradYear}{" "}
                </div>
              ) : null}
              {address ? (
                <div>
                  <strong>Address:</strong> {address}{" "}
                </div>
              ) : null}
              {gotra ? (
                <div>
                  <strong>Gotra:</strong> {gotra}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.userId,
  };
};

export default connect(mapStateToProps, { updateUserType })(UserDetails);
