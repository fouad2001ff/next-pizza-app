import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";

const PickSize = ({
  sizes,
  item,
  selectedSize,
  setSelectedSize,
}: {
  sizes: Size[];
  item: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) => {
  return (
    <RadioGroup defaultValue="small">
      {sizes.map((size) => (
        <div
          key={size.id}
          className={`flex items-center space-x-3 border rounded-md p-4 cursor-pointer 
            transition-all ${selectedSize.id === size.id ? "border-primary bg-gray-50" : "border-gray-200"}`}
            onClick={() => setSelectedSize(size)}
        >
          <RadioGroupItem
            id={size.id}
            value={selectedSize.id}
            checked={selectedSize.id === size.id}
          />
          <Label htmlFor={size.id}>
            {size.name} {formatCurrency(size.price + item.basePrice)}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};

export default PickSize;
