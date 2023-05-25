import { useContext } from "react"
import { Context } from "../Context"

export function useCartItems() {
  const { cart } = useContext(Context)
  if (cart == null || cart.lines == null) {
    return []
  }

  return cart.lines
}
