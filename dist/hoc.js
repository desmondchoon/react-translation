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
            console.log(string);
            console.log(_this4.state.languages);
            return _this4.state.languages[string.split(".")[0]] && _this4.state.languages[string.split(".")[0]][string.split(".")[1]] ? _this4.state.languages[string.split(".")[0]][string.split(".")[1]] : "";
          },
          changeLang: function changeLang(lang) {
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('_lang', lang);
              window.location.reload(); // this.setState({loadLang: true});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ob2MuanMiXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1aXJlIiwiVHJhbnNsYXRlSE9DIiwiV3JhcHBlZENvbXBvbmVudCIsImdsb2JhbFByb3BzIiwibmFtZXNwYWNlcyIsInByb3BzIiwicGF0aCIsImxhbmd1YWdlcyIsIm4iLCJsZW5ndGgiLCJuYW1lc3BhY2UiLCJkYXRhIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0YXRlIiwibG9hZExhbmciLCJzZXRJdGVtIiwiZGVmYXVsdExhbmciLCJzc3IiLCJzc3JHZXRKc29uIiwidGhlbiIsInNldFN0YXRlIiwiZ2V0SnNvbiIsInJlc3BvbnNlIiwianNvbiIsInN0cmluZyIsImNvbnNvbGUiLCJsb2ciLCJzcGxpdCIsImxhbmciLCJsb2NhdGlvbiIsInJlbG9hZCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFDQSxJQUFNQSxLQUFLLEdBQUdDLE9BQU8sQ0FBQyxZQUFELENBQXJCOztBQUVBLFNBQVNDLFlBQVQsQ0FBc0JDLGdCQUF0QixFQUF3Q0MsV0FBeEMsRUFBcURDLFVBQXJELEVBQWlFO0FBQUE7O0FBQzdEO0FBQUE7QUFBQTtBQUFBOztBQUVJLDhCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7QUFDZiw4SEFBTUEsS0FBTjtBQURlLGtHQWtEVCxVQUFDQyxJQUFELEVBQU9GLFVBQVAsRUFBc0I7QUFDNUIsWUFBSUcsU0FBUyxHQUFHLEVBQWhCOztBQUNBLGFBQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR0osVUFBVSxDQUFDSyxNQUEvQixFQUF1Q0QsQ0FBQyxFQUF4QyxFQUE0QztBQUN4QyxjQUFJRSxTQUFTLEdBQUdOLFVBQVUsQ0FBQ0ksQ0FBRCxDQUExQjs7QUFDQSxjQUFJRyxJQUFJLEdBQUdYLE9BQU8sV0FBSU0sSUFBSixjQUFZTSxNQUFNLENBQUND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SSxPQUFwQixDQUE0QixPQUE1QixFQUFvQ2EsSUFBcEM7QUFDQWxCLGNBQUFBLE1BQU0sQ0FBQ21CLFFBQVAsQ0FBZ0JDLE1BQWhCLEdBRjZCLENBRzdCO0FBQ0g7QUFDSjtBQWRFLFdBQVA7QUFnQkg7QUFsRkw7QUFBQTtBQUFBLElBQXNDQyxnQkFBdEM7QUFvRkg7O2VBRWNoQyxZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuY29uc3QgZmV0Y2ggPSByZXF1aXJlKFwibm9kZS1mZXRjaFwiKTtcclxuXHJcbmZ1bmN0aW9uIFRyYW5zbGF0ZUhPQyhXcmFwcGVkQ29tcG9uZW50LCBnbG9iYWxQcm9wcywgbmFtZXNwYWNlcykge1xyXG4gICAgcmV0dXJuIGNsYXNzIFdyYXBwZXJDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgbG9hZExhbmc6IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50KCl7XHJcbiAgICAgICAgICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfbGFuZycpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ19sYW5nJywgZ2xvYmFsUHJvcHMuZGVmYXVsdExhbmcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2xvYmFsUHJvcHMuc3NyID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3NyR2V0SnNvbihnbG9iYWxQcm9wcy5wYXRoLCBuYW1lc3BhY2VzKS50aGVuKGxhbmd1YWdlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhbmd1YWdlczogbGFuZ3VhZ2VzIH0pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBsYW5ndWFnZXMgPSB0aGlzLmdldEpzb24oZ2xvYmFsUHJvcHMucGF0aCwgbmFtZXNwYWNlcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFuZ3VhZ2VzOiBsYW5ndWFnZXMgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLnN0YXRlLmxvYWRMYW5nID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGdsb2JhbFByb3BzLnNzciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zc3JHZXRKc29uKGdsb2JhbFByb3BzLnBhdGgsIG5hbWVzcGFjZXMpLnRoZW4obGFuZ3VhZ2VzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhbmd1YWdlczogbGFuZ3VhZ2VzLCBsb2FkTGFuZzogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhbmd1YWdlcyA9IHRoaXMuZ2V0SnNvbihnbG9iYWxQcm9wcy5wYXRoLCBuYW1lc3BhY2VzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgbGFuZ3VhZ2VzOiBsYW5ndWFnZXMsIGxvYWRMYW5nOiBmYWxzZSB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXN5bmMgc3NyR2V0SnNvbihwYXRoLCBuYW1lc3BhY2VzKSB7XHJcbiAgICAgICAgICAgIGxldCBsYW5ndWFnZXMgPSB7fTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBuYW1lc3BhY2VzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmFtZXNwYWNlID0gbmFtZXNwYWNlc1tuXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goYCR7cGF0aH0vJHt3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19sYW5nJyl9LyR7bmFtZXNwYWNlfS5qc29uYClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubGFuZ3VhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lc3BhY2VdOiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEpzb24gPSAocGF0aCwgbmFtZXNwYWNlcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGFuZ3VhZ2VzID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmFtZXNwYWNlcy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzcGFjZSA9IG5hbWVzcGFjZXNbbl07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcXVpcmUoYCR7cGF0aH0vJHt3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19sYW5nJyl9LyR7bmFtZXNwYWNlfS5qc29uYCk7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubGFuZ3VhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lc3BhY2VdOiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSB7Li4uZ2xvYmFsUHJvcHN9XHJcbiAgICAgICAgICAgICAgICB0PXsoc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RyaW5nKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnN0YXRlLmxhbmd1YWdlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUubGFuZ3VhZ2VzW3N0cmluZy5zcGxpdChcIi5cIilbMF1dICYmIHRoaXMuc3RhdGUubGFuZ3VhZ2VzW3N0cmluZy5zcGxpdChcIi5cIilbMF1dW3N0cmluZy5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5sYW5ndWFnZXNbc3RyaW5nLnNwbGl0KFwiLlwiKVswXV1bc3RyaW5nLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgY2hhbmdlTGFuZz17KGxhbmcpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ19sYW5nJyxsYW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtsb2FkTGFuZzogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYW5zbGF0ZUhPQzsiXX0=