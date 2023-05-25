"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContextProvider = void 0;
const react_1 = __importStar(require("react"));
const shopify_buy_1 = __importDefault(require("shopify-buy"));
const Context_1 = require("./Context");
const utils_1 = require("./utils");
function ContextProvider({ shopName, accessToken, children }) {
    if (shopName == null || accessToken == null) {
        throw new Error("Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.");
    }
    const initialCart = utils_1.LocalStorage.getInitialCart();
    const [cart, setCart] = (0, react_1.useState)(initialCart);
    const isCustomDomain = shopName.includes(".");
    const client = shopify_buy_1.default.buildClient({
        storefrontAccessToken: accessToken,
        domain: isCustomDomain ? shopName : `${shopName}.myshopify.com`,
        apiVersion: `2022-04`,
    });
    console.log("Cart: ", client, initialCart, cart);
    console.log("My ContextProvider!");
    (0, react_1.useEffect)(() => {
        function getNewCart() {
            return __awaiter(this, void 0, void 0, function* () {
                const newCart = yield client.checkout.create({
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    buyerIdentity: {
                        countryCode: "DE",
                    },
                });
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                setCart(newCart);
            });
        }
        function refreshExistingCart(cartId) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const refreshedCart = yield client.checkout.fetch(cartId);
                    if (refreshedCart == null) {
                        return getNewCart();
                    }
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const cartHasBeenPurchased = refreshedCart.completedAt != null;
                    if (cartHasBeenPurchased) {
                        getNewCart();
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        setCart(refreshedCart);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            });
        }
        if (cart == null) {
            getNewCart();
        }
        else {
            refreshExistingCart(String(cart.id));
        }
    }, []);
    (0, react_1.useEffect)(() => {
        utils_1.LocalStorage.set(utils_1.LocalStorageKeys.CART, JSON.stringify(cart));
    }, [cart]);
    return (react_1.default.createElement(Context_1.Context.Provider, { value: {
            client,
            cart,
            setCart,
        } }, children));
}
exports.ContextProvider = ContextProvider;
