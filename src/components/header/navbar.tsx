"use client";
import React, { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import Link from "../link";
import { cn } from "@/lib/utils";

// Navigation links
const links = [
  { id: crypto.randomUUID(), title: "Menu", href: Routes.MENU },
  { id: crypto.randomUUID(), title: "About", href: Routes.ABOUT },
  { id: crypto.randomUUID(), title: "Contact", href: Routes.CONTACT },
  {
    id: crypto.randomUUID(),
    title: "Login",
    href: `${Routes.AUTH}/${Pages.LOGIN}`,
    isLoginLink: true,
  },
];

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();

  // Function to determine if a link is active
  const isActive = (href: string) => pathname.startsWith(`/${href}`);

  return (
    <nav className="flex flex-1">
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
          className="lg:hidden absolute top-10 right-10"
          onClick={() => setOpenMenu(false)}
          aria-label="Close menu"
        >
          <XIcon className="!w-6 !h-6" />
        </Button>

        {/* Render Links */}
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${link.href}`}
              className={cn(
                "font-semibold transition-colors duration-200",
                link.isLoginLink
                  ? cn(buttonVariants({ size: "lg" }), "px-8 rounded-full !text-white ")
                  : "hover:text-primary",
                isActive(link.href) ? "text-primary" : "text-accent"
              )}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
