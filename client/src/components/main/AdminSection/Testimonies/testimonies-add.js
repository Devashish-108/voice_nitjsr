import React, { useEffect, useReducer, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { convertFileToUrl } from "../../../../assets/lib/utils/utility";

import {
  addTestimonies,
  fetchTestimonies,
  resetAddTestimoniesState,
} from "./testimonies-action";
import { uploadImage } from "../../../../assets/lib/utils/uploadImage";
import Modal from "../../../../assets/lib/components/modal/modal";

import "./testimonies.css";

const testimoniesReducer = (state, action) => {
  switch (action.type) {
    case "name":
      return {
        ...state,
        name: action.value,
      };
    case "image":
      return {
        ...state,
        image: action.value,
      };
    case "work":
      return {
        ...state,
        work: action.value,
      };
    case "alumnus":
      return {
        ...state,
        alumnus: action.value,
      };
    case "title":
      return {
        ...state,
        title: action.value,
      };
    case "text":
      return {
        ...state,
        text: action.value,
      };
  }
};

const Testimonies = (props) => {
  const [ imagePath, setImagePath ] = useState('');
  const [testimoniesState, dispatch] = useReducer(testimoniesReducer, {
    name: "",
    image: "",
    work: "",
    alumnus: "",
    title: "",
    text: [],
  });

  const handleInput = (evt) => {
    const key = evt.target.name;
    let value = evt.target.value;

    if (key === "image") {
      value = evt.target.files[0];
      if (value) {
        setImagePath(convertFileToUrl(value));
      }
    }

    if (key === "text") {
      value = value.split("\n");
    }

    dispatch({ type: key, value });
  };

  const saveTestimonies = (err, url) => {
    if (url) {
      const payload = {
        ...testimoniesState,
        image: url,
      };

      props.addTestimonies(payload);
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    uploadImage(
      "testimonies",
      `${props.user.id}_${testimoniesState.name}_photo`,
      testimoniesState.image,
      saveTestimonies
    );
  };

  const handleModalClose = () => {
    props.resetAddTestimoniesState();
  };

  useEffect(() => {
    props.fetchTestimonies();
  }, []);

  // console.log(props.testimonies);
  // console.log(testimoniesState);
  return (
    <div className="testimonies--container">
      <img src=""></img>
      {props.testimoniesAdded && (
        <Modal open={props.testimoniesAdded} onClose={handleModalClose}>
          <p>
            Testimonies added for {testimoniesState.name}. Please wait for its
            approval!
          </p>
        </Modal>
      )}
      <form onSubmit={handleSubmit} className="testimonies--form">
        <label htmlFor="name">Name: </label>
        <input onChange={handleInput} name="name" type="text" required />
        <label htmlFor="image">Image: </label>
        <div style={{height:"150px"}}>
          <input onChange={handleInput} name="image" type="file" required />
          <img alt="Image Preview" className="testimony-add-image-preview" src={imagePath} />
        </div>
        <label htmlFor="work">Work: </label>
        <input onChange={handleInput} name="work" type="text" required />
        <label htmlFor="alumnus">Alumnus: </label>
        <input onChange={handleInput} name="alumnus" type="text" required />
        <label htmlFor="title">Title: </label>
        <input onChange={handleInput} name="title" type="text" required />
        <label htmlFor="text">Text: </label>
        <div>
          <textarea
            onChange={handleInput}
            name="text"
            type="textarea"
            required
          />
          <div>
            <p>
              <sup>**</sup>Please enter the text in the format (paragraph) you
              want to see in your testimony. You can also expand the text area
              by dragging the bottom right corner.{" "}
            </p>
          </div>
        </div>
        <input className="testimonies--submit" type="submit" value="Submit" />
      </form>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    addTestimonies: bindActionCreators(addTestimonies, dispatch),
    fetchTestimonies: bindActionCreators(fetchTestimonies, dispatch),
    resetAddTestimoniesState: bindActionCreators(
      resetAddTestimoniesState,
      dispatch
    ),
  };
}

const mapStateToProps = (state) => {
  return {
    user: state.profileSection.user,
    testimoniesAdded: state.testimoniesSection.testimoniesAdded,
    testimonies: state.testimoniesSection.testimonies,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Testimonies);
