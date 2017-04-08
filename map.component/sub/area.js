var Area = (function () {
    /**
     * @param {Point[]} points
     * @param {string} backgroundImage
     */
    function Area(points, backgroundImage) {
        this.points = points;
        this.backgroundImage = backgroundImage;
        this.findAndSetMinimalPoints();
    }
    Object.defineProperty(Area.prototype, "firstPoint", {
        /**
         * @return {Point}
         */
        get: function () {
            return this.points[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "width", {
        /**
         * Distance between left and right Points
         *
         * @return {number}
         */
        get: function () {
            return this.rightPoint.x - this.leftPoint.x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Area.prototype, "height", {
        /**
         * Distance between top and bottom Points
         *
         * @return {number}
         */
        get: function () {
            return this.bottomPoint.y - this.topPoint.y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Renders lines and image inside it
     *
     * @param {CanvasRenderingContext2D} context
     * @param {Function} onRender
     */
    Area.prototype.render = function (context, onRender) {
        var _this = this;
        var imageObj = new Image();
        imageObj.onload = function () {
            context.save();
            context.beginPath();
            context.lineWidth = 4;
            _this.renderLines(context);
            _this.renderImage(context, imageObj);
            context.restore();
            onRender();
        };
        imageObj.src = this.backgroundImage;
    };
    /**
     * Subtracts the distance for all available points
     *
     * @param subLeft
     * @param subTop
     */
    Area.prototype.subOffsetPoints = function (subLeft, subTop) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.subOffset(subLeft, subTop);
        }
    };
    /**
     * Rerenders lines with another color and shadow
     *
     * @param {CanvasRenderingContext2D} context
     */
    Area.prototype.higlightBorders = function (context) {
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
    };
    /**
     * Renders lines between all available points
     *
     * @param {CanvasRenderingContext2D} context
     */
    Area.prototype.renderLines = function (context) {
        var firstPoint = this.firstPoint;
        var lastUsedPoint;
        context.moveTo(firstPoint.x, firstPoint.y);
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            context.lineTo(point.x, point.y);
            lastUsedPoint = point;
        }
        context.closePath();
        context.stroke();
    };
    /**
     * Inserts image in current region
     *
     * @param {CanvasRenderingContext2D} context
     * @param {Image} image
     */
    Area.prototype.renderImage = function (context, image) {
        context.clip();
        context.drawImage(image, this.leftPoint.x, this.topPoint.y, this.width, this.height);
    };
    /**
     * Finds and sets extreme points of area
     */
    Area.prototype.findAndSetMinimalPoints = function () {
        this.topPoint = this.firstPoint;
        this.leftPoint = this.firstPoint;
        this.bottomPoint = this.firstPoint;
        this.rightPoint = this.firstPoint;
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
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
    };
    return Area;
}());
