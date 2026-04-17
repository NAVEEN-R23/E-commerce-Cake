import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { setCart } from "../redux/cartSlice";

const Addtocart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("USE EFFECT RUNNING");
        const fetchCart = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user"));
                console.log("USER IN CART:", user)
                if (!user || !user.id) return;
                const res = await axiosInstance.get(`/cart/${user.id}`);
                console.log("API RESPONSE:", res.data)
                dispatch(setCart(res.data.items || []));

            } catch (err) {
                console.log("FETCH ERROR:", err.response?.data || err.message)
            }
        }
        fetchCart();
    }, [dispatch]);



    // 💰 Calculations
    const subtotal = cartItems.reduce((acc, item) => {
        const price = item.productId?.price || 0;
        const qty = item.quantity || 1;
        return acc + price * qty
    }, 0);

    const tax = subtotal * 0.05;
    const delivery = subtotal > 500 ? 0 : 50;
    const total = subtotal + tax + delivery;

    return (
        <div className="min-h-screen bg-[#2e1a06] text-[#fde68a] p-6">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-[#8B6914]">Your cart is empty 🛒</p>
            ) : (
                <div className="flex flex-col gap-4">

                    {/* 🛒 Cart Items */}
                    {cartItems.map((item) => (
                        <div
                            key={item.productId._id}
                            className="flex items-center justify-between bg-[#3b2207] border border-[#8B6914] rounded-lg p-4"
                        >
                            {/* Left */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.productId.thumbnail?.url}
                                    alt={item.productId.title}
                                    className="w-16 h-16 object-cover rounded"
                                />

                                <div>
                                    <h2 className="font-semibold">{item.productId.title}</h2>
                                    <p className="text-sm text-[#8B6914]">
                                        ₹ {item.productId?.price}
                                    </p>

                                    {/* 🔢 Quantity Controls */}
                                   <button
                                        type="button"
                                        onClick={async () => {
                                            if ((item.quantity || 1) <= 1) {
                                            // 🔥 Remove item completely
                                            dispatch(removeFromCart(item.productId._id));

                                            await axiosInstance.post("/cart/remove", {
                                                userId: user.id,
                                                productId: item.productId._id,
                                            });
                                            } else {
                                            // Normal decrease
                                            dispatch(decreaseQuantity(item.productId._id));

                                            await axiosInstance.post("/cart/decrease", {
                                                userId: user.id,
                                                productId: item.productId._id,
                                            });
                                            }
                                        }}
                                        className="px-2 bg-[#fde68a] text-black rounded"
                                        >
                                        -
                                        </button>

                                        <span>{item.quantity || 1}</span>

                                        <button
                                            type="button"
                                            onClick={async () => {
                                                dispatch(increaseQuantity(item.productId._id))
                                                await axiosInstance.post("/cart/add", {
                                                    userId: user.id,
                                                    productId: item.productId._id,
                                                })
                                            }}
                                            className="px-2 bg-[#fde68a] text-black rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                            {/* Right */}
                            <div className="text-right">
                                <p className="font-bold">
                                    ₹ {(item.productId.price * (item.quantity || 1)).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* 💰 Price Summary */}
                    <div className="mt-6 border-t border-[#8B6914] pt-4 space-y-2 text-sm">

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹ {subtotal.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Tax (5%)</span>
                            <span>₹ {tax.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span className="text-green-400">
                                {delivery === 0 ? "Free 🚚" : `₹ ${delivery}`}
                            </span>
                        </div>

                        {subtotal < 500 && (
                            <p className="text-xs text-red-400">
                                Add ₹ {500 - subtotal} more for FREE delivery
                            </p>
                        )}

                        <div className="flex justify-between font-bold text-lg border-t pt-2">
                            <span>Total</span>
                            <span>₹ {total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* 🛒 Checkout Button */}
                    <button className="mt-4 bg-[#fde68a] text-[#3b2207] py-3 rounded-lg font-semibold hover:opacity-90">
                        Proceed to Checkout
                    </button>

                </div>
            )}
        </div>
    );
};

export default Addtocart;