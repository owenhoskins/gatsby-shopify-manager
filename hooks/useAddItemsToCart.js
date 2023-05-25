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
exports.useAddItemsToCart = void 0;
const react_1 = require("react");
const Context_1 = require("../Context");
function useAddItemsToCart() {
    const { client, cart, setCart } = (0, react_1.useContext)(Context_1.Context);
    console.log("useAddItemsToCart Context: ", (0, react_1.useContext)(Context_1.Context));
    function addItemsToCart(items) {
        return __awaiter(this, void 0, void 0, function* () {
            if (cart == null || client == null) {
                throw new Error("Called addItemsToCart too soon");
            }
            if (items.length < 1) {
                throw new Error("Must include at least one line item, empty line items found");
            }
            items.forEach(item => {
                if (item.variantId == null) {
                    throw new Error(`Missing variantId in item`);
                }
                if (item.quantity == null) {
                    throw new Error(`Missing quantity in item with variant id: ${item.variantId}`);
                }
                else if (typeof item.quantity != "number") {
                    throw new Error(`Quantity is not a number in item with variant id: ${item.variantId}`);
                }
                else if (item.quantity < 1) {
                    throw new Error(`Quantity must not be less than one in item with variant id: ${item.variantId}`);
                }
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const newCart = yield client.checkout.addLineItems(cart.id, items);
            setCart(newCart);
        });
    }
    return addItemsToCart;
}
exports.useAddItemsToCart = useAddItemsToCart;
