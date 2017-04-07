var Point = (function () {
    /**
     * @param {number} x
     * @param {number} y
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var Line = (function () {
    /**
     * @param {Point} start
     * @param {Point}  end
     */
    function Line(start, end) {
        this.start = start;
        this.end = end;
    }
    return Line;
}());
var Area = (function () {
    function Area(points, backgroundImage) {
        this.points = points;
        this.backgroundImage = backgroundImage;
        this.setFirstPoint();
        this.findAndSetMinimalPoint();
    }
    Area.prototype.fixPoints = function (offsetLeft, offsetTop) {
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            point.x = point.x - offsetLeft;
            point.y = point.y - offsetTop;
        }
        this.leftPoint.x = this.leftPoint.x - offsetLeft;
        this.topPoint.y = this.topPoint.y - offsetTop;
        this.firstPoint.y = this.firstPoint.y - offsetTop;
        this.firstPoint.x = this.firstPoint.x - offsetLeft;
    };
    Area.prototype.getFirstPoint = function () {
        return this.firstPoint;
    };
    Area.prototype.findAndSetMinimalPoint = function () {
        this.topPoint = new Point(this.firstPoint.x, this.firstPoint.y);
        this.leftPoint = new Point(this.firstPoint.x, this.firstPoint.y);
        for (var _i = 0, _a = this.points; _i < _a.length; _i++) {
            var point = _a[_i];
            if (point.x < this.leftPoint.x) {
                this.leftPoint = new Point(point.x, point.y);
            }
            if (point.y < this.topPoint.y) {
                this.topPoint = new Point(point.x, point.y);
            }
        }
    };
    Area.prototype.setFirstPoint = function () {
        var firstPoint = this.points[0];
        this.firstPoint = new Point(firstPoint.x, firstPoint.y);
    };
    return Area;
}());
var Map = (function () {
    function Map(canvas) {
        this.canvas = canvas;
        this.renderedLines = [];
        this.offsetTop = 0;
        this.offsetLeft = 0;
        this.context = canvas.getContext('2d');
        this.setWidthAndHeight();
    }
    Map.prototype.renderMapAreas = function (areas) {
        var minimalPoint = this.findMinimalPoint(areas);
        this.offsetTop = minimalPoint.y - 50;
        this.offsetLeft = minimalPoint.x - 50;
        for (var _i = 0, areas_1 = areas; _i < areas_1.length; _i++) {
            var area = areas_1[_i];
            this.renderMapArea(area);
        }
    };
    Map.prototype.renderMapArea = function (area) {
        var _this = this;
        var imageObj = new Image();
        imageObj.onload = function () {
            area.fixPoints(_this.offsetLeft, _this.offsetTop);
            var firstPoint = area.getFirstPoint();
            var lastUsedPoint;
            _this.context.save();
            _this.context.beginPath();
            _this.context.moveTo(firstPoint.x, firstPoint.y);
            for (var _i = 0, _a = area.points; _i < _a.length; _i++) {
                var point = _a[_i];
                _this.context.lineTo(point.x, point.y);
                lastUsedPoint = point;
            }
            _this.context.closePath();
            _this.context.stroke();
            _this.context.clip();
            _this.context.drawImage(imageObj, area.leftPoint.x, area.topPoint.y, 100, 100);
        };
        imageObj.src = 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';
    };
    Map.prototype.findMinimalPoint = function (areas) {
        var theMostTopPoint = areas[0].topPoint;
        var theMostLeftPoint = areas[0].leftPoint;
        for (var _i = 0, areas_2 = areas; _i < areas_2.length; _i++) {
            var area = areas_2[_i];
            if (area.topPoint.y < theMostTopPoint.y) {
                theMostTopPoint = area.topPoint;
            }
            if (area.leftPoint.x < theMostLeftPoint.x) {
                theMostLeftPoint = area.leftPoint;
            }
        }
        return new Point(theMostTopPoint.x, theMostLeftPoint.y);
    };
    Map.prototype.addRenderedLine = function (start, end) {
        this.renderedLines.push(new Line(start, end));
    };
    Map.prototype.lineIsNotRendered = function (start, end) {
        var line = new Line(start, end);
        return !this.renderedLines.includes(line);
    };
    Map.prototype.setWidthAndHeight = function () {
        this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.canvas.height = 600;
    };
    return Map;
}());
