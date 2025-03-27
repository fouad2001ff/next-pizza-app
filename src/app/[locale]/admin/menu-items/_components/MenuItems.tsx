import Link from "@/app/[locale]/components/link";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/get-locale-in-server";
import { Product } from "@prisma/client";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

const MenuItems = async ({ products }: { products: Product[] }) => {
  const locale = await getCurrentLocale();
   const t = await getTranslations("");
  return (
    <div>
      {products && products.length > 0 ? (
        <ul className="grid grid-cols-3 gap-4 sm:max-w-[625px] mx-auto">
          {products.map((product) => (
            <li key={product.id}>
              <Link
                href={`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}/${product.id}/${Pages.EDIT}`}
                 className="flex-center flex-col py-4"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={100}
                  height={100}
                />
              <h3 className="text-lg text-accent font-medium">
                {product.name}
              </h3>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-accent text-center">{t("noProductsFound")}</p>
      )}
    </div>
  );
};

export default MenuItems;
