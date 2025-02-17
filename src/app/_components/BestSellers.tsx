import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getBestSellers } from "@/server/db/product";
import React from "react";

const BestSellers = async () => {
  
  const bestSellers = await getBestSellers(3)
  
  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading title="Our Best Sellers" subtitle="Check Out" />
        </div>
        <Menu items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
