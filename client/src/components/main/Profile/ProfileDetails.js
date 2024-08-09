import React from "react";
import { Button } from "react-bootstrap";
import KeyValue from "./KeyValue";
import { connect } from "react-redux";
import { editMenuShowAction } from "./profile-action";
import EditProfileForm from "./EditProfileForm";

class ProfileDetails extends React.Component {
  constructor(props) {
    super(props);
    this.props.editMenuShowAction(false);
  }
  render() {
    const {
      initiatedName,
      contact,
      yearOfPassing,
      dateOfBirth,
      currentJob,
      currentJobRole,
    } = this.props.user;

    const yop = yearOfPassing ? (
      <KeyValue keyy="Year of Passing" value={yearOfPassing} />
    ) : null;
    const dob = dateOfBirth ? (
      <KeyValue keyy="Date of Birth" value={dateOfBirth} />
    ) : null;
    const iname = initiatedName ? (
      <KeyValue keyy="Initiated Name" value={initiatedName} />
    ) : null;
    const currJob = currentJob ? (
      <KeyValue keyy="Current Job" value={currentJob} />
    ) : null;
    const desig = currentJobRole ? (
      <KeyValue keyy="Designation" value={currentJobRole} />
    ) : null;

    var btnJsx = !this.props.show ? (
      <Button
        onClick={() => this.props.editMenuShowAction(true)}
        className="edit-profile-button"
      >
        Edit Profile
      </Button>
    ) : (
      <Button
        style={{ width: "60%", margin: "auto" }}
        onClick={() => this.props.editMenuShowAction(false)}
        className="btn-danger w-60 m-auto mt-3 mb-2"
      >
        Cancel
      </Button>
    );

    var mainJSX = !this.props.show ? (
      <div style={{ position: "relative", top: "0", width: "100%" }}>
        <KeyValue keyy="Contact" value={contact} />
        {iname}
        {dob}
        {yop}
        {currJob}
        {desig}
      </div>
    ) : (
      <EditProfileForm />
    );
    return (
      <div id="details-container">
        {mainJSX}

        {btnJsx}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { show: state.profileSection.showEditMenu };
};
export default connect(mapStateToProps, { editMenuShowAction })(ProfileDetails);
