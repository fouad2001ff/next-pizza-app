"use client";

import React from "react";
import MainHeading from "../main-heading";
import { useTranslations } from "next-intl";

function About() {
  const t = useTranslations("about");

  return (
    <section className="section-gap">
      <div className="text-center">
        <MainHeading title={t("title")} subtitle={t("subtitle")} />
        <div className="mx-auto p-3 space-y-4 text-accent max-w-lg">
          <p>{t("description1")}</p>
          <p>{t("description2")}</p>
          <p>{t("description3")}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
