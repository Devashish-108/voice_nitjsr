import React from "react";
import "./header.css";
import logo from "../../assets/img/sl.png";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import Login from "../main/Login/login-component";
import { connect } from "react-redux";
import LoggedIn from "../main/Login/loggedIn-component";

class Header extends React.Component {
  componentDidMount = () => {
    //initial auth status
  };
  renderConditionalJSX = () => {
    if (this.props.auth.isLoggedIn && !this.props.auth.isAnonymous) {
      return <LoggedIn />;
    }
    return <Login />;
  };
  scrollTop = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <Navbar
        ref={this.navRef}
        collapseOnSelect
        expand="lg"
        className="header-navbar"
      >
        <Navbar.Brand>
          <Link className="header-logo" onClick={this.scrollTop} to="/">
            <img src={logo} alt="" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto me-5 pe-5">
            <Link className="header-nav-link" onClick={this.scrollTop} to="/">
              Home
            </Link>
            <Link className="header-nav-link" onClick={(e) => {
              e.preventDefault();
              window.location.replace('/#about');
            }}>
              About Us
            </Link>
            <Link className="header-nav-link" onClick={(e) => {
              e.preventDefault();
              window.location.replace('/#galleries');
            }}>
              Gallery
            </Link>
            <Link className="header-nav-link" onClick={(e) => {
              e.preventDefault();
              window.location.replace('/#testimonies');
            }}>
              Testimonies
            </Link>
            <Link className="header-nav-link" onClick={(e) => {
              e.preventDefault();
              window.location.replace('/#voice-objectives');
            }}>
              Objectives
            </Link>
            <Link className="header-nav-link" onClick={this.scrollTop} to="/events">
              Events
            </Link>
            <Link className="header-nav-link" onClick={this.scrollTop} to="/blogs">
              Blogs
            </Link>
            <Dropdown className="d-inline mx-2 header-nav-link">
              <Dropdown.Toggle as="a" id="dropdown-autoclose-true">
                Resources
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as="div">
                  <Link
                    className="dropdown-link"
                    onClick={this.scrollTop}
                    to="/under-construction"
                  >
                    DYS Course
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link
                    className="dropdown-link"
                    onClick={this.scrollTop}
                    to="/sq-form"
                  >
                    SQ form
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item as="div">
                  <Link
                    className="dropdown-link"
                    onClick={this.scrollTop}
                    to="/donations"
                  >
                    Donate
                  </Link>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item as="div">
                  <Link
                    className="dropdown-link"
                    onClick={this.scrollTop}
                    to="/qna-forum"
                  >
                    Q&amp;A Forum
                  </Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {this.renderConditionalJSX()}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
const mapStateToProps = (state) => {
  return { auth: state.auth };
};
export default connect(mapStateToProps)(Header);
