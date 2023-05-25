"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCartItems = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useCartItems() {
    const { cart } = (0, react_1.useContext)(Context_1.Context);
    if (cart == null || cart.lines == null) {
        return [];
    }
    return cart.lines;
}
exports.useCartItems = useCartItems;
