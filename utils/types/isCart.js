"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCart = void 0;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCart(potentialCart) {
    return (potentialCart != null &&
        potentialCart.id != null &&
        potentialCart.webUrl != null &&
        potentialCart.lineItems != null &&
        potentialCart.type != null &&
        potentialCart.type.name === 'Checkout' &&
        potentialCart.type.kind === 'OBJECT');
}
exports.isCart = isCart;
