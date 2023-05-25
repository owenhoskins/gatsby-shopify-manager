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
exports.useAddItemToCart = void 0;
const useAddItemsToCart_1 = require("./useAddItemsToCart");
function useAddItemToCart() {
    const addItemsToCart = (0, useAddItemsToCart_1.useAddItemsToCart)();
    function addItemToCart(variantId, quantity, customAttributes) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = [{ variantId, quantity, customAttributes }];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return addItemsToCart(item);
        });
    }
    return addItemToCart;
}
exports.useAddItemToCart = useAddItemToCart;