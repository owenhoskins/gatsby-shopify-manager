import { useContext } from "react"
import { Context } from "../Context"

export function useCheckoutUrl(): string | null {
  const { cart } = useContext(Context)
  if (cart == null) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return cart.webUrl
}
