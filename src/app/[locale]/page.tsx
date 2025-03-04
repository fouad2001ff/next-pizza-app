import React from "react";
import About from "@/components/about";
import Contact from "@/components/contact";
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
