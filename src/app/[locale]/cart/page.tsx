import CartItem from "@/app/[locale]/components/CartItems";
import CheckoutForm from "@/app/[locale]/components/CheckoutForm";
import React from "react";

const CartPage = () => {
  return (
    <main>
      <section className="section-gap">
        <div className="container text-center">
          <h1 className="text-primary italic font-bold text-4xl mb-9">Cart</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <CartItem />
            <CheckoutForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default CartPage;
