class Point {
  /**
   * @param {number} x
   * @param {number} y
   */
  public constructor(public x: number, public y: number) {
  }

  /**
   * Reduce current coordinates
   *
   * @param {number} xOffset
   * @param {number} yOffset
   */
  public subOffset(xOffset: number, yOffset: number): void {
    this.x = this.x - xOffset;
    this.y = this.y - yOffset;
  }
}