import React, { useState, useEffect } from "react";
import { Image } from "react-konva";
import Konva from 'konva';

const LoadImage = ({
  imageUrl,
  imageWidth,
  imageHeight,
  onMouseDown,
  onMouseUp,
  onMouseMove,
}) => {
  const [image, setImage] = useState(null);
  useEffect(() => {
    const imageToLoad = new window.Image();
    imageToLoad.src = imageUrl;
    imageToLoad.addEventListener("load", () => {
      setImage(imageToLoad);
    });

    return () => imageToLoad.removeEventListener("load");
  }, [imageUrl, setImage]);

  return (
    <Image
      image={image}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      width = {imageWidth}
      height = {imageHeight}
    />
  );
};

export default LoadImage;
