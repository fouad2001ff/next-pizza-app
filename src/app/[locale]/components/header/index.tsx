import { Routes } from "@/constants/enums";
import Link from "../link";
import Navbar from "./navbar";
import CartButton from "./CartButton";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./LanguageSwitcher";
import AuthButtons from "./AuthButtons";

function Header() {
  const t = useTranslations("nav");

  return (
    <header className=" py-4 md:py-6 ">
      <div className="container flex-between">
        <div className="flex items-center gap-6">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl"
        >
          {t("pizza")}
        </Link>
        <Navbar />
        </div>

        <div className="flex items-center gap-2 ">
          <div className="hidden md:flex items-center gap-4">
          <AuthButtons />
          <LanguageSwitcher />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;
