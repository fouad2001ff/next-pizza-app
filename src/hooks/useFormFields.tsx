

import { Pages, Routes } from "@/constants/enums";
import { IFormField, IFormFieldsVariables } from "@/types/app";
import { useTranslations } from "next-intl";

const useFormFields = ({ slug }: IFormFieldsVariables) => {

  const formattedSlug = slug.includes("/") ? slug.replace(/\//g, ".") : slug;
const t = useTranslations(formattedSlug);
  const loginFields = (): IFormField[] => [
    {
      label: t("email"), 
      name: "email",
      type: "email",
      placeholder: t("emailPlaceholder"), 
      autoFocus: true,
    },
    {
      label: t("password"),
      name: "password",
      placeholder: t("passwordPlaceholder"),
      type: "password",
    },
  ];

  //This function returns an array of form fields for the register page
    const registerFields = (): IFormField[] => [
      {
        label: t("name"),
        name: "name",
        type: "text",
        placeholder: t("namePlaceholder"),
        autoFocus: true,
      },
      {
        label: t("email"),
        name: "email",
        type: "email",
        placeholder: t("emailPlaceholder"),
      },
      {
        label: t("password"),
        name: "password",
        placeholder: t("passwordPlaceholder"),
        type: "password",
      },
      {
        label: t("confirmPassword"),
        name: "confirmPassword",
        placeholder: t("confirmPasswordPlaceholder"),
        type: "password",
      },
    ];

    const profileFields = (): IFormField[] => [
      {
        label: t("form.name.label"),
        name: "name",
        type: "text",
        placeholder: t("form.name.placeholder"),
        autoFocus: true,
      },
      {
        label: t("form.email.label"),
        name: "email",
        type: "email",
        placeholder: t("form.email.placeholder"),
      },
      {
        label: t("form.phone.label"),
        name: "phone",
        type: "text",
        placeholder: t("form.phone.placeholder"),
      },
      {
        label: t("form.address.label"),
        name: "streetAddress",
        type: "text",
        placeholder: t("form.address.placeholder"),
      },
      {
        label: t("form.postalCode.label"),
        name: "postalCode",
        type: "text",
        placeholder: t("form.postalCode.placeholder"),
      },
      {
        label: t("form.city.label"),
        name: "city",
        type: "text",
        placeholder: t("form.city.placeholder"), 
      },
      {
        label: t("form.country.label"),
        name: "country",
        type: "text",
        placeholder: t("form.country.placeholder"), 
      },
    ];

    const addProductFields = (): IFormField[] => [
      
        {
          label: t("form.name.label"),
          name: "name",
          type: "text",
          placeholder: t("form.name.placeholder"),
          autoFocus: true,
        },
        {
          label: t("form.description.label"),
          name: "description",
          type: "text",
          placeholder: t("form.description.placeholder"),
        },
        {
          label: t("form.basePrice.label"),
          name: "basePrice",
          type: "text",
          placeholder: t("form.basePrice.placeholder"),
        },
    ]
    
    
  //This function checks the slug value to determine which set of form fields to return.
  const getFormFields = (): IFormField[] => {
    switch (slug) {
      case Pages.LOGIN:
        return loginFields();
      case Pages.Register:
        return registerFields();
        case Routes.PROFILE:
        return profileFields();
        case `${Routes.ADMIN}/${Pages.MENUITEMS}`:
        return addProductFields();

      default:
        return [];
    }
  };
  return {
    getFormFields,
  };
};

export default useFormFields;
