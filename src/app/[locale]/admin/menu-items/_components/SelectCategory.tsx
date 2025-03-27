"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import { Label } from "@/app/[locale]/components/ui/label";
import { Category } from "@prisma/client";

export function SelectCategory({
  categories,
  categoryId,
  setCategoryId,
}: {
  categories: Category[];
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const t = useTranslations("admin");
  const currentItem = categories.find((category) => category.id === categoryId);
  return (
    <div className="mt-4">
      <Label>{t("categories.form.name.label")}</Label>
      <Select
        onValueChange={(value) => setCategoryId(value)}
        value={categoryId}
      >
        <SelectTrigger className="w-48 h-10 bg-gray-100 border-none mb-4 focus:ring-0">
          <SelectValue>{currentItem?.name}</SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-transparent border-none z-50 bg-gray-100">
          <SelectGroup className="bg-background text-accent z-50">
            {categories.map((category) => {
              return (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  className="text-base hover:!bg-primary hover:!text-white !text-black !bg-transparent"
                >
                  {category.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectCategory;
