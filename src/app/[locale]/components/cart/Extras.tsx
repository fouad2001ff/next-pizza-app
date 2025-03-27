import { Checkbox } from "../ui/checkbox";
import { Extra } from "@prisma/client";
import { formatCurrency } from "@/lib/formatters";
import { Label } from "../ui/label";

const Extras = ({
  extras,
  selectedExtras,
  setSelectedExtras,
}: {
  extras: Extra[];
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) => {
  const handleExtraChange = (checked: boolean | string, extra: Extra) => {
    setSelectedExtras(
      (prev) =>
        checked
          ? [...prev, extra] // Add extra if checked
          : prev.filter((e) => e.id !== extra.id) // Remove extra if unchecked
    );
  };

  return (
    <div className="space-y-2">
      <div className="text-center">
        <Label>Any extras?</Label>
      </div>
      {extras.map((extra) => (
        <div
          key={extra.id}
          onClick={() =>
            handleExtraChange(
              !selectedExtras.some((e) => e.id === extra.id),
              extra
            )
          }
          className={`flex items-center space-x-3 border rounded-md p-4 cursor-pointer transition-all 
            ${
              selectedExtras.some((e) => e.id === extra.id)
                ? "border-primary bg-gray-50"
                : "border-gray-200"
            }`}
        >
          <Checkbox
            id={extra.id}
            checked={selectedExtras.some((e) => e.id === extra.id)}
            onCheckedChange={(checked) => handleExtraChange(checked, extra)}
          />
          <label
            htmlFor={extra.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {extra.name} {formatCurrency(extra.price)}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Extras;
