var Area = (function () {
    function Area(points, backgroundImage) {
        this.points = points;
        this.backgroundImage = backgroundImage;
        this.findAndSetMinimalPoints();
    }
    Area.prototype.render = function (context) {
        var _this = this;
        var imageObj = new Image();
        imageObj.onload = function () {
            var firstPoint = _this.firstPoint;
            var lastUsedPoint;
            // context.save();
            context.beginPath();
            context.moveTo(firstPoint.x, firstPoint.y);
            for (var _i = 0, _a = _this.points; _i < _a.length; _i++) {
                var point = _a[_i];
                context.lineTo(point.x, point.y);
                lastUsedPoint = point;
            }
            context.closePath();
            context.stroke();
            context.clip();
            context.drawImage(imageObj, _this.leftPoint.x, _this.topPoint.y, 100, 100);
        };
        imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
    };
    /**
     *
     * @param offsetLeft
     * @param offsetTop
     */
    Area.prototype.subOffsetPoints = function (offsetLeft, offsetTop) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.subOffset(offsetLeft, offsetTop);
        }
    };
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
