"use client";
import React, { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Button } from "@/app/[locale]/components/ui/button";
import { usePathname } from "next/navigation";
import { Routes } from "@/constants/enums";
import Link from "../link";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import useLocale from "@/lib/get-locale-in-client";
import AuthButtons from "./AuthButtons";
import LanguageSwitcher from "./LanguageSwitcher";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const locale: string = useLocale();
  const t = useTranslations("nav");

  const { data: session } = useSession();

  const links = [
    { id: crypto.randomUUID(), title: t("menu"), href: Routes.MENU },
    { id: crypto.randomUUID(), title: t("about"), href: Routes.ABOUT },
    { id: crypto.randomUUID(), title: t("contact"), href: Routes.CONTACT },
  ];

  // Function to determine if a link is active
  const isActive = (href: string) => pathname === `/${locale}/${href}`;

  const isAdmin = session?.user.role === UserRole.ADMIN;

  return (
    <nav className="order-last lg:order-none">
      {/* Mobile Menu Toggle Button */}
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpenMenu(true)}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </Button>

      {/* Navigation Links */}
      <ul
        className={cn(
          "absolute lg:static top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 ease-in-out h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10",
          openMenu ? "left-0 z-50" : "-left-full"
        )}
      >
        {/* Mobile Menu Close Button */}
        <Button
          variant="secondary"
          size="sm"
          className="lg:hidden absolute top-10 right-10 "
          onClick={() => setOpenMenu(false)}
          aria-label="Close menu"
        >
          <XIcon className="!w-6 !h-6" />
        </Button>

        {/* Render Links */}
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${locale}/${link.href}`}
              className={cn(
                " font-semibold transition-colors duration-200 hover:text-primary",
                isActive(link.href) ? "text-primary" : "text-accent"
              )}
              onClick={() => setOpenMenu(false)}
            >
              {link.title}
            </Link>
          </li>
        ))}

        {session && (
          <li>
            <Link
              href={
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              }
              className={`text-accent hover:text-primary duration-200 transition-colors font-semibold ${
                pathname.startsWith(
                  isAdmin
                    ? `/${locale}/${Routes.ADMIN}`
                    : `/${locale}/${Routes.PROFILE}`
                )
                  ? "text-primary"
                  : ""
              }`}
              onClick={() => setOpenMenu(false)}
            >
              {isAdmin ? t("admin") : t("profile")}
            </Link>
          </li>
        )}

        <div
          className="lg:hidden flex flex-col gap-4 mt-8"
          onClick={() => setOpenMenu(false)}
        >
          <AuthButtons />
          <LanguageSwitcher />
        </div>
      </ul>
    </nav>
  );
}

export default Navbar;
