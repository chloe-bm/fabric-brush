// @ts-nocheck
import { fabric } from "fabric";

export class SquareBrushObject extends fabric.BaseBrush {
  static type = "SquareBrush";
  public width = 3;
  public points = [];
  //@ts-ignore
  public canvas: fabric.Canvas;
  initialize(canvas: fabric.Canvas) {
    this.canvas = canvas;
    this.points = [];
    //@ts-ignore
    super.initialize();

    return this;
  }
  onMouseDown() {
    this.points = [];
    this.canvas.clearContext(this.canvas.contextTop);
    var ctx = this.canvas.contextTop;
    ctx.stroke();
  }

  onMouseMove(pointer) {
    var point = this.addPoint(pointer),
      ctx = this.canvas.contextTop;

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.strokeStyle = point.fill;
    for (var i = 0; i < point.lines.length; i++) {
      ctx.moveTo(point.x, point.y);
      ctx.lineTo(point.x + point.lines[i][0], point.y + point.lines[i][1]);
    }
    ctx.stroke();
  }

  onMouseUp() {
    var originalRenderOnAddition = this.canvas.renderOnAddition;
    let group = new fabric.Group();
    this.canvas.renderOnAddition = false;

    for (var i = 0, len = this.points.length; i < len; i++) {
      var point = this.points[i];

      for (var j = 0; j < 4; j++) {
        this.canvas.add(
          new fabric.Line([0, 0, point.lines[j][0], point.lines[j][1]], {
            left: point.x,
            top: point.y,
            stroke: point.fill,
          })
        );
      }
    }

    this.canvas.add(group);

    this.canvas.clearContext(this.canvas.contextTop);
    this.canvas.renderOnAddition = originalRenderOnAddition;
    this.canvas.renderAll();
  }

  addPoint(pointer) {
    var pointerPoint = new fabric.Point(pointer.x, pointer.y);
    var lines = [];
    for (var i = 0; i < 4; i++) {
      var d = this.width;
      lines.push([
        5 * (Math.random() * d * 2 - d),
        5 * (Math.random() * d * 2 - d),
      ]);
    }
    pointerPoint.lines = lines;
    pointerPoint.fill = "red";
    this.points.push(pointerPoint);
    console.log(this.points.length);
    return pointerPoint;
  }
}

fabric.SquareBrush = fabric.util.createClass(SquareBrushObject, {
  type: SquareBrushObject.type,
});
fabric.SquareBrush.fromObject = SquareBrushObject.fromObject;

export type SquareBrushOptions = fabric.IPathOptions & { path: string };

declare module "fabric" {
  namespace fabric {
    class SquareBrush extends SquareBrushObject {
      constructor(canvas: fabric.Canvas);
    }
  }
}
