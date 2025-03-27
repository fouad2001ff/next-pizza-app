"use client";
import { Button } from "@/app/[locale]/components/ui/button";
import React, { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";

import { IFormField } from "@/types/app";
import { toast } from "sonner";

import useLocale from "@/lib/get-locale-in-client";

import { signup } from "@/server/_actions/auth";
import { ValidationErrors } from "@/validations/auth";
import useFormFields from "@/hooks/useFormFields";
import FormFields from "@/app/[locale]/components/form-fields/form-fields";
import Loader from "@/app/[locale]/components/ui/Loader";
import { useTranslations } from "next-intl";

const SignupForm = () => {
  const router = useRouter();
  const locale = useLocale();

  const slug = Pages.Register;

  const t = useTranslations(slug);

  const initialState: {
    message?: string;
    error?: ValidationErrors;
    status?: number | null;
    formData?: FormData | null;
  } = {
    message: "",
    error: {},
    status: null,
    formData: null,
  };

  const [state, action, pending] = useActionState(signup, initialState);

  const { getFormFields } = useFormFields({
    slug: Pages.Register,
  });

  useEffect(() => {
    if (state.status && state.message) {
      toast(state.message, {
        className:
          state.status === 201 ? "!text-green-400" : "!text-destructive",
      });
    }
    if (state.status === 201) {
      router.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [state.status, state.message, state.error, router, locale]);

  const fieldValue = state.formData?.get("name") as string;

  return (
    <form action={action}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <FormFields
            {...field}
            error={state.error}
            defaultValue={fieldValue}
            checked={false}
          />
        </div>
      ))}
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? <Loader /> : t("createAccount")}
      </Button>
    </form>
  );
};

export default SignupForm;
