"use client";

import React, { useContext, useState } from "react";
import { UsernameContext } from '@/context/UserContext';
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import Cart from "@/components/cart/cart";
import axios from "axios";

export default function Page() {
  const { addItemsToCart, deleteItemFromCart, cart, clearCart } = useContext(CartContext);
  const { username, isAuth, isAdmin, signOut, loadUserData, Address, Email, PhoneNumber, url } = useContext(UsernameContext);
  const [Method, setMethod] = useState("Cash On delivery");

  const increaseQty = (cartItem:any) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };
    addItemsToCart(item);
  };

  const decreaseQty = (cartItem:any) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty <= 0) return;
    addItemsToCart(item);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc:any, item:any) => acc + item.quantity * item.PRICE,
    0
  );
  const amountWithDiscount = cart?.cartItems?.reduce(
    (acc:any, item:any) => acc + item.quantity * item.DISCOUNTED_PRICE,
    0
  );
  const taxAmount = (amountWithDiscount * 0.15).toFixed(2);
  const shipping = 0;
  const totalAmount = (Number(amountWithDiscount) + Number(taxAmount) + Number(shipping)).toFixed(2);

  const checkout = async () => {
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString();
    const data = {
      customername: username,
      date: date,
      amount: "" + totalAmount,
      method: Method,
      status: "Processing...",
      phone: PhoneNumber,
      email: Email,
      time: time,
      billDetails: {
        items: cart.cartItems,
        subtotal: amountWithoutTax,
        shipping: shipping,
        shippingAddressStreet: "123456",
        shippingAddressState: "sedrcfvghbjn",
        tax: taxAmount,
        total: totalAmount
      }
    };

    try {
      const res = await axios.post("/api/orders", data);
      console.log(res);
      if (res.status === 202) {
        alert("Order placed successfully!");
        clearCart();
      }
    } catch (e:any) {
      if (e.status == 400) {
        alert("User not signed in");
      }
    }
  };

  return (
    <>
      <section className="sm:py-13 bg-blue-100 pt-20">
        <div className="container max-w-screen-xl mx-auto px-4 pt-4">
          <h2 className="text-3xl font-semibold mb-2">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>
      <div className="p-5 flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-[75vw]">
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                <section className="sm:py-13 bg-blue-100">
                  <div className="container max-w-screen-xl mx-auto px-4 pt-4">
                    <h2 className="text-3xl font-semibold mb-2">
                      {cart?.MovieItems?.length || 0} Item(s) in Birthday hall Cart
                    </h2>
                  </div>
                </section>
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                <section className="sm:py-13 bg-blue-100">
                  <div className="container max-w-screen-xl mx-auto px-4 pt-4">
                    <h2 className="text-3xl font-semibold mb-2">
                      {cart?.MovieItems?.length || 0} Item(s) in Movie Cart
                    </h2>
                  </div>
                </section>
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                <section className="sm:py-13 bg-blue-100">
                  <div className="container max-w-screen-xl mx-auto px-4 pt-4">
                    <h2 className="text-3xl font-semibold mb-2">
                      {cart?.cartItems?.length || 0} Item(s) in Food Cart
                    </h2>
                  </div>
                </section>
              </div>
              <div className="collapse-content">
                {cart?.cartItems?.length > 0 && (
                  <section className="py-10">
                    <div className="container max-w-screen-xl mx-auto px-4">
                      <div className="flex flex-col gap-4">
                        <Cart />
                      </div>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
        <aside className="w-full md:w-1/4">
          <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
            <ul className="mb-5">
              <li className="flex justify-between text-gray-600 mb-1">
                <span>Amount before Tax:</span>
                <span>₹{amountWithoutTax}</span>
              </li>
              <li className="flex justify-between text-gray-600 mb-1">
                <span>Amount After Discount:</span>
                <span>₹{amountWithDiscount}</span>
              </li>
              <li className="flex justify-between text-gray-600 mb-1">
                <span>Total Units:</span>
                <span className="text-green-500">
                  {cart?.cartItems?.reduce(
                    (acc:any, item:any) => acc + item.quantity,
                    0
                  )}{" "}
                  (Units)
                </span>
              </li>
              <li className="flex justify-between text-gray-600 mb-1">
                <span>TAX:</span>
                <span>₹{taxAmount}</span>
              </li>
              <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                <span>Total price:</span>
                <span>₹{totalAmount}</span>
              </li>
            </ul>

            <button onClick={checkout} className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
              Continue
            </button>

            <Link
              href="/Menu"
              className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
            >
              Back to shop
            </Link>
          </article>
        </aside>
      </div>
    </>
  );
}
