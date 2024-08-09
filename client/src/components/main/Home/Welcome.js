import React from "react";
import Image from "../../../assets/img/welcome-dynamic-images/wm4.jpg";
import logo from "../../../assets/img/shortcut-logo.png";
import "./welcome.css";
import WelcomeImages from "./Welcome-Images/welcome-images-component";

class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <div id="intro">
          <p className="welcome-title brand" style={{ fontsize: "150px" }}>
            <img className="slider-logo" src={logo} alt="Voice Logo" />
            VOICE
          </p>
          <p className="welcome-title">NIT Jamshedpur</p>
          <div id="welcome-overlapper">
            <p>Reviving Love, Rekindling Wisdom</p>
          </div>
          <blockquote>
            <strong>OUR MOTIVATION</strong>
            <br/>
            "In order to create a generation of young Indians equipped to take on future challenges and achieve their full potential, it is necessary that the youth are in good health and make healthy and balanced lifestyle choices. Youth specific health issues must be addressed through targeted programmes. Balanced nutrition and healthy lifestyle information must be provided to the youth. ….. There is also need to create awareness among the youth about ill-effects of drug/ substance abuse. …. It is also important to develop inner values like compassion, kindness, sympathy and empathy. There is also a serious need to inculcate the spirit of integrity and truthfulness in the youth."
            <span>- National Youth Policy (Current Policies & Future Imperatives – Priority Areas 4 & 6)</span>
          </blockquote>
        </div>
        <div className="welcome-slider">
          <WelcomeImages />
        </div>
      </div>
    );
  }
}

export default Welcome;
