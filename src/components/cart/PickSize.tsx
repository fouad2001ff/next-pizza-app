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
    <RadioGroup defaultValue="comfortable">
      {sizes.map((size) => (
        <div
          key={size.id}
          className="flex items-center space-x-2 border border-gray-100 rounded-md p-4"
        >
          <RadioGroupItem
            value={selectedSize.name}
            checked={selectedSize.id === size.id}
            onClick={() => setSelectedSize(size)}
            id={size.id}
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
