class Area {
  public topPoint: Point;
  public leftPoint: Point;
  public bottomPoint: Point;
  public rightPoint: Point;

  public constructor(public points: Point[], public backgroundImage: string) {
    this.findAndSetMinimalPoints();
  }

  public render(context: CanvasRenderingContext2D) {
    let imageObj = new Image();

    imageObj.onload = () => {
      let firstPoint: Point = this.firstPoint;
      let lastUsedPoint: Point;

      // context.save();
      context.beginPath();
      context.moveTo(firstPoint.x, firstPoint.y);

      for (const point of this.points) {
        context.lineTo(point.x, point.y);
        lastUsedPoint = point;
      }

      context.closePath();
      context.stroke();
      context.clip();
      context.drawImage(
        imageObj,
        this.leftPoint.x,
        this.topPoint.y,
        100,
        100
      );
    };

    imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
  }

  /**
   *
   * @param offsetLeft
   * @param offsetTop
   */
  public subOffsetPoints(offsetLeft: number, offsetTop: number) {
    for (let point of this.points) {
      point.subOffset(offsetLeft, offsetTop);
    }
  }

  /**
   * @return {Point}
   */
  public get firstPoint(): Point {
    return this.points[0];
  }

  /**
   * Finds and sets extreme points of area
   */
  private findAndSetMinimalPoints(): void {
    this.topPoint = this.firstPoint;
    this.leftPoint = this.firstPoint;
    this.bottomPoint = this.firstPoint;
    this.rightPoint = this.firstPoint;

    for (let point of this.points) {
      if (point.x < this.leftPoint.x) {
        this.leftPoint = point;
      }

      if (point.x > this.rightPoint.x) {
        this.rightPoint = point;
      }

      if (point.y < this.topPoint.y) {
        this.topPoint = point;
      }

      if (point.y > this.bottomPoint.y) {
        this.bottomPoint = point;
      }
    }
  }
}