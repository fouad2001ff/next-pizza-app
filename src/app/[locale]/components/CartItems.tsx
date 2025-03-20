"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeCartItem,
  selectCartItems,
} from "@/redux/features/cart/cartSlice";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { DELIVERY_FEE, getSubTotal } from "@/lib/cart";
import { useEffect } from "react";
const CartItem = () => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const subTotal = getSubTotal(cart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart])
  return (
    <div>
      {cart && cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className=" flex-between flex-row gap-6  ">
                  <div className="flex items-center gap-2">
                    <div className=" relative w-24 h-24">
                    <Image
  src={item.image}
  alt={item.name}
  className="object-contain"
  fill
  priority
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

                    </div>
                    <div>
                      <h4 className="font-semibold md:text-lg">{item.name}</h4>
                      <div className=" flex-between">
                        <span className="text-sm text-accent">
                          Size: {item.sizes?.name}
                        </span>
                        <span className="text-sm text-black">
                          {" "}
                          x{item.quantity}
                        </span>
                      </div>
                      {item.extras && item.extras.length > 0 && (
                        <div className="flex">
                          <span>Extras:</span>
                          <ul>
                            {item.extras?.map((extra) => (
                              <li key={extra.id}>
                                <span>
                                  {extra.name} {formatCurrency(extra.price)}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <strong>{formatCurrency(item.basePrice)}</strong>
                    <Button
                      onClick={() => dispatch(removeCartItem({ id: item.id }))}
                      variant="secondary"
                      className="border"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className=" flex flex-col justify-end items-end  pt-6">
            <div className=" font-medium gap-2">
              <span className="text-accent">Subtotal:</span>
              <strong>{formatCurrency(subTotal)}</strong>
            </div>
            <div className="  font-medium ">
              <span className="text-accent">Delivery:</span>
              <strong>{formatCurrency(DELIVERY_FEE)}</strong>
            </div>
            <div >
              <span className="font-bold text-accent">Total:</span>
              <strong>{formatCurrency(subTotal + DELIVERY_FEE)}</strong>
            </div>
          </div>
        </>
      ) : (
        <p className="text-accent">There are no items in your cart. Add some</p>
      )}
    </div>
  );
};

export default CartItem;
