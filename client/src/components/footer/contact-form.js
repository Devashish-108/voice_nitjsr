import React from "react";
import { Modal } from "react-bootstrap";
import logo from "../../assets/img/sl.png";
import ContactFormBody from "./form-body-component";
import { MdChat } from "react-icons/md";

class ContactForm extends React.Component {
  state = { show: false };

  handleShow = () => this.setState({ show: true });
  handleClose = () => this.setState({ show: false });

  render() {
    return (
      <React.Fragment>
        <a href="#/" className="linkWrappedWithText" style={{ cursor: "pointer" }} onClick={this.handleShow}>
          <MdChat/> Send Message
        </a>

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="blueH1">
              <img
                style={{ width: "50px", margin: "0 10px" }}
                src={logo}
                alt="logo"
              />
              Send us a message
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <ContactFormBody handleClose={this.handleClose} />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ContactForm;
