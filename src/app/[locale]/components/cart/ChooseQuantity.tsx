import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hooks";
import {  removeCartItem, removeItemFromCart } from "@/redux/features/cart/cartSlice";
import { ProductWithRelations } from "@/types/product";
import { Extra, Size } from "@prisma/client";

const ChooseQuantity = ({
  item,
  quantity,
 
  handleAddToCart,
}: {
  item: ProductWithRelations;
  quantity: number;
  selectedSize: Size;
  selectedExtras: Extra[];
  handleAddToCart: () => void
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col items-center gap-4 mx-auto mt-4">
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          className="text-black text-2xl w-10 h-10 flex items-center justify-center"
          onClick={() => dispatch(removeCartItem({ id: item.id }))}
        >
          -
        </Button>
        <span className="text-lg font-semibold">{quantity} in cart</span>
        <Button
          variant="outline"
          className="text-black text-2xl w-10 h-10 flex items-center justify-center"
          onClick={() =>
            handleAddToCart()
          }
        >
          +
        </Button>
      </div>
      <Button size= 'sm' variant="destructive" onClick={() => dispatch(removeItemFromCart({ id: item.id }))}>
        Remove
      </Button>
    </div>
  );
};

export default ChooseQuantity;
