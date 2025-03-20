import { formatCurrency } from "@/lib/formatters";
import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";
import { ProductWithRelations } from "@/types/product";

const MenuItem = ({ item }: { item: ProductWithRelations }) => {
  return (
    <li
      className="py-8 px-6 rounded-lg text-center bg-gray-100 space-y-4
    group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all"
    >
      <div className="relative w-48 h-48 mx-auto">
        <Image
          src={item.image}
          alt={item.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="flex-between">
        <h4 className="font-semibold text-xl my-3">{item.name}</h4>
        <strong>{formatCurrency(item.basePrice)}</strong>
      </div>
      <p className="text-gray-500 text-center text-md line-clamp-3">
        {item.description}
      </p>
      <AddToCartButton item={item} />
    </li>
  );
};

export default MenuItem;
