"use client";
import { Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { Session } from "next-auth";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import FormFields from "../form-fields/form-fields";
import { IFormField } from "@/types/app";
import { UserRole } from "@prisma/client";
import Checkbox from "../form-fields/checkbox";
import { ValidationErrors } from "@/validations/auth";
import { updateProfile } from "../../profile/_actions/profile";
import { Button } from "../ui/button";
import Loader from "../ui/Loader";
import { useTranslations } from "next-intl";
import { CameraIcon } from "lucide-react";
import { toast } from "sonner";

const EditUserForm = ({ user }: { user: Session["user"] }) => {
  const { getFormFields } = useFormFields({ slug: Routes.PROFILE });
  const formData = new FormData();
  Object.entries(user).forEach(([key, value]) => {
    if (value !== undefined && value !== null && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  const t = useTranslations("profile");

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

  const [selectedImage, setSelectedImage] = useState(user.image ?? "");

  const [isAdmin, setisAdmin] = useState(user.role === UserRole.ADMIN);

  const [state, action, pending] = useActionState(
    updateProfile,
    initialState
  );

  useEffect(() => {
    if (state.status && state.message && !pending) {
      toast(state.message, {
        className:
          state.status === 200 ? "!text-green-400" : "text-destructive",
      });
    }
  }, [state.status, state.message, pending]);

  useEffect(() => {
    setSelectedImage(user.image as string);
  }, [user.image]);

  return (
    <form action={action} className="flex flex-col  md:flex-row gap-6">
      <div className="group relative w-[200px] h-[200px] rounded-full overflow-hidden mx-auto ">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full object-cover"
            priority
          />
        )}

        <div
          className={`${
            selectedImage
              ? "group-hover:opacity-[1] opacity-0 transition-opacity duration-200"
              : ""
          } absolute top-0 left-0  w-full h-full bg-gray-50/40 `}
        >
          <ImageUpload setSelectedImage={setSelectedImage} />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
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
        </div>
        <input type="hidden" name="isAdmin" value={isAdmin ? "true" : "false"} />
        {user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2">
            <Checkbox
              name="admin"
              label="Admin"
              checked={isAdmin}
              onClick={() => setisAdmin(!isAdmin)}
            />
          </div>
        )}

        <Button type="submit" disabled={pending} className="w-full mt-4">
          {pending ? <Loader /> : t("form.save")}
        </Button>
      </div>
    </form>
  );
};

export default EditUserForm;

const ImageUpload = ({
  setSelectedImage,
}: {
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
    <div className="flex flex-col gap-2">
      <label
        htmlFor="image-upload"
        className="rounded-full w-[200px] h-[200px] flex-center  cursor-pointer"
      >
        <CameraIcon className="!w-8 !h-8 text-accent" />
      </label>
      <input
        type="file"
        id="image-upload"
        name="image"
        className="hidden"
        accept="image/*" // accept images only
        onChange={handleImageChange}
      />
    </div>
  );
};
