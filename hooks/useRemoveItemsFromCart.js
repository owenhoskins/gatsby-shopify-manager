"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRemoveItemsFromCart = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
const useGetLineItem_1 = require("./useGetLineItem");
function useRemoveItemsFromCart() {
    const { client, cart, setCart } = (0, react_1.useContext)(Context_1.Context);
    const getLineItem = (0, useGetLineItem_1.useGetLineItem)();
    function removeItemsFromCart(variantIds) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cart == null || client == null) {
                throw new Error("Called removeItemsFromCart too soon");
            }
            if (variantIds.length < 1) {
                throw new Error("Must include at least one item to remove");
            }
            const lineItemIds = variantIds.map(variantId => {
                const lineItem = getLineItem(variantId);
                if (lineItem === null) {
                    throw new Error(`Could not find line item in cart with variant id: ${variantId}`);
                }
                return String(lineItem.id);
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newCart = yield client.checkout.removeLineItems(cart.id, lineItemIds);
            setCart(newCart);
        });
    }
    return removeItemsFromCart;
}
exports.useRemoveItemsFromCart = useRemoveItemsFromCart;
