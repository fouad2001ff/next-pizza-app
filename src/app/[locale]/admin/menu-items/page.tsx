import { getCurrentLocale } from "@/lib/get-locale-in-server";
import Link from "../../components/link";
import { getTranslations } from "next-intl/server";
import { Languages, Pages, Routes } from "@/constants/enums";
import { buttonVariants } from "../../components/ui/button";
import {  ArrowRightCircle } from "lucide-react";
import MenuItems from "./_components/MenuItems";
import { getProducts } from "@/server/db/product";

const MenuItemsPage = async () => {
  const locale = await getCurrentLocale();
  const t = await getTranslations("admin");
  const products = await getProducts();
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <Link
            className={`${buttonVariants({
              variant: "outline",
            })}  !flex !mx-auto !w-80 !h-10 mb-8 `}
            href={`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}/${Pages.NEW}`}
          >
            {t("menu-items.createNewMenuItem")}
            <ArrowRightCircle className={`!w-5 !h-5 ${
                locale === Languages.ARABIC ? 'rotate-180' : ""
            }`} />
            
          </Link>
          <MenuItems products={products} />
        </div>
      </section>
    </main>
  );
};

export default MenuItemsPage;
