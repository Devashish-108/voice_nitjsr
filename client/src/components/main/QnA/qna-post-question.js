import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./qna-user-component.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { addQnA, resetQnaSuccess } from "./qna-actions";
import Modal from "../../../assets/lib/components/modal/modal";


import ModalSignIn from "./qna-modal";

function PostQuestion(props) {
  const [question, setQuestions] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const message = "Question posted. Wait for its approval to get it live!";

  const [show, setShow] = useState(false);

  const handleQuestion = (evt) => {
    const value = evt.target.value;

    setQuestions(value);
  };

  const handleAnonymous = (evt) => {
    setAnonymous(!anonymous);
  };

  const onHandleSubmit = () => {
    const user = props.user
    if (user) {
      const payload = {
        ans_auth: "",
        answer: "",
        author: props.user.name,
        question,
        status: "unapproved",
        timestamp: new Date(),
    };

      props.addQnA(payload);
    } else {
      setShow(true);
    }
  }

  const handleModalClose = () => {
    props.resetQnaSuccess();
  }

  useEffect(() => {
    return () => {
      props.resetQnaSuccess();
    };
  }, []);

  return (
    <div className="text-center">
      <p>
          You can post questions related to spirituality, yoga, philosophy of
          life, etc. Our members will answer your questions.
      </p>
      {props.successfulPost && <Modal open={props.successfulPost} onClose={handleModalClose}>
        <p>{message}</p>
      </Modal>}
      <span className="icon">
        <FontAwesomeIcon icon={faUser} size="2x" />
      </span>

      <form className="input">
        <input
          type="text"
          name="post-question"
          placeholder="post a question"
          className="textbox"
          onChange={handleQuestion}
          value={question}
        />
        <div className="item stay-a">
          <div className="checkbox-rect2">
            <input type="checkbox" checked={anonymous} id="checkbox-rect2" name="check" onChange={handleAnonymous} />
            <label htmlFor="checkbox-rect2">Stay Anonymous</label>
            <input onClick={onHandleSubmit} type="button" value="Post" className="button-54" />
          </div>
        </div>
      </form>
     {show  && <ModalSignIn show={show} setShow={setShow}/> }
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addQnA: bindActionCreators(addQnA, dispatch),
    resetQnaSuccess: bindActionCreators(resetQnaSuccess, dispatch),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.profileSection.user,
    successfulPost: state.qnas.successfulPost,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostQuestion);