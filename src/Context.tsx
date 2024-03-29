import React from "react"
import ShopifyBuy from "shopify-buy"

interface ContextShape {
  client: ShopifyBuy.GraphQLJSClient | null
  cart: ShopifyBuy.Cart | null
  setCart: React.Dispatch<React.SetStateAction<ShopifyBuy.Cart | null>>
}

export const ShopifyContext = React.createContext<ContextShape>({
  client: null,
  cart: null,
  setCart: () => {
    throw Error("You forgot to wrap this in a Provider object")
  },
})
