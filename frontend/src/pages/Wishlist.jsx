import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { addToCart } from "../redux/cartSlice";
import axiosInstance from "../utils/axiosInstance";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isInCart = (id) => {
    return cartItems?.some((item) => item.productId?._id === id);
  };

  const handleCartClick = async (e, item) => {
    e.stopPropagation(); // 🔥 prevent parent click

    try {
      console.log("BUTTON CLICKED");

      const user = JSON.parse(localStorage.getItem("user"));

      const alreadyInCart = isInCart(item._id);
      console.log("isInCart:", alreadyInCart);

      if (alreadyInCart) {
        navigate("/cart");
        return;
      }

      const addRes = await axiosInstance.post("/cart/add", {
        userId: user.id,       // ✅ FIXED
        productId: item._id,    // ✅ FIXED
      });

      console.log("ADD RESPONSE:", addRes.data);

      const res = await axiosInstance.get(`/cart/${user.id}`);
      dispatch(setCart(res.data.items));
    } catch (error) {
      console.log("Add to cart error:", error);
    }
  };

  const handleRemove = (item) => {
    dispatch(toggleWishlist(item));
  };

  return (
    <div className="min-h-screen bg-[#2e1a06] text-[#fde68a] p-6">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist ❤️</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-[#8B6914]">No items in wishlist</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="bg-[#3b2207] border border-[#8B6914] rounded-xl overflow-hidden shadow-lg"
            >

              {/* Image */}
              <div
                onClick={() => navigate(`/product/${item._id}`)}
                className="cursor-pointer"
              >
                <img
                  src={item.thumbnail?.url}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-semibold text-lg">{item.title}</h2>

                <p className="text-[#8B6914] text-sm line-clamp-2">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-2">
                  <span className="font-bold">₹ {item.price}</span>

                  <button
                    onClick={() => handleRemove(item)}
                    className="text-red-400 hover:text-red-600 transition"
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>

              {/* 🔥 ADD TO CART BUTTON (YOU MISSED THIS) */}
              <button
                type="button"
                onClick={(e) => handleCartClick(e, item)}
                className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 relative z-10 ${isInCart(item._id)
                  ? "bg-[#fde68a] text-[#3b2207]"
                  : "bg-[#4a2e10] text-[#fde68a]"
                  }`}
              >
                {isInCart(item._id) ? (
                  <>
                    Go to Cart <FaArrowRight size={14} />
                  </>
                ) : (
                  <>
                    <FaShoppingCart size={14} /> Add to Cart
                  </>
                )}
              </button>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default Wishlist;