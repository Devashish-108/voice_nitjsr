import { Dropdown, Spinner } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import avatar from "../../../assets/img/user.svg";
import { signOut } from "./login-action";
import logoutImage from "../../../assets/img/logout.svg";
import fire from "../../../fire";
import history from "../../history";
import { loadUserData } from "../Profile/profile-action";

class LoggedIn extends React.Component {
  onLogoutClick = () => {
    fire.auth().signOut();
    this.props.signOut();
    history.push("/");
  };

  scrollTop = () => {
    window.scrollTo(0, 0);
  };
  
  render() {
    if (this.props.auth.isLoggedIn && !this.props.auth.isAnonymous) {
      if (!this.props.user) {
        this.props.loadUserData(this.props.auth.userId);
        return <Spinner />;
      }
      const userProfile = this.props.user.profileImage
      const firstName = this.props.user.name.split(' ')[0]
      let adminSectionRoute = null;
      if (this.props.user && this.props.user.userType === "admin") {
        adminSectionRoute = (
          <Link
            className="dropdown-link p-1"
            onClick={this.scrollTop}
            to="/admin-section"
          >
            Admin Section
          </Link>
        );
      }
      return (
        <>
          <Dropdown className="d-inline mx-2 header-nav-link">
            <Dropdown.Toggle as="a" id="dropdown-autoclose-true">
              <img className="profile-img" alt="user-menu" src={userProfile || avatar} />
            </Dropdown.Toggle>
            <Dropdown.Menu className="login-dropdown">
              <Dropdown.ItemText>User: {firstName}</Dropdown.ItemText>
              <Dropdown.Divider />
              <Dropdown.Item as="div">
                <Link
                  className="dropdown-link"
                  onClick={this.scrollTop}
                  to="/user/profile"
                >
                  My Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Item as="div">{adminSectionRoute}</Dropdown.Item>
              {/* <Dropdown.Divider /> */}
              <Dropdown.Item as="div" id="logout-btn-div">
                <a
                  className="m-1 btn btn-danger"
                  onClick={this.onLogoutClick}
                >
                  <img style={{ maxWidth: "20px" }} src={logoutImage} alt="" />
                  Logout
                </a>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth, user: state.profileSection.user };
};
export default connect(mapStateToProps, { signOut, loadUserData })(LoggedIn);
