import React, { useEffect, useState } from "react";

const counter = (callback = ()=>{}, initialCount = 0, interval = 1000, loopCount = 0)=>{
    let count = initialCount;
    let intervalFunc = null;

    return () => {
        if(intervalFunc) {
            clearInterval(intervalFunc);
        }
        // To rectify incorrect initialCount
        if (loopCount > 0 && count>loopCount) {
            count = 0;
        }
        // For Immediate call as setInterval don't fire immediately it fires for the first time only after the first interval
        callback(count);
        count++;
        intervalFunc = setInterval(() => {
            if(loopCount > 0 && count > loopCount) {
                count = 0;
            }
            callback(count);
            count++;
        }, interval);

        return intervalFunc;
    }
}

const DynamicImages = (props) => {
    const { images = [], interval = 1000, position = 0, styles = {} } = props;
    const [imagePosition, setImagePosition] = useState(position);

    useEffect(()=>{
        const imageCounter = counter(setImagePosition, position, interval, images.length -1)();

        return () => {
            if (imageCounter) {
                clearInterval(imageCounter);
            }
        }
    },[]);

    const url = images[imagePosition] ? images[imagePosition].src : '';

    return <div className="dynamic-images" style={{backgroundImage:`url(${url})`, ...styles }} alt="No Image"/>
}

export default DynamicImages;
