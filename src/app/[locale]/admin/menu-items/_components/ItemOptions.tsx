/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/app/[locale]/components/ui/button";
import { Extra, ExtraIngredients, Size } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { productSizes } from "@prisma/client";
import { Languages } from "@/constants/enums";
import { useLocale } from "next-intl";

const sizes = [productSizes.SMALL, productSizes.MEDIUM, productSizes.LARGE];

const extras = [
  ExtraIngredients.CHEESE,
  ExtraIngredients.ONION,
  ExtraIngredients.TOMATO,
  ExtraIngredients.PEPPER,
  ExtraIngredients.BACON,
 
];

function handleOptions(
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
) {
  const addOption = () => {
    setState((prev: any) => {
      return [...prev, { name: "", price: 0 }];
    });
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement> | { target: { value: any } },
    index: number,
    fieldName: string
  ) => {
    const newValue = e.target.value;
    setState((prev: any) => {
      const newItems = [...prev];
      newItems[index][fieldName] = newValue;
      return newItems;
    });
  };
  const removeOption = (indexToRemove: number) => {
    setState((prev: any) => {
      return prev.filter((_: any, index: number) => index !== indexToRemove);
    });
  };
  return { addOption, onChange, removeOption };
}

const ItemOptions = ({
  state,
  setState,
  type = "size",
}: {
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  type?: "size" | "extra";
}) => {
  const t = useTranslations("admin");
  const { addOption, onChange, removeOption } = handleOptions(setState);

  const isThereAvailableOptions = () => {
    const selectedItems = state.map((item) => item.name);
    const availableItems = type === "size" 
      ? sizes.filter(size => !selectedItems.includes(size))
      : extras.filter(extra => !selectedItems.includes(extra));
    
    return availableItems.length > 0;
  };

  return (
    <>
      {state.length > 0 && (
        <ul>
          {state.map((item, index) => (
            <li key={index} className="flex items-end gap-2 mb-2">
              <div className="flex-1 space-y-1">
                <label>name</label>
                <SelectName
                  onChange={onChange}
                  index={index}
                  item={item}
                  state={state}
                  type={type}
                />
              </div>
              <div className="flex-1 space-y-1">
                <label>Price</label>
                <input
                  type="number"
                  placeholder="0"
                  min={0}
                  value={item.price || ""}
                  onChange={(e) => onChange(e, index, "price")}
                  className="bg-white border border-gray-300 rounded-md px-2 py-1.5 focus:ring-2 w-[100px]"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => removeOption(index)}
              >
                <Trash2 />
              </Button>
            </li>
          ))}
        </ul>
      )}
      {isThereAvailableOptions() && (
        <Button
          type="button"
          variant="outline"
          onClick={addOption}
          className="w-full"
        >
          <Plus />
          {type === "size" 
            ? t("menu-items.addItemSize") 
            : t("menu-items.addExtraItem")}
        </Button>
      )}
    </>
  );
};

export default ItemOptions;

export function SelectName({
  onChange,
  index,
  item,
  state,
  type = "size",
}: {
  onChange: (e: any, index: any, fieldName: any) => void;
  index: number;
  item: Partial<Size> | Partial<Extra>;
  state: Partial<Size>[] | Partial<Extra>[];
  type?: "size" | "extra";
}) {
  const locale = useLocale();

  const getAvailableOptions = () => {
    const selectedItems = state.map(s => s.name).filter(Boolean);
    
    if (type === "size") {
      return sizes.filter(size => !selectedItems.includes(size) || size === item.name);
    } else {
      return extras.filter(extra => !selectedItems.includes(extra) || extra === item.name);
    }
  };

  const availableOptions = getAvailableOptions();

  return (
    <Select
      onValueChange={(value) => {
        onChange({ target: { value } }, index, "name");
      }}
      value={item.name || ""}
    >
      <SelectTrigger
        className={`w-[100px] bg-white border-none mb-4 focus:ring-0 ${
          locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent className="bg-transparent border-none z-50 bg-gray-100">
        <SelectGroup className="bg-background text-accent z-50">
          {availableOptions.map((option, idx) => (
            <SelectItem
              key={idx}
              value={option}
              className="text-base hover:!bg-primary hover:!text-white !text-black !bg-transparent"
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
