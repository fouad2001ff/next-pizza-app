'use client'
import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import Link from "../link";
import { Routes } from "@/constants/enums";
import { getCartQuantity } from "@/lib/cart";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { usePathname } from "next/navigation";

function CartButton() {
  const cart = useAppSelector(selectCartItems)
  const cartQuantity = getCartQuantity(cart)
   const pathname = usePathname();
    const locale = pathname.split("/")[1];
  return (
    <Link href={`/${locale}/${Routes.CART}`} className="relative group">
      <span className="absolute -right-2 -top-4 bg-primary text-white rounded-full size-5 flex items-center justify-center text-xs font-bold">
        {cartQuantity}
      </span>
      <ShoppingCartIcon className="text-accent group-hover:text-primary ease-in-out duration-200 transition-colors w-6 h-6" />
    </Link>
  );
}

export default CartButton;
