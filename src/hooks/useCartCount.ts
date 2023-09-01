import { useContext } from "react"
import { ShopifyContext } from "../Context"

export function useCartCount() {
  const { cart } = useContext(ShopifyContext)
  if (cart == null || cart.lineItems?.length < 1) {
    return 0
  }

  const count = cart.lineItems?.reduce((totalCount, lineItem) => {
    return totalCount + lineItem.quantity
  }, 0)

  return count
}
