"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetCartUnsafe = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useSetCartUnsafe() {
    const { setCart } = (0, react_1.useContext)(Context_1.Context);
    return setCart;
}
exports.useSetCartUnsafe = useSetCartUnsafe;
