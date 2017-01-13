"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// IE8 Polyfill for .textContent
if (Object.defineProperty && Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(Element.prototype, "textContent") && !Object.getOwnPropertyDescriptor(Element.prototype, "textContent").get) {
  (function () {
    var innerText = Object.getOwnPropertyDescriptor(Element.prototype, "innerText");
    Object.defineProperty(Element.prototype, "textContent", {
      get: function get() {
        return innerText.get.call(this);
      },
      set: function set(s) {
        return innerText.set.call(this, s);
      }
    });
  })();
}

var TextEditable = function (_React$Component) {
  _inherits(TextEditable, _React$Component);

  function TextEditable() {
    _classCallCheck(this, TextEditable);

    var _this = _possibleConstructorReturn(this, (TextEditable.__proto__ || Object.getPrototypeOf(TextEditable)).call(this));

    _this.emitChange = _this.emitChange.bind(_this);
    return _this;
  }

  _createClass(TextEditable, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          tagName = _props.tagName,
          text = _props.text,
          children = _props.children,
          props = _objectWithoutProperties(_props, ["tagName", "text", "children"]);

      return _react2.default.createElement(tagName || 'div', _extends({}, props, {
        ref: function ref(e) {
          return _this2.htmlEl = e;
        },
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        contentEditable: !this.props.disabled
      }), children);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      // We need not rerender if the change of props simply reflects the user's
      // edits. Rerendering in this case would make the cursor/caret jump.
      return (
        // Rerender if there is no element yet... (somehow?)
        !this.htmlEl
        // ...or if html really changed... (programmatically, not by user edit)
        || nextProps.text !== this.htmlEl.textContent && nextProps.text !== this.props.text
        // ...or if editing is enabled or disabled.
        || this.props.disabled !== nextProps.disabled
      );
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var text = this.props.text;

      this.htmlEl.textContent = text;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.htmlEl && this.props.text !== this.htmlEl.textContent) {
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        this.htmlEl.textContent = this.props.text;
      }
    }
  }, {
    key: "emitChange",
    value: function emitChange(evt) {
      if (!this.htmlEl) return;
      var textContent = this.htmlEl.textContent;
      if (this.props.onChange && textContent !== this.lastTextContent) {
        evt.target = { value: textContent };
        this.props.onChange(evt);
      }
      this.lastTextContent = textContent;
    }
  }]);

  return TextEditable;
}(_react2.default.Component);

TextEditable.propTypes = {
  text: _react.PropTypes.string,
  tagName: _react.PropTypes.string,
  children: _react.PropTypes.node,
  onBlur: _react.PropTypes.func,
  disabled: _react.PropTypes.bool
};
exports.default = TextEditable;
module.exports = exports["default"];