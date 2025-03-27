"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();

  const locale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  const newLocale = locale === "en" ? "ar" : "en";

  const switchLanguage = useCallback(() => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.replace(newPath);
  }, [locale, newLocale, pathname, router]);
  return (
    <button
      onClick={switchLanguage}
      className="px-4 mx-5 py-2 border rounded transition-colors duration-200 hover:bg-gray-200 "
    >
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
};

export default LanguageSwitcher;
