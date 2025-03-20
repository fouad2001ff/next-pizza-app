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
    { id: crypto.randomUUID(), title: t("tabs.profile"), href: Routes.PROFILE },
    {
      id: crypto.randomUUID(),
      title: t("tabs.categories"),
      href: `${Routes.ADMIN}/${Pages.CATEGORIES}`,
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.menuItems"),
      href: `${Routes.ADMIN}/${Pages.MENUITEMS}`,
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.users"),
      href: `${Routes.ADMIN}/${Pages.USERS}`,
    },
    {
      id: crypto.randomUUID(),
      title: t("tabs.orders"),
      href: `${Routes.ADMIN}/${Pages.ORDERS}`,
    },
  ];

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 1
      ? pathname.startsWith(`/${locale}/${href}`)
      : pathname === `/${locale}/${href}`;
  };
  return (
    <nav className="mt-20">
      <ul className="flex-center gap-4 flex-wrap">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={tab.href}
              className={`!text-black hover:!text-white
                  ${isActiveTab(tab.href) ? "!text-white" : ""}
                ${buttonVariants({
                  variant: isActiveTab(tab.href) ? "default" : "outline",
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
