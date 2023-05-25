"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCartCount = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useCartCount() {
    const { cart } = (0, react_1.useContext)(Context_1.Context);
    if (cart == null || cart.lines.length < 1) {
        return 0;
    }
    const count = cart.lines.reduce((totalCount, lineItem) => {
        return totalCount + lineItem.quantity;
    }, 0);
    return count;
}
exports.useCartCount = useCartCount;
