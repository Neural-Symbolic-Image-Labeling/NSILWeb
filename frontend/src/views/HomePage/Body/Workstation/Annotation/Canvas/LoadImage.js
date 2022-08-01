import { set } from "mongoose";
import React, { useState, useEffect, useRef } from "react";
import { Image } from "react-konva";

const LoadImage = ({ imageUrl, onMouseDown }) => {
  // const [image] = useImage(imageUrl);
  // return <Image  onLoad = {() => {console.log(1111111)}}image={image}  onMouseDown={onMouseDown} width = {900} height = {600}/>;
  const [image, setImage] = useState(null);

  useEffect(() => {
    loadImage();
  }, []);

  function loadImage() {
    const image = new window.Image();
    image.src = imageUrl;
    image.onload = () => {
      const { naturalHeight, naturalWidth} = image;
      console.log(naturalHeight, naturalWidth);
      if (naturalWidth > naturalHeight){
        let ratioH = naturalWidth >= 900 ? 1-((naturalWidth-900)/naturalWidth) : ((900-naturalWidth)/naturalWidth)+1
        image.width = Math.ceil(naturalWidth*ratioH);
        image.height = Math.ceil(naturalHeight*ratioH);
        image.alt = Math.ceil(450-((naturalWidth*ratioH)/2));
        if(image.height > 600){
          let ratio = naturalHeight >= 600 ? 1-((naturalHeight-600)/naturalHeight) : ((600 -naturalHeight)/naturalHeight)+1
          image.width = Math.ceil(naturalWidth*ratio);
          image.height = Math.ceil(naturalHeight*ratio);
          image.alt = Math.ceil(450-((naturalWidth*ratio)/2));
        }
      }else{
        let ratio = naturalHeight >= 600 ? 1-((naturalHeight-600)/naturalHeight) : ((600 -naturalHeight)/naturalHeight)+1
        image.width = Math.ceil(naturalWidth*ratio);
        image.height = Math.ceil(naturalHeight*ratio);
        image.alt = Math.ceil(450-((naturalWidth*ratio)/2));
      }
      console.log(image.width, image.height);
      setImage(image);

    };
  }
  return <Image image={image} onMouseDown={onMouseDown} x={image === null ? 0 : Number(image.alt)}></Image>;
};

export default LoadImage;
