import React from "react";
import About from "@/app/[locale]/components/about";
import Contact from "@/app/[locale]/components/contact";
import Hero from "./_components/Hero";
import BestSellers from "./_components/BestSellers";

const page = async () => {
  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
};

export default page;
