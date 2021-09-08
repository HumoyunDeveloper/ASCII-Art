// Created By @HumoyunDeveloper
// Inspired By Franks Labaratory
// Special Thanks: Meetu Gyan, Javohir


"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
(function () {
    "use strict";

    var isObject = function isObject(_o) {
        (typeof _o === "undefined" ? "undefined" : _typeof(_o)) === "object";
    };
    var setDim = function setDim(_o, _w, _h) {
        _o.width = _w;
        _o.height = _h;
    };

    var getColor = function getColor(_x, _w, _y, _n) {
        return _y * _w * 4 + _x * 4 + _n;
    };

    var captureCanvas = function captureCanvas(_ctx, _w, _h) {
        return _ctx.getImageData(0, 0, _w, _h);
    };

    var TextC = function () {
        function TextC(_text, _x, _y, _col, _size) {
            _classCallCheck(this, TextC);

            this.text = _text;
            this.x = _x;
            this.y = _y;
            this.col = _col;
            this.size = _size;
        }

        _createClass(TextC, [{
            key: "draw",
            value: function draw(_ctx) {
                _ctx.fillStyle = this.col;
                _ctx.font = this.size + "px sans";
                _ctx.fillText(this.text, this.x, this.y);
            }
        }]);

        return TextC;
    }();

    var toColor = function toColor(r, g, b) {
        return "rgb(" + r + "," + g + "," + b + ")";
    };

    var log = function log(_m) {
        throw new Error(_m);
    };

    var getChar = function getChar(_alpha) {
        var returnValue = "";
        if (_alpha > 240) {
            returnValue = "@";
        } else if (_alpha > 230) {
            returnValue = "$";
        } else if (_alpha > 220) {
            returnValue = "#";
        } else if (_alpha > 210) {
            returnValue = "&";
        } else if (_alpha > 200) {
            returnValue = "*";
        } else if (_alpha > 190) {
            returnValue = "%";
        } else if (_alpha > 180) {
            returnValue = "=";
        } else if (_alpha > 170) {
            returnValue = "M";
        } else if (_alpha > 160) {
            returnValue = "S";
        } else if (_alpha > 160) {
            returnValue = "S";
        } else {
            returnValue = "";
        }
        return returnValue;
    };

    var convertToASCII = function convertToASCII(_ref) {
        var _ref$image = _ref.image;
        var image = _ref$image === undefined ? null : _ref$image;
        var _ref$returnValue = _ref.returnValue;
        var returnValue = _ref$returnValue === undefined ? "base64" : _ref$returnValue;
        var _ref$size = _ref.size;
        var size = _ref$size === undefined ? 10 : _ref$size;
        var _ref$colorize = _ref.colorize;
        var colorize = _ref$colorize === undefined ? true : _ref$colorize;

        var obj = {
            objects: [],
            result: undefined
        };

        if (typeof size === "number") {
            if (size >= 2 && size <= 10) {
                if (image) {
                    if (!image.naturalWidth) log(" Invalid Image or Image is not fully loaded.");else _doOpt(image, obj);
                } else {
                    log(" invalid argument");
                }
            } else {
                log(" \'size\' should be a number between 2 and 10.");
            }
        } else {
            log(" type of \'size\' should be a number between 2 and 10.");
        }

        function _doOpt(_img, _obj) {
            var _asciiArray = [];
            var c = document.createElement("canvas");
            var tx = c.getContext("2d");
            setDim(c, _img.naturalWidth, _img.naturalHeight);
            tx.drawImage(_img, 0, 0, _img.naturalWidth / size + 1, _img.naturalHeight / size + 1);
            var imageData = captureCanvas(tx, _img.naturalWidth, _img.naturalHeight);
            tx.clearRect(0, 0, c.width, c.height);
            if (imageData) {
                obj.objects = [];
                var d_width = imageData.width;
                var d_height = imageData.height;
                for (var y = 0; y < d_height; y++) {
                    for (var x = 0; x < d_width; x++) {
                        var _r = void 0,
                            g = void 0,
                            b = void 0,
                            a = void 0;
                        _r = imageData.data[getColor(x, d_width, y, 0)];
                        g = imageData.data[getColor(x, d_width, y, 1)];
                        b = imageData.data[getColor(x, d_width, y, 2)];
                        a = imageData.data[getColor(x, d_width, y, 3)];
                        if (a > 160) {
                            var sym = colorize ? "@" : getChar((_r + g + b) / 3);
                            var text = new TextC(sym, x * size, y * size, colorize ? toColor(_r, g, b) : "white", size - 1);
                            _obj.objects.push(text);
                        }
                    }
                }
                _obj.objects.forEach(function (tex) {
                    tex.draw(tx);
                });
                var r = c.toDataURL("image/jpeg", 1);
                _obj.result = c.toDataURL("image/jpeg", 1);
            } else {
                log(" Invalid Image.");
            }
        }
        return obj.result;
    };
    window.convertToASCII = convertToASCII;
})();