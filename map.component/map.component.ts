class Map {

  private context: CanvasRenderingContext2D;
  private subTop: number = 0;
  private subLeft: number = 0;
  private offset: number = 50;
  private renderedAreas: number = 0;
  private areas: Area[];

  /**
   * @param {HTMLCanvasElement} canvas
   */
  public constructor(private canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.bindOnHover();
  }

  /**
   * Renders all available areas with offset optimizzation
   *
   * @param {Area[]} areas
   */
  public renderMapAreas(areas: Area[]): void {
    this.areas = areas;
    this.setWidthAndHeight();
    this.calculateOffset();

    for (const area of areas) {
      area.subOffsetPoints(this.subLeft, this.subTop);
      area.render(this.context, this.onAreaRendered.bind(this));
    }
  }

  /**
   * Enables highlighting for areas (in future)
   */
  public onAreaRendered(): void {
    this.renderedAreas++;
  }

  /**
   * Calculates how far all points can be moved
   */
  private calculateOffset(): void {
    const minimalPoint: Point = this.findLeftTopPoint();

    this.subTop = minimalPoint.y - this.offset;
    this.subLeft = minimalPoint.x - this.offset;
  }

  /**
   * Finds the most left x and the most top y coordinates and returns a Point with that coordinates
   *
   * @return {Point}
   */
  private findLeftTopPoint(): Point {
    const areas: Area[] = this.areas;
    let theMostTopPoint: Point = areas[0].topPoint;
    let theMostLeftPoint: Point = areas[0].leftPoint;

    for (const area of areas) {
      if (area.topPoint.y < theMostTopPoint.y) {
        theMostTopPoint = area.topPoint;
      }

      if (area.leftPoint.x < theMostLeftPoint.x) {
        theMostLeftPoint = area.leftPoint;
      }
    }

    return new Point(theMostTopPoint.x, theMostLeftPoint.y);
  }

  /**
   * Finds the most right x and the most bottom y coordinates and returns a Point with that coordinates
   *
   * @return {Point}
   */
  private findRightBottomPoint(): Point {
    const areas: Area[] = this.areas;
    let theMostBottomPoint: Point = areas[0].bottomPoint;
    let theMostRightPoint: Point = areas[0].rightPoint;

    for (const area of areas) {
      if (area.bottomPoint.y > theMostBottomPoint.y) {
        theMostBottomPoint = area.bottomPoint;
      }

      if (area.rightPoint.x < theMostRightPoint.x) {
        theMostRightPoint = area.rightPoint;
      }
    }

    return new Point(theMostBottomPoint.x, theMostRightPoint.y);
  }

  /**
   * Dynamically determines how large a canvas can be and sets it size
   */
  private setWidthAndHeight(): void {
    const leftTopPoint = this.findLeftTopPoint();
    const rightBottomPoint = this.findRightBottomPoint();

    this.canvas.width = rightBottomPoint.x - leftTopPoint.x + this.offset * 3;
    this.canvas.height = rightBottomPoint.y - leftTopPoint.y + this.offset * 3;
  }

  private bindOnHover(): void {
    const that = this;

    this.canvas.addEventListener('mousemove', function (event: MouseEvent) {
      const rect = this.getBoundingClientRect();
      that.onHover(event, rect);
    });
  }

  /**
   * @param {MouseEvent} event
   * @param {ClientRect} rect
   */
  private onHover(event: MouseEvent, rect: ClientRect): void {
    if (this.renderedAreas !== this.areas.length) {
      return;
    }

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const point: Point = new Point(x, y);

    for (const area of this.areas) {
      const pointIsInArea: boolean = area.pointIsInArea(point);
      pointIsInArea ? area.highlightBorders(this.context) : area.deleteHighlighting(this.context);
    }
  }
}
