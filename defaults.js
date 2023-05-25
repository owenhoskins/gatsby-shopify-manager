"use strict";

// got this pattern/idea from https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-theme-blog-core/gatsby-config.js
module.exports = function (themeOptions) {
  var shouldConfigureSourcePlugin = themeOptions.shouldConfigureSourcePlugin != null ? themeOptions.shouldConfigureSourcePlugin : true;
  var shouldWrapRootElementWithProvider = themeOptions.shouldWrapRootElementWithProvider != null ? themeOptions.shouldWrapRootElementWithProvider : true;
  var shopName = themeOptions.shopName || null;
  var accessToken = themeOptions.accessToken || null;
  return {
    shouldConfigureSourcePlugin: shouldConfigureSourcePlugin,
    shouldWrapRootElementWithProvider: shouldWrapRootElementWithProvider,
    shopName: shopName,
    accessToken: accessToken
  };
};