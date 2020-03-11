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

  this.withTranslation = function (namespaces, child) {
    return (0, _hoc["default"])(child, props, namespaces.split(" "));
  };
};

exports["default"] = ReactTranslate;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJmZXRjaCIsInJlcXVpcmUiLCJSZWFjdFRyYW5zbGF0ZSIsInByb3BzIiwid2l0aFRyYW5zbGF0aW9uIiwibmFtZXNwYWNlcyIsImNoaWxkIiwic3BsaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0EsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFyQjs7SUFDcUJDLGMsR0FDakIsd0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFDZixPQUFLQyxlQUFMLEdBQXVCLFVBQUNDLFVBQUQsRUFBYUMsS0FBYixFQUF1QjtBQUMxQyxXQUFPLHFCQUFhQSxLQUFiLEVBQW9CSCxLQUFwQixFQUEyQkUsVUFBVSxDQUFDRSxLQUFYLENBQWlCLEdBQWpCLENBQTNCLENBQVA7QUFDSCxHQUZEO0FBR0gsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUcmFuc2xhdGVIT0MgZnJvbSAnLi9ob2MnO1xyXG5jb25zdCBmZXRjaCA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpO1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFjdFRyYW5zbGF0ZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykgeyAgICAgICBcclxuICAgICAgICB0aGlzLndpdGhUcmFuc2xhdGlvbiA9IChuYW1lc3BhY2VzLCBjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gVHJhbnNsYXRlSE9DKGNoaWxkLCBwcm9wcywgbmFtZXNwYWNlcy5zcGxpdChcIiBcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==