import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Container } from "react-bootstrap";
import "./qna-user-component.css";
import { fetchQnAsList } from "./qna-actions";

function LatestQnAs(props) {
  useEffect(() => {
    props.getQnAs();
  }, []);
  console.log(props.qnas);
  return (
    <div>
      <p className="underline">Latest Q&As</p>
      {props.qnas.map((qna) => {
        const date = new Date(qna.timestamp.seconds * 1000).toDateString();

        return (
          qna.status === "approved" && (
            <div key={qna.id}>
              <p>
                By <b>{qna.author}</b> on {date}
              </p>
              <p className="question">Q. {qna.question}</p>
              {qna.answerBy && (
                <p>
                  A. By {qna.answerBy} prabhu: {qna.answer}
                </p>
              )}
              <br />
            </div>
          )
        );
      })}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    qnas: state.qnas.QnAs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getQnAs: bindActionCreators(fetchQnAsList, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LatestQnAs);
