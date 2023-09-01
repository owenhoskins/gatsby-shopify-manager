import { useContext } from "react"
import { ShopifyContext } from "../Context"

export function useCart() {
  const { cart } = useContext(ShopifyContext)
  return cart
}
