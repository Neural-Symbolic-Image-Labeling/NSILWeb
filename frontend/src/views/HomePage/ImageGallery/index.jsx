import { useState } from "react";
import style from "./style.module.css";

const defaultImages = [
  {
    src: "https://picsum.photos/id/1018/200/300",
    label: "Image 1",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1015/200/300",
    label: "Image 2",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1019/200/300",
    label: "Image 3",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1010/200/300",
    label: "Image 4",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1018/200/300",
    label: "Image 1",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1015/200/300",
    label: "Image 2",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1019/200/300",
    label: "Image 3",
    status: "Unlabelled"
  },
  {
    src: "https://picsum.photos/id/1010/200/300",
    label: "Image 4",
    status: "Unlabelled"
  },
]

export const ImageGallery = () => {
  const [images, setImages] = useState(defaultImages);

  return (
    <div className={style.container}>
      {images.map((image, index) => (
        <div key={index} className={style["image-container"]}>
          <img src={image.src} className={style["image"]}  />
          <div className={style["image-label-wrapper"]}>
            <div className={style["image-caption"]}>
              {image.label}
            </div>
            <div className={style["image-status"]}>
              {image.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}