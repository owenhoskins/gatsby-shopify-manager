"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCart = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useCart() {
    const { cart } = (0, react_1.useContext)(Context_1.Context);
    return cart;
}
exports.useCart = useCart;
