import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity } from "../redux/cartSlice";
import { toggleWishlist } from "../redux/wishlistSlice";
import axiosInstance from "../utils/axiosInstance";
import { setCart } from "../redux/cartSlice";


function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const { _id, thumbnail, title, description, price } = product;

  const user = JSON.parse(localStorage.getItem("user"));

  const isInCart = (id) => { return cartItems?.some((item) => item.productId?._id === id) }
  const isWishlisted = wishlistItems.some((item) => item._id === _id);

  const handleCartClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user || !user?.id) {
      alert("please login first");
      return;
    }
    const alreadyInCart = isInCart(product._id);
    if (alreadyInCart) {
      navigate("/cart");
      return;
    }

    try {
      const res = await axiosInstance.post("/cart/add", {
        userId: user.id,
        productId: _id
      });

      console.log("CART ADD RESPONSE:", res.data);

      // ✅ Fetch updated cart
      const cartRes = await axiosInstance.get(`/cart/${user.id}`);
      console.log("UPDATED CART:", cartRes.data);

      dispatch(setCart(cartRes.data.items || []));

    } catch (err) {
      console.log("Cart API error:", err.response?.data || err.message);
    }
  };
  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleWishlist(product));

    try {
      await axiosInstance.post("/wishlist/toggle", {
        userId: user.id,
        productId: _id
      });
    } catch (err) {
      console.log("wishlist api error", err);
    }
  };



  return (
    <div className="relative w-full max-w-sm bg-[#2e1a06] border border-[#8B6914] rounded-2xl overflow-hidden shadow-lg group flex flex-col">

      <Link to={`/product/${_id}`} className="block grow">

        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={thumbnail?.url}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 w-9 h-9 bg-[#2e1a06]/80 border border-[#8B6914] rounded-full flex items-center justify-center text-[#fde68a]"
          >
            {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
          </button>
        </div>

        <div className="p-5 pb-2 flex flex-col gap-3">
          <div className="flex justify-between">
            <h3 className="text-[#fde68a] text-lg font-semibold">
              {title}
            </h3>
            <span className="text-[#fde68a] font-bold">
              ₹ {price}
            </span>
          </div>

          <p className="text-[#8B6914] text-sm line-clamp-2">
            {description}
          </p>
        </div>
      </Link>

      <div className="p-5 pt-2 mt-auto">
        <button
          onClick={(e) => handleCartClick(e, product)}
          className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 ${isInCart(product._id)
            ? "bg-[#fde68a] text-[#3b2207]"
            : "bg-[#4a2e10] text-[#fde68a]"
            }`}
        >
          {isInCart(product._id) ? (
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
    </div>
  );
}

export default ProductCard;

