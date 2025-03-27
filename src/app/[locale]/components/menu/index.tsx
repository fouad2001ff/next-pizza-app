import React from "react";
import MenuItem from "./MenuItem";
import { ProductWithRelations } from "@/types/product";
import { getTranslations } from "next-intl/server";

const Menu = async ({ items }: { items: ProductWithRelations[] }) => {
  const t = await getTranslations("bestSellers");
  return items.length > 0 ? (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
      {items.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  ) : (   
    <p className="text-accent text-center font-semibold text-2xl">
      {t("noProducts")}
    </p>
  );
};

export default Menu;
