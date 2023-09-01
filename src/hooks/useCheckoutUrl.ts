import { useContext } from "react"
import { ShopifyContext } from "../Context"

export function useCheckoutUrl(): string | null {
  const { cart } = useContext(ShopifyContext)
  if (cart == null) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return cart.webUrl
}
