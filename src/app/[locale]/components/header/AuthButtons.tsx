// components/AuthButtons.tsx
"use client";
import React from "react";
import { Button, buttonVariants } from "@/app/[locale]/components/ui/button"; // Adjust path
import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import useLocale from "@/lib/get-locale-in-client";
import { Pages, Routes } from "@/constants/enums";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

const AuthButtons = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("nav");

  // Handle sign out
  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  };

  if (session) {
    return (
      <Button
        onClick={handleSignOut}
        className={cn(
          buttonVariants({ size: "lg" }),
          "px-8 rounded-full !text-white"
        )}
      >
        {t("signOut")}
      </Button>
    );
  }

  // Not authenticated: Show Login and Register buttons
  return (
    <div className="flex gap-4">
      <Button
        onClick={() => router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)}
        //
        className={`${
          pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
            ? "text-primary"
            : "text-accent"
        }  hover:no-underline  font-semibold  `}
        size="lg"
        variant="link"
      >
        {t("login")}
      </Button>
      <Button
        onClick={() =>
          router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
        }
        size="lg"
        className="!px-8 !rounded-full"
      >
        {t("register")}
      </Button>
    </div>
  );
};

export default AuthButtons;
