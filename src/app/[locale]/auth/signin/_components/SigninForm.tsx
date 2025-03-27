"use client";
import { Button } from "@/app/[locale]/components/ui/button";
import React, { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import useFormFields from "@/hooks/useFormFields";
import { Pages, Routes } from "@/constants/enums";

import { IFormField } from "@/types/app";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

import useLocale from "@/lib/get-locale-in-client";
import { useTranslations } from "next-intl";

import FormFields from "@/app/[locale]/components/form-fields/form-fields";
import Loader from "@/app/[locale]/components/ui/Loader";

const SigninForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const locale = useLocale();
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const slug = pathname.includes(`/${Pages.LOGIN}`)
    ? Pages.LOGIN
    : Pages.Register;
  const { getFormFields } = useFormFields({ slug });

  const t = useTranslations(slug);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (res?.error) {
        const validationError = JSON.parse(res?.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res?.error).responseError;
        if (responseError) {
          toast(responseError, { className: "!text-red-500" });
        }
      }
      if (res?.ok) {
        toast(t("loginSuccessful"), { className: "!text-green-500" });
        router.replace(`/${locale}/${Routes.PROFILE}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic submit handler based on slug

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((field: IFormField) => (
        <div key={field.name} className="mb-3">
          <FormFields {...field} error={error} checked={false} />
        </div>
      ))}
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? <Loader /> : t("submit")}
      </Button>
    </form>
  );
};

export default SigninForm;
