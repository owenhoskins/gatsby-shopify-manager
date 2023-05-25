"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCheckoutUrl = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useCheckoutUrl() {
    const { cart } = (0, react_1.useContext)(Context_1.Context);
    if (cart == null) {
        return null;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return cart.webUrl;
}
exports.useCheckoutUrl = useCheckoutUrl;
