import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Label, Tag, Text } from "react-konva";
import { useSelector } from "react-redux";
import { v1 as uuid } from "uuid";
import BoundingBox from "./BoudingBox";
import LoadImage from "./LoadImage";
import Polygon from "./Polygon";

export const Canvas = () => {
  const [annotations, setAnnotations] = useState([
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      id: uuid(),
    },
    {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      id: uuid(),
    },
  ]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectAnnotation] = useState(null);
  const tool = useSelector((state) => state.workstation.currentTool);

  const [points, setPoints] = useState([]);
  const [flattenedPoints, setFlattenedPoints] = useState();
  const [position, setPosition] = useState([0, 0]);
  const [isMouseOverPoint, setMouseOverPoint] = useState(false);
  const [isPolyComplete, setPolyComplete] = useState(false);
  const getMousePos = (stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  };

  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (event) => {
    if (tool === "boundingbox") {
      if (selectedId === null && newAnnotation.length === 0) {
        const { x, y } = event.target.getStage().getPointerPosition();
        const id = uuid();
        setNewAnnotation([{ x, y, width: 0, height: 0, id }]);
      }
    } else if (tool === "polygon") {
      if (isPolyComplete) return;
      const stage = event.target.getStage();
      const mousePos = getMousePos(stage);
      if (isMouseOverPoint && points.length >= 3) {
        setPolyComplete(true);
      } else {
        setPoints([...points, mousePos]);
      }
    } else if (tool === "freedrawing") {
      isDrawing.current = true;
      const pos = event.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (event) => {
    if (tool === "boundingbox") {
      if (selectedId === null && newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = event.target.getStage().getPointerPosition();
        const id = uuid();
        setNewAnnotation([
          {
            x: sx,
            y: sy,
            width: x - sx,
            height: y - sy,
            id,
          },
        ]);
      }
    } else if (tool === "polygon") {
      const stage = event.target.getStage();
      const mousePos = getMousePos(stage);
      setPosition(mousePos);
    } else if (tool === "freedrawing") {
      // no drawing - skipping
      if (!isDrawing.current) {
        return;
      }
      const stage = event.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      // add point
      lastLine.points = lastLine.points.concat([point.x, point.y]);

      // replace last
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    if (tool === "boundingbox") {
      if (selectedId === null && newAnnotation.length === 1) {
        annotations.push(...newAnnotation);
        setAnnotations(annotations);
        setNewAnnotation([]);
      }
    } else if (tool === "freedrawing") {
      isDrawing.current = false;
    }
  };
  const handleMouseEnter = (event) => {
    event.target.getStage().container().style.cursor = "crosshair";
  };
  const handleKeyDown = (event) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      if (selectedId !== null) {
        const newAnnotations = annotations.filter(
          (annotation) => annotation.id !== selectedId
        );
        setAnnotations(newAnnotations);
      }
    }
  };

  const handleMouseOverStartPointPoly = (e) => {
    if (isPolyComplete || points.length < 3) return;
    e.target.scale({ x: 3, y: 3 });
    setMouseOverPoint(true);
  };
  const handleMouseOutStartPointPoly = (e) => {
    e.target.scale({ x: 1, y: 1 });
    setMouseOverPoint(false);
  };
  const handlePointDragMovePoly = (e) => {
    const stage = e.target.getStage();
    const index = e.target.index - 1;
    const pos = [e.target._lastPos.x, e.target._lastPos.y];
    if (pos[0] < 0) pos[0] = 0;
    if (pos[1] < 0) pos[1] = 0;
    if (pos[0] > stage.width()) pos[0] = stage.width();
    if (pos[1] > stage.height()) pos[1] = stage.height();
    setPoints([...points.slice(0, index), pos, ...points.slice(index + 1)]);
  };
  const handleGroupDragEnd = (event) => {
    if (event.target.name() === "polygon") {
      let result = [];
      let copyPoints = [...points];
      copyPoints.map((point) =>
        result.push([point[0] + event.target.x(), point[1] + event.target.y()])
      );
      event.target.position({ x: 0, y: 0 });
      setPoints(result);
    }
  };
  const reset = () => {
    setPoints([]);
    setPolyComplete(false);
  };

  useEffect(() => {
    setFlattenedPoints(
      points
        .concat(isPolyComplete ? [] : position)
        .reduce((a, b) => a.concat(b), [])
    );
  }, [points, isPolyComplete, position]);

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <div tabIndex={1} onKeyDown={handleKeyDown}>
      <Stage
        width={600}
        height={400}
        onMouseEnter={handleMouseEnter}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <Layer>
          <LoadImage
            imageUrl="https://drive.google.com/uc?id=1JvoXSE2mbg5LbiAUCoca3nk9Jb2ueI5L"
            onMouseDown={() => {
              selectAnnotation(null);
            }}
            imageWidth = {600}
            imageHeight = {400}
          />

          {tool === "boundingbox" &&
            annotationsToDraw.map((annotation, i) => {
              return (
                <BoundingBox
                  key={i}
                  shapeProps={annotation}
                  isSelected={annotation.id === selectedId}
                  onSelect={() => {
                    selectAnnotation(annotation.id);
                  }}
                  onChange={(newAttrs) => {
                    const rects = annotations.slice();
                    rects[i] = newAttrs;
                    setAnnotations(rects);
                  }}
                />
              );
            })}

          {tool === "polygon" && (
            <Polygon
              points={points}
              flattenedPoints={flattenedPoints}
              handlePointDragMove={handlePointDragMovePoly}
              handleGroupDragEnd={handleGroupDragEnd}
              handleMouseOverStartPoint={handleMouseOverStartPointPoly}
              handleMouseOutStartPoint={handleMouseOutStartPointPoly}
              isFinished={isPolyComplete}
            />
          )}

          {tool === "freedrawing" &&
            lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="white"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}

          {tool === "text" &&
              <Label x={0} y={0}>
              <Tag fill="white" lineJoin="round" shadowColor="black" />
              <Text
                text="Name"
                fontFamily="Calibri"
                fontSize={15}
                fill="black"
              />
            </Label>}
        </Layer>
      </Stage>
      {/* <pre style={{ whiteSpace: "pre-wrap" }}>{JSON.stringify(points)}</pre> */}
    </div>
  );
};