import { getLocale } from "next-intl/server";

export const getCurrentLocale = async () => {
  const locale = await getLocale();
  
  return locale || "en"; 
};