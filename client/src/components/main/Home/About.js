import React from "react";

class About extends React.Component {
  render() {
    return (
      <div id="about" className="container">
        <h1 className="blueH1">About VOICE</h1>
        <p className="description">
          'VOICE' Stands for Vedic Oasis for Inspiration, Culture and Education.
          It is aimed at offering services to the modern youth at NIT
          Jamshedpur, helping them become better human being.
          Every society needs role models which can be emulated by masses. 'NIT
          Jamshedpur VOICE' aims to nurture individuals who can excel in their
          personal and professional life. Such individuals will be leading by
           principle centered living.
          VOICE has centers all over India and has helped 10000+ youth gain
          spiritual wisdom through activities like mantra meditation, readings,
          classes, etc.
        </p>
        <div className="highlight">
          <h5 className="title"><strong>Our Goal</strong>:</h5>
          <h6 className="highlight-items">A stress-free, addiction–free student community @NIT Jamshedpur with high competence and wellness.</h6>
        </div>
          
        <div className="highlight">
          <h5 className="title"><strong>We Promote:</strong></h5>
          <h6 className="highlight-items">
            1. Vocational Training &
            <br/>
            Education
          </h6>
          <h6 className="highlight-items">
            2. Workshops & Outdoor
            <br/>
            Events
          </h6>
          <h6 className="highlight-items">
            3. Preventive Health Care
            <br/>
            De-Addiction
          </h6>
        </div>
        <hr/>
      </div>
    );
  }
}

export default About;
