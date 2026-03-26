import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaShoppingCart, FaArrowRight } from "react-icons/fa";

function ProductCard({ product }) {
  const [inCart, setInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Added 'id' to the destructuring!
  const { id, image, title, description, price } = product;

  const handleCartClick = (e) => {
    e.preventDefault(); // Prevents the Link from triggering if they just want to add to cart
    if (inCart) {
      console.log("Navigating to Cart...");
    } else {
      setInCart(true);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Prevents the Link from triggering when clicking the heart
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="relative w-full max-w-sm bg-[#2e1a06] border border-[#8B6914] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:border-[#fde68a] hover:shadow-[0_0_15px_#fde68a30] group flex flex-col">
      
      {/* Link wrapping the top half of the card */}
      <Link to={`/product/${id}`} className="block flex-grow">
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
          />
          
          {/* Wishlist Heart Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 w-9 h-9 bg-[#2e1a06]/80 backdrop-blur-sm border border-[#8B6914] rounded-full flex items-center justify-center text-[#fde68a] hover:border-[#fde68a] hover:shadow-[0_0_8px_#fde68a40] transition z-10"
          >
            {isWishlisted ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
          </button>
        </div>

        {/* Card Content (Title & Desc) */}
        <div className="p-5 pb-2 flex flex-col gap-3">
          <div className="flex justify-between items-start gap-2">
            <h3 className="text-[#fde68a] text-lg font-semibold tracking-wide leading-tight group-hover:underline decoration-[#8B6914] underline-offset-4">
              {title}
            </h3>
            <span className="text-[#fde68a] font-bold text-lg whitespace-nowrap">
              {price}
            </span>
          </div>
          <p className="text-[#8B6914] text-sm line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>
      </Link>

      {/* Action Button (Kept outside the Link so it doesn't navigate to the product page) */}
      <div className="p-5 pt-2 mt-auto">
        <button
          onClick={handleCartClick}
          className={`mt-2 flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-medium tracking-wide transition-all duration-300 border ${
            inCart
              ? "bg-[#fde68a] border-[#fde68a] text-[#3b2207] hover:bg-[#e6c15c] hover:border-[#e6c15c]"
              : "bg-[#4a2e10] border-[#8B6914] text-[#fde68a] hover:border-[#fde68a] hover:shadow-[0_0_10px_#fde68a50]"
          }`}
        >
          {inCart ? (
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