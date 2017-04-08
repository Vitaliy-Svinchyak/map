var Point = (function () {
    /**
     * @param {number} x
     * @param {number} y
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Reduce current coordinates
     *
     * @param {number} xOffset
     * @param {number} yOffset
     */
    Point.prototype.subOffset = function (xOffset, yOffset) {
        this.x = this.x - xOffset;
        this.y = this.y - yOffset;
    };
    return Point;
}());
