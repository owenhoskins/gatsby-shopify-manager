"use strict";

// eslint-disable-next-line @typescript-eslint/no-var-requires
var withDefaults = require("./defaults");
module.exports = function (themeOptions) {
  var options = withDefaults(themeOptions);
  var shouldConfigureSourcePlugin = options.shouldConfigureSourcePlugin,
    shouldWrapRootElementWithProvider = options.shouldWrapRootElementWithProvider,
    shopName = options.shopName,
    accessToken = options.accessToken;
  var needsApiInformation = shouldConfigureSourcePlugin === true || shouldWrapRootElementWithProvider === true;
  var missingApiInformation = shopName == null || accessToken == null;
  if (needsApiInformation && missingApiInformation) {
    throw new Error('gatsby-theme-shopify-manager: You forgot to pass in a shopName or accessToken to the theme options');
  }
  var shopifySourcePlugin = shouldConfigureSourcePlugin ? {
    resolve: "gatsby-source-shopify",
    options: {
      shopName: shopName,
      accessToken: accessToken
    }
  } : null;
  var plugins = ['gatsby-plugin-typescript', shopifySourcePlugin].filter(Boolean);
  return {
    plugins: plugins
  };
};