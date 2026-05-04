import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { catalog } from "@/lib/catalog";
import { getCart, toggleCart } from "@/utils/userStore";

import MainLayout from "@/layouts/MainLayout";
import UserLayout from "@/layouts/UserLayout";
import Footer from "./Footer";

export default function CartPage() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const Wrapper = user ? UserLayout : MainLayout;

  const [step, setStep] = useState(1);

  const cartIds = getCart();
  const cartItems = catalog.filter((c) => cartIds.includes(c.id));

  const total = cartItems.reduce((acc, c) => acc + (c.price || 1000), 0);
  const discount = Math.floor(total * 0.2);
  const final = total - discount;

  return (
    <Wrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:py-1">
        <h1 className="text-xl sm:text-2xl font-bold mb-2"> Billing Page</h1>
        {/* ================= STEPPER ================= */}
        <div className="flex items-center justify-center mb-8">
          {["Cart", "Checkout", "Success"].map((label, i) => {
            const s = i + 1;

            return (
              <div key={s} className="flex items-center">

                {/* CIRCLE */}
                <div className="flex items-center justify-start sm:justify-center mb-6 sm:mb-8 overflow-x-auto">
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold z-10
                    ${
                      step === s
                        ? "bg-purple-600 text-white"
                        : step > s
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {s}
                  </div>

                  <span className="text-xs mt-2">{label}</span>
                </div>

                {/* LINE */}
                {i !== 2 && (
                  <div className="w-10 sm:w-16 md:w-20 h-[2px] bg-gray-300 mx-2 relative top-[-10px]">
                    <div
                      className={`h-full ${
                        step > s ? "bg-green-500" : ""
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold">Cart</h2>

              {cartItems.length === 0 ? (
                <p>Cart is empty</p>
              ) : (
                cartItems.map((c) => (
                  <div
                    key={c.id}
                    className="border p-3 sm:p-4 rounded-xl flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center"
                  >
                    <img
                      src={c.thumbnail}
                      className="w-full sm:w-32 h-32 sm:h-20 object-cover rounded"
                    />

                    <div className="flex-1">
                      <h3
                        onClick={() => navigate(`/courses/${c.id}`)}
                        className="font-semibold cursor-pointer hover:text-purple-600"
                      >
                        {c.title}
                      </h3>

                      <p className="text-sm text-gray-500">{c.category}</p>

                      <p className="text-xs text-gray-400 mt-1">
                        {c.videos?.length || 0} videos
                      </p>
                    </div>

                    <div className="w-full sm:w-auto text-left sm:text-right">
                      <p className="font-bold">₹ {c.price || 1000}</p>

                      <button
                        onClick={() => {
                          toggleCart(c.id);
                          window.location.reload();
                        }}
                        className="text-red-500 text-xs mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT */}
            <div className="border p-4 rounded-xl h-fit space-y-3 mt-8 lg:mt-12">
              <h3 className="font-semibold text-lg">Price Details</h3>

              <div className="flex justify-between text-sm">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>

              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>- ₹ {discount}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold">
                <span>Final</span>
                <span>₹ {final}</span>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-purple-600 text-white py-2 rounded"
              >
                Next → Checkout
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <div className="max-w-xl mx-auto border p-4 sm:p-6 rounded-xl space-y-4">
            <h2 className="text-xl font-bold">Checkout</h2>

            <input
              placeholder="Full Name"
              className="w-full border p-2 rounded"
            />
            <input
              placeholder="Address"
              className="w-full border p-2 rounded"
            />
            <input
              placeholder="Phone Number"
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-full border py-2 rounded"
              >
                ← Back
              </button>

              <button
                onClick={() => {
                  localStorage.removeItem("cart_courses");
                  setStep(3);
                }}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="min-h-[50vh] sm:h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-3xl font-bold text-green-600">
              🎉 Order Successful!
            </h2>

            <p className="text-gray-500 mt-2">
              Your courses are now available.
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setStep(2)}
                className="border px-4 py-2 rounded"
              >
                ← Back
              </button>

              <button
                onClick={() => navigate("/courses")}
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Go to Courses
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer/>
    </Wrapper>   
  );
}

