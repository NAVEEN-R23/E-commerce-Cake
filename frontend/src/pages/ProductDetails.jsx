import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../pages/dummyProducts'; // Adjust path if needed
import { FaShoppingCart, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams(); // Gets the ID from the URL (/product/1)
  const [inCart, setInCart] = useState(false);

  // Find the specific product that matches the ID
  // Note: useParams returns a string, so we convert it to a Number to match our data
  const product = productsData.find((p) => p.id === Number(id));

  // If someone types a random ID in the URL that doesn't exist
  if (!product) {
    return (
      <div className="bg-[#1a0f03] min-h-screen flex flex-col items-center justify-center text-[#fde68a]">
        <h2 className="text-3xl mb-4 font-semibold">Product Not Found</h2>
        <Link to="/cakes" className="text-[#8B6914] hover:text-[#fde68a] underline underline-offset-4">
          Return to Cakes
        </Link>
      </div>
    );
  }

  const handleCartClick = () => {
    if (!inCart) setInCart(true);
    else console.log("Navigating to cart...");
  };

  return (
    <div className="bg-[white] min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link 
          to={-1} // Goes back to the previous page (Cakes or Desserts)
          className="inline-flex items-center gap-2 text-[#8B6914] hover:text-[#fde68a] transition mb-8 text-sm uppercase tracking-widest"
        >
          <FaArrowLeft /> Back to Menu
        </Link>

        {/* Product Layout */}
        <div className="flex flex-col md:flex-row gap-10 bg-[#2e1a06] border border-[#8B6914] rounded-2xl p-6 md:p-10 shadow-[0_0_20px_#00000050]">
          
          {/* Left: Big Image */}
          <div className="w-full md:w-1/2 h-80 md:h-[450px] rounded-xl overflow-hidden border border-[#8B6914]">
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Product Info */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="text-[#8B6914] text-xs uppercase tracking-[4px] mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl text-[#fde68a] font-semibold leading-tight mb-4">
              {product.title}
            </h1>
            <p className="text-2xl text-[#fde68a] font-bold mb-6">
              {product.price}
            </p>
            <p className="text-[#8B6914] leading-relaxed mb-8 md:text-lg">
              {product.description}
            </p>

            {/* Add to Cart Big Button */}
            <button
              onClick={handleCartClick}
              className={`flex items-center justify-center gap-3 w-full md:w-2/3 py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 border ${
                inCart
                  ? "bg-[#fde68a] border-[#fde68a] text-[#3b2207] hover:bg-[#e6c15c] shadow-[0_0_15px_#fde68a40]"
                  : "bg-[#4a2e10] border-[#8B6914] text-[#fde68a] hover:border-[#fde68a] hover:shadow-[0_0_15px_#fde68a40]"
              }`}
            >
              {inCart ? (
                <>Go to Checkout <FaArrowRight /></>
              ) : (
                <><FaShoppingCart /> Add to Order</>
              )}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;