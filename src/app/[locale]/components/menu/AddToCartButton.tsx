"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/[locale]/components/ui/dialog";
import Image from "next/image";
import { Label } from "../ui/label";
import { formatCurrency } from "@/lib/formatters";
import { Extra, productSizes, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addCartItem, selectCartItems } from "@/redux/features/cart/cartSlice";
import { getItemQuantity } from "@/lib/cart";
import Extras from "../cart/Extras";
import PickSize from "../cart/PickSize";
import ChooseQuantity from "../cart/ChooseQuantity";

const AddToCartButton = ({ item }: { item: ProductWithRelations }) => {
  const cart = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();
  const quantity = getItemQuantity(cart, item.id);

  const defaultSize =
    cart.find((element) => element.id === item.id)?.sizes ||
    item.sizes.find((size) => size.name === productSizes.SMALL);

  const defaultExtras =
    cart.find((element) => element.id === item.id)?.extras || [];

  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtras);

  let totalPrice = item.basePrice;

  if (selectedSize) {
    totalPrice += selectedSize.price;
  }

  if (selectedExtras) {
    totalPrice += selectedExtras.reduce((acc, extra) => acc + extra.price, 0);
  }

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        id: item.id,
        name: item.name,
        basePrice: item.basePrice,
        image: item.image,
        sizes: selectedSize,
        extras: selectedExtras,
      })
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="lg" className="mt-4 rounded-full  ">
          Add to Cart
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex items-center">
          <Image src={item.image} alt={item.name} width={200} height={200} />
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>

        <div className="text-center space-y-4">
          <Label>Pick Your Size</Label>
          <PickSize
            sizes={item.sizes}
            item={item}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
        <Extras
          extras={item.extras}
          selectedExtras={selectedExtras}
          setSelectedExtras={setSelectedExtras}
        />
        <DialogFooter>
          {quantity === 0 ? (
            <Button onClick={handleAddToCart} className="w-full h-10">
              Add To Cart {formatCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              item={item}
              quantity={quantity}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
              handleAddToCart={handleAddToCart}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToCartButton;
