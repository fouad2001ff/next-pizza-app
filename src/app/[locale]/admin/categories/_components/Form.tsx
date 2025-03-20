"use client";
import { Button } from "@/app/[locale]/components/ui/button";
import Loader from "@/app/[locale]/components/ui/Loader";
import { ValidationErrors } from "@/validations/auth";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { addCategory } from "../_actions/category";

const Form = () => {
  const t = useTranslations("admin");

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
  } = {
    message: "",
    error: {},
    status: null,
  };

  const [state, action, pending] = useActionState(addCategory, initialState);

   useEffect(() => {
      if (state.status && state.message && !pending) {
        toast(state.message, {
          className:
            state.status === 200 ? "!text-green-400" : "text-destructive",
        });
      }
    }, [state.status, state.message, pending]);
  
  return (
    <form action={action} className="space-y-2 ">
      <label htmlFor="name">{t("categories.form.name.label")}</label>

      <div className="flex items-center gap-3 ">
        <input
          id="name"
          type="text"
          name="name"
          placeholder={t("categories.form.name.placeholder")}
           className="w-full border border-gray-300 rounded-md px-3 py-2 "
        />

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? <Loader /> : t("categories.form.create")}
        </Button>

        </div>
        {state.error?.name && (
          <p className="text-sm text-destructive">{state.error.name}</p>
        )}
    </form>
  );
};

export default Form;
