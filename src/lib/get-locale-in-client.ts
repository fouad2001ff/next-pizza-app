import { usePathname } from "next/navigation";

const useLocale = () => {
  const pathname = usePathname();
  return pathname.split("/")[1]; // Extracts the locale from the URL
};

export default useLocale;
