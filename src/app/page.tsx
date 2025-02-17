import React from "react";
import Hero from "./_components/Hero";
import About from "@/components/about";
import Contact from "@/components/contact";
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
