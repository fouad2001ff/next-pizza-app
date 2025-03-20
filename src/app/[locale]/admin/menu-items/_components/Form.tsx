"use client";
import FormFields from "@/app/[locale]/components/form-fields/form-fields";
import { Button } from "@/app/[locale]/components/ui/button";
import { updateProfile } from "@/app/[locale]/profile/_actions/profile";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { ValidationErrors } from "@/validations/auth";
import { CameraIcon, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useActionState, useState } from "react";

const Form = () => {
    const t = useTranslations('')
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENUITEMS}`,
  });
  const [selectedImage, setSelectedImage] = useState("");

  const formData = new FormData();

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
  const [state, action, pending] = useActionState(updateProfile, initialState);
  return (
    <form action={action} className="flex flex-col  md:flex-row gap-6">
      <UploadImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <div className="flex-1">
        <div className="space-y-3">
          {getFormFields().map((field: IFormField) => {
            const fieldValue =
              state?.formData?.get(field.name) ?? formData.get(field.name);
            return (
              <div key={field.name} className="mb-3">
                <FormFields
                  {...field}
                  defaultValue={fieldValue as string}
                  error={state?.error}
                />
              </div>
            );
          })}
          <Button type="submit" disabled={pending} className="w-full mt-4">
            {pending ? <Loader /> : t("create")}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Form;

const UploadImage = ({
  selectedImage,
  setSelectedImage,
}: {
  selectedImage: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };
  return (
    <div className="group mx-auto md:mx-0 relative w-[200px] h-[200px] overflow-hidden rounded-full">
      {selectedImage && (
        <Image
          src={selectedImage}
          alt="Add Product Image"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      )}
      <div
        className={`${
          selectedImage
            ? "group-hover:opacity-[1] opacity-0  transition-opacity duration-200"
            : ""
        } absolute top-0 left-0 w-full h-full bg-gray-50/40`}
      >
        <label
          htmlFor="image-upload"
          className="rounded-full w-[200px] h-[200px] flex-center  cursor-pointer"
        >
          <CameraIcon className="!w-8 !h-8 text-accent" />
        </label>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageChange}
          name="image"
        />
      </div>
    </div>
  );
};
