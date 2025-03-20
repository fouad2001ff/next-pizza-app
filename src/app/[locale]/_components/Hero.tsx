"use client";
import Image from "next/image";
import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { buttonVariants } from "@/app/[locale]/components/ui/button";
import { Routes } from "@/constants/enums";
import Link from "@/app/[locale]/components/link";
import { useTranslations } from "next-intl";
import useLocale from "@/lib/get-locale-in-client";
const Hero = () => {
  const locale: string = useLocale();
  const t = useTranslations("hero");

  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div>
          <h1 className="text-4xl font-semibold">{t("title")}</h1>
          <p className="text-accent my-4">{t("description")}</p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })} !px-4 !rounded-full`}
            >
              {t("orderNow")}
              <ArrowRightCircle className="!w-5 !h-5" />
            </Link>
            <Link
              href={`/${locale}/${Routes.ABOUT}`}
              className={`${buttonVariants({
                size: "lg",
              })} !px-4 !rounded-full`}
            >
              {t("learnMore")}
              <ArrowRightCircle className="!w-5 !h-5" />
            </Link>
          </div>
        </div>

        <div className="relative  w-full h-[200px]  hidden md:block">
          <Image
            src="/assets/images/pizza.png"
            alt="Delicious pizza"
            className="object-contain"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
