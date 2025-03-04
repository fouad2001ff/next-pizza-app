import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getBestSellers } from "@/server/db/product";
import { getTranslations } from "next-intl/server";
import React from "react";

const BestSellers = async () => {
  const bestSellers = await getBestSellers(3);
  const t = await getTranslations("bestSellers");

  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading title={t("title")} subtitle={t("subtitle")} />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
