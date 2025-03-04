"use client";

import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = () => {
  const pathname = usePathname(); 
  const router = useRouter(); 

 
  const locale = pathname.split("/")[1] === "ar" ? "ar" : "en";

  const newLocale = locale === "en" ? "ar" : "en";

  const switchLanguage = () => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
   
     

     
      <button onClick={switchLanguage} className="px-4 mx-5 py-2 border rounded">
        {locale === "en" ? "العربية" : "English"}
      </button>
  );
};

export default LanguageSwitcher;
