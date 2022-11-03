import React from "react";
import { fabric } from "fabric";
import "./SquareBrush";
import "./LPencilBrush";
// import { PencilBrush } from "./brushes";
// import { LPencilBrush } from "./LPencilBrush";
import { SpraypaintBrush, MarkerBrush, RibbonBrush } from "./LCrayonBrush";
import { imageData } from "./data";
import { PencilBrush } from "./LPencilBrush";

class Canvas {
  private canvas: fabric.Canvas;
  constructor(id: string) {
    const canvas = new fabric.Canvas(id, {
      backgroundColor: "#ffffff",
      width: 1200,
      height: 600,
      isDrawingMode: true,
    });
    this.canvas = canvas;
    this.canvas.setZoom(4);
    canvas.freeDrawingBrush = new PencilBrush(canvas, {
      width: 20,
      color: "#000",
      opacity: 1,
    });
  }
  enableDrawing() {
    // this.canvas.isDrawingMode = true;
    this.canvas.isDrawingMode = this.canvas.isDrawingMode ? false : true;
    this.canvas.discardActiveObject(); //select none
    this.canvas.requestRenderAll();
  }
  disableDrawing() {
    this.canvas.isDrawingMode = false;
    this.canvas.requestRenderAll();
  }
  toJSON() {
    const json = this.canvas.toJSON();
    console.log(json);
  }
  toDataUrl() {
    if (this.canvas) {
      const activeObject = this.canvas.getActiveObject();
      const dataUrl = activeObject.toDataURL({});
      console.log(dataUrl);
    }
  }
}
function App() {
  const [canvas, setCanvas] = React.useState<Canvas | null>(null);
  React.useEffect(() => {
    const canvas = new Canvas("canvas");
    setCanvas(canvas);
    // const img = new Image();
    // img.src = imageData;
    // img.onload = () => {
    //   const tempCanvas = fabric.util.createCanvasElement();
    //   const tempContext = tempCanvas.getContext("2d");
    //   tempContext!.canvas.width = img.width;
    //   tempContext!.canvas.height = img.height;

    //   tempContext!.drawImage(img, 0, 0);
    //   tempContext!.globalCompositeOperation = "source-in";

    //   tempContext!.fillStyle = "#09f";
    //   tempContext!.fillRect(0, 0, img.width, img.height);
    //   console.log(tempCanvas.toDataURL());
    // };
  }, []);

  const enable = () => {
    canvas!.enableDrawing();
  };
  const disable = () => {
    canvas!.disableDrawing();
  };
  const toJSON = () => {
    canvas?.toJSON();
  };
  const toDataUrl = () => {
    canvas?.toDataUrl();
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#ecf0f1" }}
    >
      <button onClick={enable}>Enable</button>
      <button onClick={disable}>Disable</button>
      <button onClick={toJSON}>To JSON</button>
      <button onClick={toDataUrl}>To DataUrl</button>
      <canvas id="canvas" />
    </div>
  );
}

export default App;
