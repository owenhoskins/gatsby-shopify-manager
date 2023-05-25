"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.wrapRootElement = void 0;
var _react = _interopRequireDefault(require("react"));
var _ = require("./");
var _defaults = _interopRequireDefault(require("./defaults"));
var wrapRootElement = function wrapRootElement(_ref, themeOptions) {
  var element = _ref.element;
  var _withDefaults = (0, _defaults.default)(themeOptions),
    shouldWrapRootElementWithProvider = _withDefaults.shouldWrapRootElementWithProvider,
    shopName = _withDefaults.shopName,
    accessToken = _withDefaults.accessToken;
  if (shouldWrapRootElementWithProvider === false) {
    return element;
  }
  var missingApiInformation = shopName == null || accessToken == null;
  if (missingApiInformation) {
    throw new Error("gatsby-theme-shopify-manager: You forgot to pass in a shopName or accessToken to the theme options");
  }
  return /*#__PURE__*/_react.default.createElement(_.ContextProvider, {
    shopName: shopName,
    accessToken: accessToken
  }, element);
};
exports.wrapRootElement = wrapRootElement;