import React from "react";
import DynamicImages from "../../../../assets/lib/components/dynamic-images/dynamic-images-component";
import Image1 from "../../../../assets/img/welcome-dynamic-images/wm1.jpg";
import Image2 from "../../../../assets/img/welcome-dynamic-images/wm2.jpg";
import Image3 from "../../../../assets/img/welcome-dynamic-images/wm3.jpg";
import Image4 from "../../../../assets/img/welcome-dynamic-images/wm4.jpg";
import Image5 from "../../../../assets/img/welcome-dynamic-images/wm5.jpg";
import Image6 from "../../../../assets/img/welcome-dynamic-images/wm6.jpg";
import Image7 from "../../../../assets/img/welcome-dynamic-images/wm7.jpg";
import Image8 from "../../../../assets/img/welcome-dynamic-images/wm8.jpg";
import Image9 from "../../../../assets/img/welcome-dynamic-images/wm9.jpg";

let images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9];

images = images.map(img => {
    const image = new Image();

    image.src = img;

    return image;
});

// Background Size should be same as the size of .dynamic-images
const imageStyles = {backgroundRepeat: 'no-repeat', backgroundSize: '100% 100%'}

const WelcomeImages = () => {
    return <>
        <DynamicImages images={images} interval={5000} position={7} styles={imageStyles}/>
    </>
}

export default WelcomeImages;
