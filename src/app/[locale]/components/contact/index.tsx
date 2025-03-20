"use client";

import React from "react";
import MainHeading from "../main-heading";
import { useTranslations } from "next-intl";

function Contact() {
  const t = useTranslations("contact"); // Reference the "contact" section in your translation files

  return (
    <section className="section-gap">
      <div className="container">
        <div className="text-center">
          <MainHeading title={t("title")} subtitle={t("subtitle")} />
          <div>
            <a className="underline text-accent text-4xl" href="tel:+2012121212">
              +2012121212
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
