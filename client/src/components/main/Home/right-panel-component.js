import React from "react";
import LatestEventsBlogs from "./events-blogs-component";
import Statistics from "./Statistics";
import './right-panel.css';
import LocationComponent from "./RightPanel/location-component";

const RightPanel = () => {
  return (
    <div className="home-right-panel">
      <LatestEventsBlogs />
      <Statistics />
      <LocationComponent/>
    </div>
  );
};

export default RightPanel;
