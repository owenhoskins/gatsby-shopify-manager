"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetLineItem = void 0;
const useCartItems_1 = require("./useCartItems");
function useGetLineItem() {
    const cartItems = (0, useCartItems_1.useCartItems)();
    function getLineItem(variantId) {
        if (cartItems.length < 1) {
            return null;
        }
        const item = cartItems.find(cartItem => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return cartItem.variant.id === variantId;
        });
        if (item == null) {
            return null;
        }
        return item;
    }
    return getLineItem;
}
exports.useGetLineItem = useGetLineItem;
