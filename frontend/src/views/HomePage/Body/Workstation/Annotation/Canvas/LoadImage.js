import React from "react";
import { Image } from "react-konva";
import useImage from 'use-image';

const LoadImage = ({
  imageUrl,
  onMouseDown
}) => {
  const [image] = useImage(imageUrl);
  return <Image image={image}  onMouseDown={onMouseDown} />;
};


export default LoadImage;
