import React from "react";
import "./flickr-component.css";

const FlickrComponent = () => {
  return (
    <div className="flickr-component-container">
      <a
        data-flickr-embed="true"
        href="https://www.flickr.com/photos/197427887@N08/albums/72177720307163082"
        title="Impression Fest 2023"
      >
        <img
          src="https://live.staticflickr.com/65535/52785366339_d822bb9e76_z.jpg"
          width="526"
          height="375"
          alt="Tapas Sapat 2022"
        />
      </a>
      <a
        data-flickr-embed="true"
        href="https://www.flickr.com/photos/197427887@N08/albums/72177720305074622"
        title="Book Distribution @Schools"
      >
        <img
          src="https://live.staticflickr.com/65535/52614036337_e0a84543c4_z.jpg"
          width="526"
          height="375"
          alt="Book Distribution @Schools"
        />
      </a>
    </div>
  );
};

export default FlickrComponent;
