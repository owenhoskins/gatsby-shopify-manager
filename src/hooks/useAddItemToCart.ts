import { AttributeInput } from "../types"
import { useAddItemsToCart } from "./useAddItemsToCart"

export function useAddItemToCart() {
  const addItemsToCart = useAddItemsToCart()

  async function addItemToCart(
    variantId: number | string,
    quantity: number,
    customAttributes?: AttributeInput[]
  ) {
    const item = [{ variantId, quantity, customAttributes }]
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return addItemsToCart(item)
  }

  return addItemToCart
}
