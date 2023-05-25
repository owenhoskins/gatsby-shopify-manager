"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = void 0;
const keys_1 = require("./keys");
const utils_1 = require("../../utils");
function set(key, value) {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
        window.localStorage.setItem(key, value);
    }
}
function get(key) {
    const isBrowser = typeof window !== 'undefined';
    if (!isBrowser) {
        return null;
    }
    try {
        const item = window.localStorage.getItem(key);
        return item;
    }
    catch (_a) {
        return null;
    }
}
function getInitialCart() {
    const existingCartString = get(keys_1.LocalStorageKeys.CART);
    if (existingCartString == null) {
        return null;
    }
    try {
        const existingCart = JSON.parse(existingCartString);
        if (!(0, utils_1.isCart)(existingCart)) {
            return null;
        }
        return existingCart;
    }
    catch (_a) {
        return null;
    }
}
exports.LocalStorage = {
    get,
    set,
    getInitialCart,
};
