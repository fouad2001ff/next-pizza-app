import { CartItem } from "@/redux/features/cart/cartSlice";

export const DELIVERY_FEE = 5.0;
export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};

export const getItemQuantity = (cart: CartItem[], itemId: string): number => {
  return cart.find((item) => item.id === itemId)?.quantity ?? 0;
};

export const getSubTotal = (cart: CartItem[]): number => {
  return cart.reduce((acc, item) => {
    // Calculate the price of the selected size (default to 0 if no size is selected)
    const sizePrice = item.sizes?.price || 0;

    // Calculate the total price of extras (default to 0 if no extras are selected)
    const extrasTotal =
      item.extras?.reduce((sum, extra) => sum + extra.price, 0) || 0;

    // Calculate the total price for this item (base price + size price + extras total) * quantity
    const itemTotal =
      (item.basePrice + sizePrice + extrasTotal) * item.quantity!;

    // Add the item total to the accumulator
    return acc + itemTotal;
  }, 0);
};

export const getTotalAmount = (cart: CartItem[]) => {
  return getSubTotal(cart) + DELIVERY_FEE;
};
