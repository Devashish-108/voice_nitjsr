import React from "react";
import PostQuestion from "./qna-post-question";
import LatestQnAs from "./latest-qna";
import "../../main/Events/tabs.css";
import "./qna-user-component.css"

const QnaUserComponent = () => {
  return (
    <div>
      <h1 className="Subheading mb-3 text-center blueH1">
        Welcome to the Q&A Forum
      </h1>
      <div className="qna-content-container">
        <PostQuestion />
        <br />
        <LatestQnAs />
      </div>
    </div>
  );
};

export default QnaUserComponent;
