"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _hoc = _interopRequireDefault(require("./hoc"));

var fetch = require("node-fetch");

var ReactTranslate = function ReactTranslate(props) {
  (0, _classCallCheck2["default"])(this, ReactTranslate);
  console.log();

  this.withTranslation = function (namespaces, child) {
    return (0, _hoc["default"])(child, props, namespaces.split(" "));
  };
};

exports["default"] = ReactTranslate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJmZXRjaCIsInJlcXVpcmUiLCJSZWFjdFRyYW5zbGF0ZSIsInByb3BzIiwiY29uc29sZSIsImxvZyIsIndpdGhUcmFuc2xhdGlvbiIsIm5hbWVzcGFjZXMiLCJjaGlsZCIsInNwbGl0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOztBQUNBLElBQU1BLEtBQUssR0FBR0MsT0FBTyxDQUFDLFlBQUQsQ0FBckI7O0lBQ3FCQyxjLEdBQ2pCLHdCQUFZQyxLQUFaLEVBQW1CO0FBQUE7QUFDZkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSOztBQUVBLE9BQUtDLGVBQUwsR0FBdUIsVUFBQ0MsVUFBRCxFQUFhQyxLQUFiLEVBQXVCO0FBQzFDLFdBQU8scUJBQWFBLEtBQWIsRUFBb0JMLEtBQXBCLEVBQTJCSSxVQUFVLENBQUNFLEtBQVgsQ0FBaUIsR0FBakIsQ0FBM0IsQ0FBUDtBQUNILEdBRkQ7QUFHSCxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyYW5zbGF0ZUhPQyBmcm9tICcuL2hvYyc7XHJcbmNvbnN0IGZldGNoID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWN0VHJhbnNsYXRlIHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coKTtcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLndpdGhUcmFuc2xhdGlvbiA9IChuYW1lc3BhY2VzLCBjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gVHJhbnNsYXRlSE9DKGNoaWxkLCBwcm9wcywgbmFtZXNwYWNlcy5zcGxpdChcIiBcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==