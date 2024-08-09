import React from "react";
import "./footer.css";
import logo from "../../assets/img/voice_logo.png";
import { Link } from "react-router-dom";
import ContactForm from "./contact-form";
import { connect } from "react-redux";
import { MdEmail, MdLocationPin } from "react-icons/md";

class Footer extends React.Component {
  scrollTop = () => {
    window.scrollTo(0, 0);
  };
  render() {
    let RSjsx = null;
    if (this.props.user && this.props.userType !== "visitor") {
      RSjsx = (
        <li>
          <a href="https://radheshyamdas.com/" rel="noreferrer" target="_blank">
            Radheshyam Das Official
          </a><br/>
          <a href="https://meet.google.com/nob-axmb-ghz" rel="noreferrer" target="_blank">
            Online Chanting Session 
          </a>
        </li>
      );
    }
    return (
      <div id="footer">
        <div id="footer-logo" className="footer-column">
          <div>
            <Link onClick={this.scrollTop} to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div id="Copyright">
            © Copyright {new Date().getFullYear()} NIT Jamshedpur Voice
          </div>
        </div>
        <div id="footer-resources" className="footer-column">
          <h5>Resources</h5>
          <ul>
            <li>
              <Link onClick={this.scrollTop} to="/under-construction">
                Blog
              </Link>
            </li>
            <li>
              <Link onClick={this.scrollTop} to="/under-construction">
                Books
              </Link>
            </li>
            <li>
              <Link onClick={this.scrollTop} to="/qna-forum">
                Q&amp;A Forum
              </Link>
            </li>

            <li>
              <Link onClick={this.scrollTop} to="/under-construction">
                Members Zone
              </Link>
            </li>
          </ul>
        </div>
        <div id="footer-links" className="footer-column">
          <h5>Links &amp; Courses</h5>
          <ul>
            <li>
              <Link onClick={this.scrollTop} to="/under-construction">
                DYS Course
              </Link>
            </li>
            <li>
              <Link onClick={this.scrollTop} to="/sq-form">
                Spiritual Quotient Form
              </Link>
            </li>
            {RSjsx}
          </ul>
        </div>
        <div id="footer-helpus" className="footer-column">
          <h5>Support Us</h5>
          <ul>
            <li>
              <a href="/donations">Donate</a>
            </li>
          </ul>
        </div>
        <div id="footer-helpus" className="footer-column">
          <h5>Contact Us</h5>
          <ul>
            <li>
              <MdEmail /> voice.nitjsr@gmail.com
            </li>
            <li>
              <MdLocationPin/> Adityapur, Jamshedpur
            </li>
            <li style={{"marginTop": "15px"}}>
              <ContactForm />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.profileSection.user,
  };
};
export default connect(mapStateToProps, {})(Footer);
