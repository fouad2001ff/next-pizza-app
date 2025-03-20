import { IFormField } from "@/types/app";


import { Checkbox as ShadcnCheckbox} from "@/components/ui/checkbox";
import { Label } from "../ui/label";

interface Props  {
  onClick?: () => void;
  checked: boolean;
  label: IFormField['label']
  name: IFormField['name']
}

const Checkbox = ({ label, name, checked, onClick }: Props) => {
  return (
    <div className="text-accent flex items-center gap-2">
    <ShadcnCheckbox 
     type="button"
     id={name}
     name={name}
     onClick={onClick}
    
     checked={checked}
    />
      <Label htmlFor={name} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
};

export default Checkbox;