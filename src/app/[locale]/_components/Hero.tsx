"use client";
import Image from "next/image";
import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import Link from "@/components/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
const Hero = () => {
  const pathname = usePathname();
  const locale = pathname.split("/")[1];
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
