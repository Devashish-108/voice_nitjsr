import React from "react";
import About from "./About";
import Testimonies from "./Testimonies/Testimonies";
import Objectives from "./Objectives";
import SupportUs from "./SupportUs";
import SocialMedia from "../SocialMedia/social-media-component";
import DynamicContentComponent from "./Dynamic-Contents/dynamic-content-component";

const LeftPanel = () => {
  return (
    <div className="home-left-panel">
      <About />
      <SocialMedia />
      <Testimonies />
      <Objectives />
      <SupportUs />
      <DynamicContentComponent />
    </div>
  );
};

export default LeftPanel;
