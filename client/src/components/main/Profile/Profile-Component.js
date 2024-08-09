import React from "react";
import { connect } from "react-redux";
import { loadUserData } from "./profile-action";
import { Spinner } from "react-bootstrap";
import "./profile.css";
import userAvtar from "../../../assets/img/user.svg";
import ProfileDetails from "./ProfileDetails";
import KeyValue from "./KeyValue";
import firebase from "../../../fire";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.uploadRef = React.createRef();
  }
  refresh = () => {
    this.props.loadUserData(this.props.auth.userId);
  };
  render() {
    if (!this.props.user) {
      this.props.loadUserData(this.props.auth.userId);
      return (
        <div
          className="d-flex align-items-center"
          style={{ width: "100vw", minHeight: "200px" }}
        >
          <Spinner className="m-auto" animation="grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      );
    }
    const { name, email, joined, profileImage } = this.props.user;
    const joinedElement = joined ? (
      <span className="text-center">Member since {joined}</span>
    ) : null;

    var image = null;
    var imageUrl = "";
    const uploadPic = (e) => {
      if (e.target.files[0]) {
        image = e.target.files[0];
        this.uploadRef.current.click();
      }
    };

    const resetPassword = () => {
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(function (d) {
          console.log(d);
          alert("Please check your mail for password reset link");
        });
    };

    const upload = () => {
      if (!image) {
        return;
      }

      var userId = this.props.auth.userId;

      if (profileImage) {
        firebase
          .storage()
          .ref(`profilePics/${profileImage.split("?alt")[0].split("%2F")[1]}`)
          .delete()
          .then(() => {});
      }

      const uploadTask = firebase
        .storage()
        .ref(`profilePics/${userId}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          firebase
            .storage()
            .ref("profilePics")
            .child(userId)
            .getDownloadURL()
            .then((url) => {
              imageUrl = url;

              var obj = {
                profileImage: url,
              };
              var userId = firebase.auth().currentUser.uid;

              firebase
                .firestore()
                .collection("users")
                .doc(userId)
                .update(obj)
                .then(this.refresh());
            });
        }
      );
    };

    return (
      <div id="profile-container">
        <div className="p-3 profile-summary">
          <div
            className="mb-2"
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt="user"
              id="profile-image"
              src={profileImage || userAvtar}
            />
            <div className="pic-input-div">
              <input
                className="pic-input"
                type="file"
                id="img"
                onChange={uploadPic}
                accept=".png, .jpg, .jpeg"
              />
              <label htmlFor="img">Upload new image</label>
            </div>
          </div>
          <button
            id="profile-image-upload-button"
            ref={this.uploadRef}
            className="btn btn-primary"
            onClick={upload}
          >
            Change Pic
          </button>
          <div className="text-center">
            <strong>{name}</strong>
          </div>
          {joinedElement}
          <button
            id="reset-password-btn"
            className="btn btn-primary"
            onClick={resetPassword}
          >
            Reset Password
          </button>
        </div>

        <div className="p-3 profile-details">
          <KeyValue keyy="Email" value={email} />

          <ProfileDetails user={this.props.user} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.profileSection.user };
};
export default connect(mapStateToProps, { loadUserData })(Profile);
