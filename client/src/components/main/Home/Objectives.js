import React from "react";
import './objectives.css';

class Objectives extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div id="voice-objectives">
          <h1 className="text-center mb-3 blueH1">Objectives</h1>
          {/* <p className="description"> */}
            { // This Comment should be preserved for future Use // 

            /* VOICE functions with 25 active members, with more than{" "}
            <strong>200 alumni, spread all over the world</strong>. We have a
            network of 150 colleges over India. Our college outreach activities
            like Prerna, DYS have helped us reach more than 500 students in NIT
            Jamshedpur.
            <br />
            <br />
            Through various initiatives, VOICE is offering services and creating
            opportunities for more than{" "}
            <strong>3000 students of NIT Jamshedpur</strong> , since the last 15
            years. VOICE is also working in collaboration with JNV School, Hatha
            for helping the students build up their bright future.
            <br />
            <br />
            In collaboration with{" "}
            <strong>
              <em>Dalma Hill Wild Life Sanctuary</em>
            </strong>
            , we are committed to offer Ever-Green experience to the interested
            students of NIT Jamshedpur, at the outset of Spring Semester every
            year.
            <br />
            <br />
            Every year VOICE is reaching out{" "}
            <strong>500-1000 Bhagavad Gita</strong> to the students and staffs
            of NIT Jamshedpur.
            <br />
            Members of VOICE have shown enthusiastic participation in
            propagating world's second largest chariot festival held in Kolkata. */}
          {/* </p> */}
          <ol className="gradient-list">
            <li>
              To help youth develop personality through timeless spiritual wisdom and remarkable experiences of spiritual scientists.
            </li>
            <li>
              To train the participants in soft skills such as GDs, public speaking, leadership and public appearance.
            </li>
            <li>
              To bring out the hidden potential in an individual like self-confidence, motivation and concentration
            </li>
            <li>
              To create a class of youth having unique blend of high character and competence
            </li>
            <li>
              To create student community for counseling and growth in self-excellence skills as well as morality
            </li>
            <li>
              To train youth in balancing personal vs professional life and work vs entertainment
            </li>
            <li>
              To save youth from self-destructive habits/ addictions, energy wasters detrimental to one’s body, mind and soul
            </li>
            <li>
              To train students in interpersonal dealings that enforces a healthy team spirit within
            </li>
            
          </ol>
        </div>
        <hr/>
      </React.Fragment>
    );
  }
}

export default Objectives;
