"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const react_1 = __importDefault(require("react"));
exports.Context = react_1.default.createContext({
    client: null,
    cart: null,
    setCart: () => {
        throw Error("You forgot to wrap this in a Provider object");
    },
});
