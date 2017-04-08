class Area {
  public topPoint: Point;
  public leftPoint: Point;
  public bottomPoint: Point;
  public rightPoint: Point;

  /**
   * @param {Point[]} points
   * @param {string} backgroundImage
   */
  public constructor(public points: Point[], public backgroundImage: string) {
    this.findAndSetMinimalPoints();
  }

  /**
   * @return {Point}
   */
  public get firstPoint(): Point {
    return this.points[0];
  }

  /**
   * Distance between left and right Points
   *
   * @return {number}
   */
  public get width(): number {
    return this.rightPoint.x - this.leftPoint.x;
  }

  /**
   * Distance between top and bottom Points
   *
   * @return {number}
   */
  public get height(): number {
    return this.bottomPoint.y - this.topPoint.y;
  }

  /**
   * Renders lines and image inside it
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Function} onRender
   */
  public render(context: CanvasRenderingContext2D, onRender: Function): void {
    const imageObj: Image = new Image();

    imageObj.onload = () => {
      context.save();
      context.beginPath();
      context.lineWidth = 4;
      this.renderLines(context);
      this.renderImage(context, imageObj);
      context.restore();

      onRender();
    };

    imageObj.src = this.backgroundImage;
  }

  /**
   * Subtracts the distance for all available points
   *
   * @param offsetLeft
   * @param offsetTop
   */
  public subOffsetPoints(offsetLeft: number, offsetTop: number): void {
    for (const point of this.points) {
      point.subOffset(offsetLeft, offsetTop);
    }
  }

  /**
   * Rerenders lines with another color and shadow
   *
   * @param {CanvasRenderingContext2D} context
   */
  public higlightBorders(context: CanvasRenderingContext2D): void {
    context.save();
    context.beginPath();
    context.lineWidth = 2;
    context.strokeStyle = '#5A80FF';
    context.shadowColor = 'blue';
    context.shadowBlur = 20;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    this.renderLines(context);
    context.restore();
  }

  /**
   * Renders lines between all available points
   *
   * @param {CanvasRenderingContext2D} context
   */
  private renderLines(context: CanvasRenderingContext2D): void {
    const firstPoint: Point = this.firstPoint;
    let lastUsedPoint: Point;
    context.moveTo(firstPoint.x, firstPoint.y);

    for (const point of this.points) {
      context.lineTo(point.x, point.y);
      lastUsedPoint = point;
    }

    context.closePath();
    context.stroke();
  }

  /**
   * Inserts image in current region
   *
   * @param {CanvasRenderingContext2D} context
   * @param {Image} image
   */
  private renderImage(context: CanvasRenderingContext2D, image: Image): void {
    context.clip();
    context.drawImage(
      image,
      this.leftPoint.x,
      this.topPoint.y,
      this.width,
      this.height
    );
  }

  /**
   * Finds and sets extreme points of area
   */
  private findAndSetMinimalPoints(): void {
    this.topPoint = this.firstPoint;
    this.leftPoint = this.firstPoint;
    this.bottomPoint = this.firstPoint;
    this.rightPoint = this.firstPoint;

    for (const point of this.points) {
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
