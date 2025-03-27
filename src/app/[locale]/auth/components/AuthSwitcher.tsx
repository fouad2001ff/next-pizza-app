"use client";

import Link from "next/link";
import { buttonVariants } from "@/app/[locale]/components/ui/button";
import useLocale from "@/lib/get-locale-in-client";
import { Pages, Routes } from "@/constants/enums";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import SigninForm from "../signin/_components/SigninForm";
import SignupForm from "../signup/_components/SignupForm";

interface AuthSwitcherProps {
  type?: "signin" | "signup";
}

const AuthSwitcher: React.FC<AuthSwitcherProps> = () => {
  const pathname = usePathname();
  const isSignIn = pathname.includes(Pages.LOGIN);
  const locale: string = useLocale();
  const t = useTranslations(isSignIn ? "signin" : "signup");
  const formComponent = isSignIn ? <SigninForm /> : <SignupForm />;
  const authRedirectPath = `/${locale}/${Routes.AUTH}/${
    isSignIn ? Pages.Register : Pages.LOGIN
  }`;
  return (
    <main>
      <div className="p-44 md:py-40 bg-gray-50">
        <div className="container flex-center">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center mb-4">
              {isSignIn ? t("welcome") : t("createAccount")}
            </h1>
            {formComponent}
            <p className="flex-center mt-4 text-accent text-sm">
              {isSignIn ? t("noAccount") : t("createAccount")}
              <Link
                href={authRedirectPath}
                className={`${buttonVariants({
                  variant: "link",
                  size: "sm",
                })} !text-black`}
              >
                {isSignIn ? t("signUp") : t("signIn")}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AuthSwitcher;
