import React from "react";
import "./facebook-component.css";

const FacebookComponent = () => {
  return (
    <div className="facebook-component">
      <div
        className="fb-page"
        data-href="https://www.facebook.com/profile.php?id=100088880980149"
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/profile.php?id=100088880980149"
          className="fb-xfbml-parse-ignore"
        >
          <a
            target="_top"
            href="https://www.facebook.com/profile.php?id=100088880980149"
          >
            Voice NIT Jamshedpur
          </a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookComponent;
