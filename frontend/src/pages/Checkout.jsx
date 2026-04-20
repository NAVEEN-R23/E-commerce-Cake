import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import { setCart } from "../redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + (item.productId?.price || 0) * (item.quantity || 1);
  }, 0);

  const tax = subtotal * 0.05;
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + delivery;

  const handleOrder = async () => {
    if (!user?.id) {
      alert("Please login first");
      return;
    }

    try {
      await axiosInstance.post("/order/place-order", {
        userId: user.id,
        paymentMethod,
      });

      // 🧹 Clear Redux cart
      dispatch(setCart([]));

      navigate("/success");
    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#2e1a06] text-[#fde68a] p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="bg-[#3b2207] p-4 rounded-lg mb-6">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>{item.productId?.title} x {item.quantity}</span>
            <span>₹ {(item.productId?.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}

        <hr className="my-3 border-[#8B6914]" />

        <div className="flex justify-between">
          <span>Total</span>
          <span>₹ {total.toFixed(2)}</span>
        </div>
      </div>

      {/* Payment */}
      <div className="bg-[#3b2207] p-4 rounded-lg mb-6">
        <label className="flex gap-2">
          <input
            type="radio"
            checked={paymentMethod === "COD"}
            onChange={() => setPaymentMethod("COD")}
          />
          Cash on Delivery
        </label>

        <label className="flex gap-2 opacity-50">
          <input type="radio" disabled />
          Online Payment (Coming Soon)
        </label>
      </div>

      <button
        onClick={handleOrder}
        className="w-full bg-[#fde68a] text-[#3b2207] py-3 rounded-lg"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;