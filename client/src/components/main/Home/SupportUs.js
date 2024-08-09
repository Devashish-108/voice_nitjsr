import React from "react";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

class About extends React.Component {
  scrollTop = () => {
    window.scrollTo(0, 0);
  };
  render() {
    return (
      <div id="about" className="container">
        <h1 className="blueH1">Patron</h1>
        <p className="description text-center">
          You can Support Us by contributing through our different programs and donation schemes.
        </p>
        <Link to="/donations" className="donate-us" onClick={this.scrollTop}><strong>DONATE US <FaHeart style={{"fontSize": "20px", "marginInline": "5px"}}/> </strong></Link>
        <hr/>
      </div>
    );
  }
}

export default About;
