import React, { useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchTestimonies } from "../../AdminSection/Testimonies/testimonies-action";

import { Carousel } from "react-bootstrap";
import "./testimonies.css";
import Loader from "../../../../assets/lib/components/loader/loader";

const Testimonies = (props) => {
  useEffect(() => {
    if (props.isLoggedIn) {
      props.fetchTestimonies();
    }
  }, [props.isLoggedIn]);

  var jsx = props.testimonies
    .filter((tstm) => tstm.isVerified)
    .map((person) => {
      var IMG = person.image;
      var sentences = person.text.map((s, i) => {
        return (
          <React.Fragment key={i}>
            {s}
            <br />
          </React.Fragment>
        );
      });
      return (
        <Carousel.Item key={person.name} className="p-3">
          <div className="testimony-item">
            <img src={IMG} alt={person.name} />
            <p className="mt-2">
              <strong>{person.name}</strong>, <em>{person.work}</em>
            </p>
            <em className="mb-2">{person.alumnus}</em>
            <p className="testimony-title">
              <strong>"{person.title}"</strong>
            </p>
            <p>{sentences}</p>
          </div>
        </Carousel.Item>
      );
    });
  return (
    <div id="testimonies">
      <h1 className="blueH1 testimonies-heading">Testimonies</h1>
      {!props.testimonies.length && <Loader />}
      {!!props.testimonies.length && (
        <Carousel
          className="testimonies-carousel"
          variant="dark"
          indicators={false}
        >
          {jsx}
        </Carousel>
      )}
      <hr/>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    testimonies: state.testimoniesSection.testimonies,
    testimoniesAdded: state.testimoniesSection.testimoniesAdded,
    isLoggedIn: state.auth.isLoggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTestimonies: bindActionCreators(fetchTestimonies, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Testimonies);
