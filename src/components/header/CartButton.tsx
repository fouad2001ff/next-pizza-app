import React from "react";
import { ShoppingCartIcon } from "lucide-react";
import Link from "../link";
import { Routes } from "@/constants/enums";

function CartButton() {
  return (
    <Link href={`/${Routes.CART}`} className="relative group">
      <span className="absolute -right-2 -top-4 bg-primary text-white rounded-full size-5 flex items-center justify-center text-xs font-bold">
        2
      </span>
      <ShoppingCartIcon className="text-accent group-hover:text-primary ease-in-out duration-200 transition-colors w-6 h-6" />
    </Link>
  );
}

export default CartButton;
