import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaShoppingCart,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [inCart, setInCart] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

useEffect(() => {
  fetchProduct();
  window.scrollTo(0, 0); // 🔥 smooth UX
}, [id]);
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/products/getdata`
      );

      const allProducts = res.data.data;
      const found = allProducts.find((p) => p._id === id);

      setProduct(found);
      setMainImage(found?.thumbnail?.url || found?.images?.[0]?.url);
      setSelectedVariant(found?.variants?.[0]);

      // ✅ Related Products (same category)
      const related = allProducts.filter(
        (p) => p.category === found.category && p._id !== found._id
      );

      setRelatedProducts(related.slice(0, 4));
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#8B6914]">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-[#fffaf0] min-h-screen py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <Link
          to={-1}
          className="flex items-center gap-2 text-[#8B6914] mb-6 hover:underline"
        >
          <FaArrowLeft /> Back
        </Link>

        {/* MAIN SECTION */}
        <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-2xl p-6">

          {/* LEFT */}
          <div>
            {/* Main Image */}
            <div className="h-96 rounded-xl overflow-hidden border shadow">
              <img
                src={mainImage}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                alt=""
              />
            </div>

            {/* Thumbnails */}
            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {[product.thumbnail, ...(product.images || [])].map((img, i) => (
                <img
                  key={i}
                  src={img?.url}
                  alt="thumbnail"
                  onClick={() => setMainImage(img?.url)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    mainImage === img?.url ? "border-[#8B6914]" : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <p className="text-sm text-[#8B6914] uppercase">
              {product.category} / {product.subCategory}
            </p>

            <h1 className="text-4xl font-bold text-[#3b2207] my-3">
              {product.title}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-[#3b2207]">
                ₹{selectedVariant?.price || product.price}
              </span>

              {product.discountPrice && (
                <span className="line-through text-gray-400">
                  ₹{product.price}
                </span>
              )}
            </div>

            {/* Stock */}
            <p className="mt-2">
              {product.stock > 0 ? (
                <span className="text-green-600 font-medium">In Stock</span>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </p>

            {/* Badge */}
            {/* 🔥 BADGES ROW (Weight & Eggless) */}
            <div className="flex flex-wrap gap-2 mt-4">
              {/* If the product has a specific weight from your Admin form */}
              {product.weight && (
                <span className="inline-block bg-[#fde68a] text-[#3b2207] px-4 py-1 text-sm rounded-full font-semibold shadow-sm border border-[#8B6914]/30">
                  {product.weight}
                </span>
              )}
              
              {product.Eggless && (
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 text-sm rounded-full font-semibold shadow-sm border border-green-300">
                  Eggless
                </span>
              )}
            </div>

            <p className="mt-4 text-gray-600">
              {product.shortDescription}
            </p>
            
            {/* Variants */}
            {product.variants?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Select Weight:</h3>
                <div className="flex gap-3">
                  {product.variants.map((v, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-full border transition ${
                        selectedVariant?.weight === v.weight
                          ? "bg-[#8B6914] text-white"
                          : "hover:border-[#8B6914]"
                      }`}
                    >
                      {v.weight}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavors */}
            {product.flavors?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Flavors:</h3>
                <div className="flex gap-2 flex-wrap">
                  {product.flavors.map((f, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-[#fde68a] text-[#3b2207] rounded-full text-sm"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-6 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Button */}
            <button
              onClick={() => setInCart(true)}
              className="mt-8 w-full py-3 bg-[#3b2207] hover:bg-[#8B6914] text-white rounded-lg flex justify-center items-center gap-2 transition"
            >
              {inCart ? (
                <>Go to Cart <FaArrowRight /></>
              ) : (
                <><FaShoppingCart /> Add to Cart</>
              )}
            </button>
          </div>
        </div>

        {/* 🔥 RELATED PRODUCTS */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#3b2207] mb-6">
            Related Products
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition p-3"
              >
                <img
                  src={item.thumbnail?.url}
                  className="h-40 w-full object-cover rounded"
                />

                <h3 className="mt-3 font-semibold text-[#3b2207]">
                  {item.title}
                </h3>

                <p className="text-[#8B6914] font-bold">
                  ₹{item.price}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;