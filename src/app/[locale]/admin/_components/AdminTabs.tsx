"use client";
import { Pages, Routes } from "@/constants/enums";
import { useTranslations } from "next-intl";
import React from "react";
import Link from "../../components/link";
import { usePathname } from "next/navigation";
import useLocale from "@/lib/get-locale-in-client";
import { buttonVariants } from "../../components/ui/button";

const AdminTabs = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("admin");
  const tabs = [
    {
      id: crypto.randomUUID(),
      title: t("tabs.profile"),
      path: `/${locale}/${Routes.PROFILE}`,
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.categories"),
      path: `/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`,
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.menuItems"),
      href: `${Pages.MENUITEMS}`,
      path: `/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}`,
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.users"),
      path: `/${locale}/${Routes.ADMIN}/${Pages.USERS}`,
    },
    
  ];


  return (
    <nav className="mt-20">
      <ul className="flex-center gap-4 flex-wrap">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={tab.path}
              className={`!text-black hover:!text-white
      ${pathname === tab.path ? "!text-white" : ""}
    ${buttonVariants({
      variant: pathname === tab.path ? "default" : "outline",
    })}`}
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminTabs;
