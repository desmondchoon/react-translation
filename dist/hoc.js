"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fetch = require("node-fetch");

function TranslateHOC(WrappedComponent, globalProps, namespaces) {
  var _temp;

  return _temp =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2["default"])(WrapperComponent, _Component);

    function WrapperComponent(props) {
      var _this;

      (0, _classCallCheck2["default"])(this, WrapperComponent);
      _this = (0, _possibleConstructorReturn2["default"])(this, (0, _getPrototypeOf2["default"])(WrapperComponent).call(this, props));
      (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getJson", function (path, namespaces) {
        var languages = {};

        for (var n = 0; n < namespaces.length; n++) {
          var namespace = namespaces[n];

          var data = require("".concat(path, "/").concat(window.localStorage.getItem('_lang'), "/").concat(namespace, ".json"));

          languages = _objectSpread({}, languages, (0, _defineProperty2["default"])({}, namespace, data));
        }

        return languages;
      });
      _this.state = {
        languages: {},
        loadLang: false
      };
      return _this;
    }

    (0, _createClass2["default"])(WrapperComponent, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        var _this2 = this;

        if (!window.localStorage.getItem('_lang')) {
          window.localStorage.setItem('_lang', globalProps.defaultLang);
        }

        if (globalProps.ssr == true) {
          this.ssrGetJson(globalProps.path, namespaces).then(function (languages) {
            _this2.setState({
              languages: languages
            });
          });
        } else {
          var languages = this.getJson(globalProps.path, namespaces);
          this.setState({
            languages: languages
          });
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate() {
        var _this3 = this;

        if (this.state.loadLang == true) {
          if (globalProps.ssr == true) {
            this.ssrGetJson(globalProps.path, namespaces).then(function (languages) {
              _this3.setState({
                languages: languages,
                loadLang: false
              });
            });
          } else {
            var languages = this.getJson(globalProps.path, namespaces);
            this.setState({
              languages: languages,
              loadLang: false
            });
          }
        }
      }
    }, {
      key: "ssrGetJson",
      value: function () {
        var _ssrGetJson = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(path, namespaces) {
          var languages, n, namespace, response, data;
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  languages = {};
                  n = 0;

                case 2:
                  if (!(n < namespaces.length)) {
                    _context.next = 14;
                    break;
                  }

                  namespace = namespaces[n];
                  _context.next = 6;
                  return fetch("".concat(path, "/").concat(window.localStorage.getItem('_lang'), "/").concat(namespace, ".json"));

                case 6:
                  response = _context.sent;
                  _context.next = 9;
                  return response.json();

                case 9:
                  data = _context.sent;
                  languages = _objectSpread({}, languages, (0, _defineProperty2["default"])({}, namespace, data));

                case 11:
                  n++;
                  _context.next = 2;
                  break;

                case 14:
                  return _context.abrupt("return", languages);

                case 15:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        function ssrGetJson(_x, _x2) {
          return _ssrGetJson.apply(this, arguments);
        }

        return ssrGetJson;
      }()
    }, {
      key: "render",
      value: function render() {
        var _this4 = this;

        return _react["default"].createElement(WrappedComponent, (0, _extends2["default"])({}, this.props, globalProps, {
          t: function t(string) {
            return _this4.state.languages[string.split(".")[0]] && _this4.state.languages[string.split(".")[0]][string.split(".")[1]] ? _this4.state.languages[string.split(".")[0]][string.split(".")[1]] : "";
          },
          changeLang: function changeLang(lang) {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('_lang', lang);

              _this4.setState({
                loadLang: true
              });
            }
          }
        }));
      }
    }]);
    return WrapperComponent;
  }(_react.Component), _temp;
}

var _default = TranslateHOC;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ob2MuanMiXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1aXJlIiwiVHJhbnNsYXRlSE9DIiwiV3JhcHBlZENvbXBvbmVudCIsImdsb2JhbFByb3BzIiwibmFtZXNwYWNlcyIsInByb3BzIiwicGF0aCIsImxhbmd1YWdlcyIsIm4iLCJsZW5ndGgiLCJuYW1lc3BhY2UiLCJkYXRhIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0YXRlIiwibG9hZExhbmciLCJzZXRJdGVtIiwiZGVmYXVsdExhbmciLCJzc3IiLCJzc3JHZXRKc29uIiwidGhlbiIsInNldFN0YXRlIiwiZ2V0SnNvbiIsInJlc3BvbnNlIiwianNvbiIsInN0cmluZyIsInNwbGl0IiwibGFuZyIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXJCOztBQUVBLFNBQVNDLFlBQVQsQ0FBc0JDLGdCQUF0QixFQUF3Q0MsV0FBeEMsRUFBcURDLFVBQXJELEVBQWlFO0FBQUE7O0FBQzdEO0FBQUE7QUFBQTtBQUFBOztBQUVJLDhCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7QUFDZiw4SEFBTUEsS0FBTjtBQURlLGtHQWtEVCxVQUFDQyxJQUFELEVBQU9GLFVBQVAsRUFBc0I7QUFDNUIsWUFBSUcsU0FBUyxHQUFHLEVBQWhCOztBQUNBLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osVUFBVSxDQUFDSyxNQUEvQixFQUF1Q0QsQ0FBQyxFQUF4QyxFQUE0QztBQUN4QyxjQUFJRSxTQUFTLEdBQUdOLFVBQVUsQ0FBQ0ksQ0FBRCxDQUExQjs7QUFDQSxjQUFJRyxJQUFJLEdBQUdYLE9BQU8sV0FBSU0sSUFBSixjQUFZTSxNQUFNLENBQUNDLFlBQVAsQ0FBb0JDLE9BQXBCLENBQTRCLE9BQTVCLENBQVos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QUEsSUFBc0NhLGdCQUF0QztBQWlGSDs7ZUFFYzVCLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5jb25zdCBmZXRjaCA9IHJlcXVpcmUoXCJub2RlLWZldGNoXCIpO1xyXG5cclxuZnVuY3Rpb24gVHJhbnNsYXRlSE9DKFdyYXBwZWRDb21wb25lbnQsIGdsb2JhbFByb3BzLCBuYW1lc3BhY2VzKSB7XHJcbiAgICByZXR1cm4gY2xhc3MgV3JhcHBlckNvbXBvbmVudCBleHRlbmRzIENvbXBvbmVudCB7XHJcblxyXG4gICAgICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlczoge30sXHJcbiAgICAgICAgICAgICAgICBsb2FkTGFuZzogZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKXtcclxuICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19sYW5nJykpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnX2xhbmcnLCBnbG9iYWxQcm9wcy5kZWZhdWx0TGFuZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChnbG9iYWxQcm9wcy5zc3IgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zc3JHZXRKc29uKGdsb2JhbFByb3BzLnBhdGgsIG5hbWVzcGFjZXMpLnRoZW4obGFuZ3VhZ2VzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFuZ3VhZ2VzOiBsYW5ndWFnZXMgfSk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IGxhbmd1YWdlcyA9IHRoaXMuZ2V0SnNvbihnbG9iYWxQcm9wcy5wYXRoLCBuYW1lc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYW5ndWFnZXM6IGxhbmd1YWdlcyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50RGlkVXBkYXRlKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuc3RhdGUubG9hZExhbmcgPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsUHJvcHMuc3NyID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNzckdldEpzb24oZ2xvYmFsUHJvcHMucGF0aCwgbmFtZXNwYWNlcykudGhlbihsYW5ndWFnZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFuZ3VhZ2VzOiBsYW5ndWFnZXMsIGxvYWRMYW5nOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGFuZ3VhZ2VzID0gdGhpcy5nZXRKc29uKGdsb2JhbFByb3BzLnBhdGgsIG5hbWVzcGFjZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYW5ndWFnZXM6IGxhbmd1YWdlcywgbG9hZExhbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhc3luYyBzc3JHZXRKc29uKHBhdGgsIG5hbWVzcGFjZXMpIHtcclxuICAgICAgICAgICAgbGV0IGxhbmd1YWdlcyA9IHt9O1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuID0gMDsgbiA8IG5hbWVzcGFjZXMubGVuZ3RoOyBuKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBuYW1lc3BhY2UgPSBuYW1lc3BhY2VzW25dO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChgJHtwYXRofS8ke3dpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnX2xhbmcnKX0vJHtuYW1lc3BhY2V9Lmpzb25gKVxyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5sYW5ndWFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgW25hbWVzcGFjZV06IGRhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2VzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0SnNvbiA9IChwYXRoLCBuYW1lc3BhY2VzKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBsYW5ndWFnZXMgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuYW1lc3BhY2VzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlID0gbmFtZXNwYWNlc1tuXTtcclxuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gcmVxdWlyZShgJHtwYXRofS8ke3dpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnX2xhbmcnKX0vJHtuYW1lc3BhY2V9Lmpzb25gKTtcclxuICAgICAgICAgICAgICAgIGxhbmd1YWdlcyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAuLi5sYW5ndWFnZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgW25hbWVzcGFjZV06IGRhdGFcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gbGFuZ3VhZ2VzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPFdyYXBwZWRDb21wb25lbnQgey4uLnRoaXMucHJvcHN9IHsuLi5nbG9iYWxQcm9wc31cclxuICAgICAgICAgICAgICAgIHQ9eyhzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5sYW5ndWFnZXNbc3RyaW5nLnNwbGl0KFwiLlwiKVswXV0gJiYgdGhpcy5zdGF0ZS5sYW5ndWFnZXNbc3RyaW5nLnNwbGl0KFwiLlwiKVswXV1bc3RyaW5nLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnN0YXRlLmxhbmd1YWdlc1tzdHJpbmcuc3BsaXQoXCIuXCIpWzBdXVtzdHJpbmcuc3BsaXQoXCIuXCIpWzFdXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiXCJcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VMYW5nPXsobGFuZyk9PntcclxuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnX2xhbmcnLGxhbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtsb2FkTGFuZzogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYW5zbGF0ZUhPQzsiXX0=