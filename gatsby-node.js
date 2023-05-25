"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
/*
  In order to access user options throughout the app, we have to
  add them as a node within the Graphql.

  This creates a type called "CoreOptions" on the GraphQL schema.
*/
exports.createSchemaCustomization = function (_ref) {
  var actions = _ref.actions;
  var createTypes = actions.createTypes;
  createTypes("type\n    CoreOptions implements Node {\n      shopName: String\n      accessToken: String\n    }");
};

/*
  In order to access user options throughout the app, we have to
  add them as a node within the Graphql.

  This takes options passed in to a child's gatsby-config and creates
  a node for them.

  Further reading:
  • https://www.gatsbyjs.org/docs/node-apis/#sourceNodes
  • https://www.christopherbiscardi.com/post/applying-theme-options-using-custom-configuration-nodes/
  • https://www.erichowey.dev/writing/examples-of-using-options-in-gatsby-themes/
*/
exports.sourceNodes = function (_ref2, _ref3) {
  var createNode = _ref2.actions.createNode,
    createContentDigest = _ref2.createContentDigest;
  var _ref3$shopName = _ref3.shopName,
    shopName = _ref3$shopName === void 0 ? "" : _ref3$shopName,
    _ref3$accessToken = _ref3.accessToken,
    accessToken = _ref3$accessToken === void 0 ? "" : _ref3$accessToken;
  var coreOptions = {
    shopName: shopName,
    accessToken: accessToken
  };
  createNode((0, _extends2.default)({}, coreOptions, {
    id: "gatsby-theme-shopify-manager",
    parent: null,
    children: [],
    internal: {
      description: "Core Options",
      type: "CoreOptions",
      content: JSON.stringify(coreOptions),
      contentDigest: createContentDigest(JSON.stringify(coreOptions))
    }
  }));
};