import React from "react";
import RightPanel from "./right-panel-component";
import LeftPanel from "./left-panel-component";

const MainPanel = () => {
  return (
    <div className="home-main-panel">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default MainPanel;
