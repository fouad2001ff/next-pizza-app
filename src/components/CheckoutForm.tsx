"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { getTotalAmount } from "@/lib/cart";
import { useAppSelector } from "@/redux/hooks";
import { selectCartItems } from "@/redux/features/cart/cartSlice";
import { formatCurrency } from "@/lib/formatters";
import { useTranslations } from "next-intl";

const CheckoutForm = () => {
  const cart = useAppSelector(selectCartItems);
  const totalAmount = getTotalAmount(cart);
  const t = useTranslations("checkout");

  return (
    cart &&
    cart.length > 0 && (
      <div className="grid gap-6 bg-gray-100 rounded-md p-6">
        <h2 className="text-start text-2xl font-semibold mb-4">{t("title")}</h2>
        <form className="space-y-4">
          <div className="grid gap-4">
            {/* Phone Input */}
            <div className="grid gap-1">
              <Label htmlFor="phone" className="text-accent text-start">
                {t("phone")}
              </Label>
              <Input
                id="phone"
                placeholder={t("enterPhone")}
                type="text"
                name="phone"
                required
              />
            </div>

            {/* Address Input */}
            <div className="grid gap-1">
              <Label htmlFor="address" className="text-accent text-start">
                {t("streetAddress")}
              </Label>
              <Textarea
                id="address"
                placeholder={t("enterAddress")}
                name="address"
                className="resize-none"
                required
              />
            </div>

            {/* Postal Code & City */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1">
                <Label htmlFor="postal-code" className="text-accent text-start">
                  {t("postalCode")}
                </Label>
                <Input
                  type="text"
                  id="postal-code"
                  placeholder={t("enterPostalCode")}
                  name="postalCode"
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="city" className="text-accent text-start">
                  {t("city")}
                </Label>
                <Input
                  type="text"
                  id="city"
                  placeholder={t("enterCity")}
                  name="city"
                  required
                />
              </div>
            </div>

            {/* Country Input */}
            <div className="grid gap-1">
              <Label htmlFor="country" className="text-accent text-start">
                {t("country")}
              </Label>
              <Input
                type="text"
                id="country"
                placeholder={t("enterCountry")}
                name="country"
                required
              />
            </div>
          </div>

          {/* Pay Button */}
          <Button type="submit" className="w-full mt-4">
            {t("pay", { amount: formatCurrency(totalAmount) })}
          </Button>
        </form>
      </div>
    )
  );
};

export default CheckoutForm;
