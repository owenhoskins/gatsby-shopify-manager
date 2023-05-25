"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClientUnsafe = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useClientUnsafe() {
    const { client } = (0, react_1.useContext)(Context_1.Context);
    return client;
}
exports.useClientUnsafe = useClientUnsafe;
