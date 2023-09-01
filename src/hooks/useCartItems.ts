import { useContext } from "react"
import { ShopifyContext } from "../Context"

export function useCartItems() {
  const { cart } = useContext(ShopifyContext)
  if (cart == null || cart.lineItems == null) {
    return []
  }

  return cart.lineItems
}
