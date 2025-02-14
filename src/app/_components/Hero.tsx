import Image from "next/image";
import React from "react";
import { ArrowRightCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import Link from "@/components/link";

const Hero = () => {
  return (
    <section className="section-gap">
      <div className=" container grid grid-cols-1 md:grid-cols-2 ">
        <div >
          <h1 className="text-4xl font-semibold">Slice into Happiness</h1>
          <p className="text-accent my-4">
            Craving Pizza ? We’ve got you coversd with fresh ingredients,endless
            flavors, and the fastest delivery. Your perfect slice is just a tab
            away!
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })}  !px-4 !rounded-full`}
            >
              Order Now
              <ArrowRightCircle className="!w-5 !h-5" />
            </Link>
            <Link
              href={`/${Routes.ABOUT}`}
              className={`${buttonVariants({
                size: "lg",
              })}  !px-4 !rounded-full`}
            >
              Learn more
              <ArrowRightCircle className="!w-5 !h-5" />
            </Link>
          </div>
        </div>

        <div className="relative hidden md:block ">
          <Image
            src="/assets/images/pizza.png"
            alt="Delicious pizza"
            className="object-contain"
            fill
            loading="eager"
            priority
             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
             
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
