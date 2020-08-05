import "./index.scss";
import { Game, IElement, Context, ICircle, IRect, ILine } from "../lib/core";
import { PointerSystem } from "../lib/systems";
import { hitTest } from "./collisions";
import { sub, normalize } from "./collisions/utils";

function main({ canvas }: Context) {
  const background = {
    type: "rect",
    style: "#ffffff",
    position: [0, 0],
    size: [canvas.width, canvas.height],
  };

  // const test: ICircle = {
  //   type: "circle",
  //   style: "#0099b0",
  //   position: [250, 250],
  //   radius: 10,
  // };

  // const test: IRect = {
  //   type: "rect",
  //   style: "#0099b0",
  //   position: [250, 250],
  //   size: [100, 100],
  // };

  const test: ILine = {
    type: "line",
    style: "#0099b0",
    start: [250, 250],
    end: [600, 250],
  };

  // const pointer: ICircle = {
  //   type: "circle",
  //   style: "#888",
  //   position: [0, 0],
  //   radius: 10,
  // };

  const pointer: ILine = {
    type: "line",
    style: "#888",
    start: [0, 0],
    end: [0, 0],
  };

  // const pointer: IRect = {
  //   type: "rect",
  //   style: "#888",
  //   position: [0, 0],
  //   size: [50, 50],
  // };

  const getPosition = PointerSystem(canvas);

  return function (delta: number) {
    pointer.end = getPosition();

    const dir = normalize(sub(pointer.start, pointer.end));

    test.style = hitTest(test, { start: pointer.start, dir })
      ? "#ff8080"
      : "#0099b0";

    return [background, test, pointer] as IElement[];
  };
}

const view = document.getElementById("root") as HTMLCanvasElement;
Game(view, main);
