import React from "react";
import './location-component.css'

const LocationComponent = () => {
    return (
        <iframe
            className="right-panel-location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117715.88710829543!2d86.00525029726563!3d22.779424800000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e4b900ead741%3A0x9e8c390b8c8356e7!2sJP%20VOICE!5e0!3m2!1sen!2ssg!4v1688817280421!5m2!1sen!2ssg"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        />
    )
}

export default LocationComponent;