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
exports.useUpdateItemQuantity = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
const useGetLineItem_1 = require("./useGetLineItem");
function useUpdateItemQuantity() {
    const { client, cart, setCart } = (0, react_1.useContext)(Context_1.Context);
    const getLineItem = (0, useGetLineItem_1.useGetLineItem)();
    function updateItemQuantity(variantId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            if (variantId == null) {
                throw new Error("Must provide a variant id");
            }
            if (quantity == null || Number(quantity) < 0) {
                throw new Error("Quantity must be greater than 0");
            }
            const lineItem = getLineItem(variantId);
            if (lineItem == null) {
                throw new Error(`Item with variantId ${variantId} not in cart`);
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newCart = yield client.checkout.updateLineItems(cart.id, [
                { id: lineItem.id, quantity },
            ]);
            setCart(newCart);
        });
    }
    return updateItemQuantity;
}
exports.useUpdateItemQuantity = useUpdateItemQuantity;
