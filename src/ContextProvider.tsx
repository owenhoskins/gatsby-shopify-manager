import React, { useEffect, useMemo, useState } from "react"
import ShopifyBuy from "shopify-buy"
import { ShopifyContext } from "./Context"
import { LocalStorage, LocalStorageKeys } from "./utils"

interface Props {
  shopName: string
  accessToken: string
  language: string
  children: React.ReactNode
}

// @TODO: consdier using `buildClient` wrapped in useMemo() and call it from inside the functional component

let client

export function ManagerContextProvider({
  shopName,
  accessToken,
  children,
  language,
}: Props) {
  if (shopName == null || accessToken == null) {
    throw new Error(
      "Unable to build shopify-buy client object. Please make sure that your access token and domain are correct."
    )
  }

  const initialCart = LocalStorage.getInitialCart()
  const [cart, setCart] = useState<ShopifyBuy.Cart | null>(initialCart)
  const isCustomDomain = shopName.includes(".")

  function ShopifyBuyInit(language) {
    if (client?.config?.language && client?.config.language !== language) {
      // clear cart for new language
      setCart(null)
    }

    client = useMemo(
      () =>
        ShopifyBuy.buildClient({
          storefrontAccessToken: accessToken,
          domain: isCustomDomain ? shopName : `${shopName}.myshopify.com`,
          apiVersion: `2022-10`,
          language, // "en-GB"
        }),
      [language]
    )
  }

  ShopifyBuyInit(language)

  // console.log("Cart: ", client.config, initialCart, cart)

  useEffect(() => {
    async function getNewCart() {
      let newCart
      const storedCart = LocalStorage.getInitialCart()
      // const item = [{ variantId, quantity, customAttributes }]
      if (storedCart?.lineItems) {
        newCart = await client.checkout.create({
          lineItems: storedCart.lineItems.map(
            ({ variant, quantity, customAttributes }) => ({
              variantId: variant.id,
              quantity,
              customAttributes: customAttributes.map(({ key, value }) => ({
                key,
                value,
              })),
            })
          ),
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else {
        newCart = await client.checkout.create()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      }

      setCart(newCart)
      return newCart
    }

    async function refreshExistingCart(cartId: string) {
      try {
        const refreshedCart = await client.checkout.fetch(cartId)

        if (refreshedCart == null) {
          return getNewCart()
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cartHasBeenPurchased = refreshedCart.completedAt != null

        if (cartHasBeenPurchased) {
          getNewCart()
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setCart(refreshedCart)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (cart == null) {
      getNewCart()
    } else {
      refreshExistingCart(String(cart.id))
    }
  }, [language])

  useEffect(() => {
    LocalStorage.set(LocalStorageKeys.CART, JSON.stringify(cart))
  }, [cart])

  return (
    <ShopifyContext.Provider
      value={{
        client,
        cart,
        setCart,
      }}
    >
      {children}
    </ShopifyContext.Provider>
  )
}
