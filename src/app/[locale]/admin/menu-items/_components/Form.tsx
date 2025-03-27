"use client";
import FormFields from "@/app/[locale]/components/form-fields/form-fields";
import { Button, buttonVariants } from "@/app/[locale]/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import useFormFields from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { ValidationErrors } from "@/validations/auth";
import { CameraIcon, Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import { Category, Extra, Size } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ItemOptions from "./ItemOptions";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { addProduct, deleteProduct, updateProduct } from "../_actions/product";
import { ProductWithRelations } from "@/types/product";
import Link from "@/app/[locale]/components/link";

const Form = ({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductWithRelations;
}) => {
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENUITEMS}`,
  });

  const [selectedImage, setSelectedImage] = useState(
    product ? product.image : ""
  );
  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : categories[0].id
  );
  const [sizes, setSizes] = useState<Partial<Size>[]>(
    product ? product.sizes : []
  );
  const [extras, setExtras] = useState<Partial<Extra>[]>(
    product ? product.extras : []
  );

  const formData = new FormData();

  Object.entries(product ?? {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

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

  const actionFn = product
    ? updateProduct.bind(null, {
        productId: product.id,
        options: { sizes, extras },
      })
    : addProduct.bind(null, {
        categoryId,
        options: { sizes, extras },
      });

  const [state, action, pending] = useActionState(actionFn, initialState);

  useEffect(() => {
    if (state.status && state.message && !pending) {
      toast(state.message, {
        className:
          state.status === 200 || state.status === 201
            ? "!text-green-400"
            : "text-destructive",
      });
    }
  }, [state.status, state.message, pending]);

  return (
    <form
      action={async (formData) => {
        await action(formData);
      }}
      className="flex flex-col  md:flex-row gap-6"
    >
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error?.image}
          </p>
        )}
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          {getFormFields().map((field: IFormField) => {
            const fieldValue =
              state?.formData?.get(field.name) ?? formData.get(field.name);
            return (
              <div key={field.name} className="mb-3">
                <FormFields
                  checked={false}
                  {...field}
                  defaultValue={fieldValue as string}
                  error={state?.error}
                />
              </div>
            );
          })}

          <SelectCategory
            categories={categories}
            categoryId={categoryId}
            setCategoryId={setCategoryId}
          />

          <input type="hidden" name="categoryId" value={categoryId} />

          <AddSize sizes={sizes} setSizes={setSizes} />

          <AddExtras extras={extras} setExtras={setExtras} />
          <FormActions pending={pending} product={product} />
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
          priority
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

const FormActions = ({
  pending,
  product,
}: {
  pending: boolean;
  product?: ProductWithRelations;
}) => {
  const { locale } = useParams();
  const t = useTranslations("");

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`${product ? "grid grid-cols-2" : "flex flex-col"} gap-4`}
      >
        <Button type="submit" disabled={pending}>
          {pending ? <Loader /> : product ? t("save") : t("create")}
        </Button>
        {product && (
          <Button
            variant="outline"
            disabled={pending}
            onClick={() => handleDelete(product.id)}
          >
            {pending ? <Loader /> : t("delete")}
          </Button>
        )}
      </div>

      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENUITEMS}`}
        className={`w-full mt-4 ${buttonVariants({ variant: "outline" })}`}
      >
        {t("cancel")}
      </Link>
    </>
  );
};

const AddSize = ({
  sizes,
  setSizes,
}: {
  sizes: Partial<Size>[];
  setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
}) => {
  const t = useTranslations("");
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {t("sizes")}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions state={sizes} setState={setSizes} type="size" />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const AddExtras = ({
  extras,
  setExtras,
}: {
  extras: Partial<Extra>[];
  setExtras: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
}) => {
  const t = useTranslations("");
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {t("extrasIngredients")}
        </AccordionTrigger>
        <AccordionContent>
          <ItemOptions type="extra" state={extras} setState={setExtras} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
