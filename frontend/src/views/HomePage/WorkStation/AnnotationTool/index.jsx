import style from "./style.module.css";
// import { TestCanvas } from "../../TestPage/TestCanvas";
import { Sidebar } from "./Sidebar";
import { CanvasField } from "../../../../components/CanvasField";

const defaultImage = {
  src: "https://picsum.photos/id/1018/200/300",
  label: "Image 1",
  status: "Unlabelled",
  name: "image1.jpg"
}

export const AnnotationTool = ({setPage}) => {

  return (
    <div className={style["container"]}>
      <div className={style["body-container"]}>
        <div className={style["image-container"]}>
          <div className={style["image-info-bar"]}>
            <div className={style["image-caption"]}>
              {defaultImage.name}
            </div>
          </div>
          <div className={style["image-canvas"]}>
            <CanvasField />
          </div>
        </div>
        <div className={style["sidebar-container"]}>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}