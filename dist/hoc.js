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
                  return fetch("".concat(window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + location.port : '')).concat(path, "/").concat(window.localStorage.getItem('_lang'), "/").concat(namespace, ".json"));

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ob2MuanMiXSwibmFtZXMiOlsiZmV0Y2giLCJyZXF1aXJlIiwiVHJhbnNsYXRlSE9DIiwiV3JhcHBlZENvbXBvbmVudCIsImdsb2JhbFByb3BzIiwibmFtZXNwYWNlcyIsInByb3BzIiwicGF0aCIsImxhbmd1YWdlcyIsIm4iLCJsZW5ndGgiLCJuYW1lc3BhY2UiLCJkYXRhIiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsInN0YXRlIiwibG9hZExhbmciLCJzZXRJdGVtIiwiZGVmYXVsdExhbmciLCJzc3IiLCJzc3JHZXRKc29uIiwidGhlbiIsInNldFN0YXRlIiwiZ2V0SnNvbiIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0bmFtZSIsInBvcnQiLCJyZXNwb25zZSIsImpzb24iLCJzdHJpbmciLCJzcGxpdCIsImxhbmciLCJyZWxvYWQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0FBQ0EsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsWUFBRCxDQUFyQjs7QUFFQSxTQUFTQyxZQUFULENBQXNCQyxnQkFBdEIsRUFBd0NDLFdBQXhDLEVBQXFEQyxVQUFyRCxFQUFpRTtBQUFBOztBQUM3RDtBQUFBO0FBQUE7QUFBQTs7QUFFSSw4QkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBO0FBQ2YsOEhBQU1BLEtBQU47QUFEZSxrR0FrRFQsVUFBQ0MsSUFBRCxFQUFPRixVQUFQLEVBQXNCO0FBQzVCLFlBQUlHLFNBQVMsR0FBRyxFQUFoQjs7QUFDQSxhQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdKLFVBQVUsQ0FBQ0ssTUFBL0IsRUFBdUNELENBQUMsRUFBeEMsRUFBNEM7QUFDeEMsY0FBSUUsU0FBUyxHQUFHTixVQUFVLENBQUNJLENBQUQsQ0FBMUI7O0FBQ0EsY0FBSUcsSUFBSSxHQUFHWCxPQUFPLFdBQUlNLElBQUosY0FB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LElBQUQsRUFBUTtBQUNoQixnQkFBRyxPQUFPcEIsTUFBUCxLQUFrQixXQUFyQixFQUFpQztBQUM3QkEsY0FBQUEsTUFBTSxDQUFDQyxZQUFQLENBQW9CSSxPQUFwQixDQUE0QixPQUE1QixFQUFvQ2UsSUFBcEM7QUFDQXBCLGNBQUFBLE1BQU0sQ0FBQ1ksUUFBUCxDQUFnQlMsTUFBaEIsR0FGNkIsQ0FHN0I7QUFDSDtBQUNKO0FBWkUsV0FBUDtBQWNIO0FBaEZMO0FBQUE7QUFBQSxJQUFzQ0MsZ0JBQXRDO0FBa0ZIOztlQUVjakMsWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmNvbnN0IGZldGNoID0gcmVxdWlyZShcIm5vZGUtZmV0Y2hcIik7XHJcblxyXG5mdW5jdGlvbiBUcmFuc2xhdGVIT0MoV3JhcHBlZENvbXBvbmVudCwgZ2xvYmFsUHJvcHMsIG5hbWVzcGFjZXMpIHtcclxuICAgIHJldHVybiBjbGFzcyBXcmFwcGVyQ29tcG9uZW50IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2VzOiB7fSxcclxuICAgICAgICAgICAgICAgIGxvYWRMYW5nOiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb21wb25lbnREaWRNb3VudCgpe1xyXG4gICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnX2xhbmcnKSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdfbGFuZycsIGdsb2JhbFByb3BzLmRlZmF1bHRMYW5nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGdsb2JhbFByb3BzLnNzciA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNzckdldEpzb24oZ2xvYmFsUHJvcHMucGF0aCwgbmFtZXNwYWNlcykudGhlbihsYW5ndWFnZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYW5ndWFnZXM6IGxhbmd1YWdlcyB9KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFuZ3VhZ2VzID0gdGhpcy5nZXRKc29uKGdsb2JhbFByb3BzLnBhdGgsIG5hbWVzcGFjZXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhbmd1YWdlczogbGFuZ3VhZ2VzIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb21wb25lbnREaWRVcGRhdGUoKXtcclxuICAgICAgICAgICAgaWYodGhpcy5zdGF0ZS5sb2FkTGFuZyA9PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGlmIChnbG9iYWxQcm9wcy5zc3IgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3NyR2V0SnNvbihnbG9iYWxQcm9wcy5wYXRoLCBuYW1lc3BhY2VzKS50aGVuKGxhbmd1YWdlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYW5ndWFnZXM6IGxhbmd1YWdlcywgbG9hZExhbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsYW5ndWFnZXMgPSB0aGlzLmdldEpzb24oZ2xvYmFsUHJvcHMucGF0aCwgbmFtZXNwYWNlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGxhbmd1YWdlczogbGFuZ3VhZ2VzLCBsb2FkTGFuZzogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFzeW5jIHNzckdldEpzb24ocGF0aCwgbmFtZXNwYWNlcykge1xyXG4gICAgICAgICAgICBsZXQgbGFuZ3VhZ2VzID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmFtZXNwYWNlcy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzcGFjZSA9IG5hbWVzcGFjZXNbbl07XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke3dpbmRvdy5sb2NhdGlvbi5wcm90b2NvbCsnLy8nK3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSsod2luZG93LmxvY2F0aW9uLnBvcnQgPyAnOicrbG9jYXRpb24ucG9ydDogJycpfSR7cGF0aH0vJHt3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19sYW5nJyl9LyR7bmFtZXNwYWNlfS5qc29uYClcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubGFuZ3VhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lc3BhY2VdOiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldEpzb24gPSAocGF0aCwgbmFtZXNwYWNlcykgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbGFuZ3VhZ2VzID0ge307XHJcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbmFtZXNwYWNlcy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5hbWVzcGFjZSA9IG5hbWVzcGFjZXNbbl07XHJcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlcXVpcmUoYCR7cGF0aH0vJHt3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19sYW5nJyl9LyR7bmFtZXNwYWNlfS5qc29uYCk7XHJcbiAgICAgICAgICAgICAgICBsYW5ndWFnZXMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLi4ubGFuZ3VhZ2VzLFxyXG4gICAgICAgICAgICAgICAgICAgIFtuYW1lc3BhY2VdOiBkYXRhXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGxhbmd1YWdlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJlbmRlcigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxXcmFwcGVkQ29tcG9uZW50IHsuLi50aGlzLnByb3BzfSB7Li4uZ2xvYmFsUHJvcHN9XHJcbiAgICAgICAgICAgICAgICB0PXsoc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUubGFuZ3VhZ2VzW3N0cmluZy5zcGxpdChcIi5cIilbMF1dICYmIHRoaXMuc3RhdGUubGFuZ3VhZ2VzW3N0cmluZy5zcGxpdChcIi5cIilbMF1dW3N0cmluZy5zcGxpdChcIi5cIilbMV1dXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5zdGF0ZS5sYW5ndWFnZXNbc3RyaW5nLnNwbGl0KFwiLlwiKVswXV1bc3RyaW5nLnNwbGl0KFwiLlwiKVsxXV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgY2hhbmdlTGFuZz17KGxhbmcpPT57XHJcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ19sYW5nJyxsYW5nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzLnNldFN0YXRlKHtsb2FkTGFuZzogdHJ1ZX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgIC8+O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRyYW5zbGF0ZUhPQzsiXX0=