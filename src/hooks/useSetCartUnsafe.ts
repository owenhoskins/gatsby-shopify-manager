import { useContext } from "react"
import { ShopifyContext } from "../Context"

export function useSetCartUnsafe() {
  const { setCart } = useContext(ShopifyContext)
  return setCart
}
