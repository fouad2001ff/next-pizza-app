import { getCategories } from "@/server/db/categories";
import { getTranslations } from "next-intl/server";
import React from "react";
import Form from "./_components/Form";
import CategoryItem from "./_components/CategoryItem";

const CategoriesPage = async () => {
  const categories = await getCategories();
  const t = await getTranslations("admin");
  return (
    <main>
      <section className="section-gap">
        <div className="container ">
          <div className="sm:max-w-[625px] mx-auto space-y-10">
            <Form />
            {categories.length > 0 ? (
              <ul>
                {categories.map((category) => (
                  <CategoryItem key={category.id} category={category} />
                ))}
              </ul>
            ) : (
              <p className="text-2xl font-semibold text-center"> {t("categories.noCategoriesFound")} </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CategoriesPage;
