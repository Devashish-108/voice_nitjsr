import React from "react";
import "./events.css";
import SubEvents from "./eventSection";
import "./tabs.css";

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "upcoming",
    };
  }

  render() {
    const handleTab1 = () => {
      // update the state to tab1
      this.setState({ activeTab: "upcoming" });
    };
    const handleTab2 = () => {
      // update the state to tab2
      this.setState({ activeTab: "past" });
    };

    return (
      <div>
        <h1 className="Subheading blueH1 text-center">Welcome to Events</h1>
        <div
          style={{ minHeight: "100vh" }}
          className="event-container p-0 m-1 Tabs"
        >
          {/* Tab nav */}
          <ul className="nav">
            <li
              className={this.state.activeTab === "upcoming" ? "active" : ""}
              onClick={handleTab1}
            >
              Upcoming/Ongoing Events
            </li>
            <li
              className={this.state.activeTab === "past" ? "active" : ""}
              onClick={handleTab2}
            >
              Past Events
            </li>
          </ul>
          <div className="outlet">
            {/* content will be shown here */}
            {this.state.activeTab === "upcoming" ? (
              <SubEvents type={"upcoming"} />
            ) : (
              <SubEvents type={"previous"} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
