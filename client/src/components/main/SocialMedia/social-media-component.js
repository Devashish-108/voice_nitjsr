import React from "react";
import "./social-media-component.css";
import FacebookComponent from "../FacebookComponent/facebook-component";
import FlickrComponent from "../FlickrComponent/flickr-component";

const SocialMedia = () => {
  return (
    <div className="social-media-container">
      {/* <FacebookComponent /> */}
      <h1 id="galleries" className="blueH1 social-media-gallery-heading">Gallery</h1>
      <FlickrComponent />
      <hr/>
    </div>
  );
};

export default SocialMedia;
