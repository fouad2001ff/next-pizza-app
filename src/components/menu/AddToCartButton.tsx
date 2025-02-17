import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { formatCurrency } from "@/lib/formatters";
import { Checkbox } from "../ui/checkbox";
import { Extra, Product, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";



const AddToCartButton = ({item}: {item: ProductWithRelations}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
    type='button'
    size= 'lg'
    className='mt-4 rounded-full '
    >
        Add to Cart

    </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center">
            <Image src={item.image} alt= {item.name} width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>
            {item.description}
          </DialogDescription>
        </DialogHeader>

       <div>
        <div className="text-center space-y-4">
            <Label >Pick Your Size</Label>
            <PickSize sizes={item.sizes} item={item} />
        </div>
        <div className="text-center space-y-4">
            <Label >Any extras?</Label>
            <Extras extras={item.extras} />
            
        </div>
       </div>
        <DialogFooter>
          <Button type="submit" className="w-full h-10">Add To Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    
  );
};

export default AddToCartButton;


function PickSize ({sizes, item}: {sizes: Size[]; item:Product}){
    return(
        <RadioGroup defaultValue="comfortable">
        {sizes.map((size => (
            <div key={size.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
            <RadioGroupItem value="default" id={size.id} />
            <Label htmlFor={size.id}>{size.name} {formatCurrency(size.price + item.basePrice)}</Label>
          </div>
        )))}
        
        
      </RadioGroup>
    )
}
function Extras ({extras}: {extras: Extra[] } )   {
    return (
        <div className="space-y-2">
          {extras.map((extra) => (
            <div key={extra.id} className="flex items-center space-x-2 border border-gray-100 rounded-md p-4">
              <Checkbox id={extra.id} />
              <label
                htmlFor={extra.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {extra.name} {formatCurrency(extra.price)}
              </label>
            </div>
          ))}
        </div>
      )}
        
        
        
    

