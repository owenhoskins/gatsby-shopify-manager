"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCoreOptions = void 0;
const gatsby_1 = require("gatsby");
function useCoreOptions() {
    const { coreOptions } = (0, gatsby_1.useStaticQuery)((0, gatsby_1.graphql) `
    query CoreOptionsQuery {
      coreOptions(id: {eq: "gatsby-theme-shopify-manager"}) {
        shopName
        accessToken
      }
    }
  `);
    return coreOptions;
}
exports.useCoreOptions = useCoreOptions;
