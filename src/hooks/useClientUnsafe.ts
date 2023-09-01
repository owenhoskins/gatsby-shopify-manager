import { useContext } from "react"
import { ShopifyContext } from "../Context"

export function useClientUnsafe() {
  const { client } = useContext(ShopifyContext)
  return client
}
