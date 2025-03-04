import React from "react";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";

const Menu = ({ items }: { items: ProductWithRelations[] }) => {
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center font-semibold text-2xl">
      No Products Found
    </p>
  );
};

export default Menu;
