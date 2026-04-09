// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   FaShoppingCart,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";

// const ProductDetail = () => {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [inCart, setInCart] = useState(false);

//   // 🔄 Fetch Single Product
//   useEffect(() => {
//     fetchProduct();
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/products/getdata`
//       );

//       const found = res.data.data.find((p) => p._id === id);

//       setProduct(found);
//       setMainImage(found?.thumbnail || found?.images[0]);
//       setSelectedVariant(found?.variants?.[0]);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!product) {
//     return (
//       <div className="min-h-screen flex items-center justify-center text-[#8B6914]">
//         Loading...
//       </div>
//     );
//   }

//   const handleCartClick = () => {
//     setInCart(true);
//   };

//   return (
//     <div className="bg-white min-h-screen py-10 px-4 md:px-10">
//       <div className="max-w-6xl mx-auto">

//         {/* 🔙 Back */}
//         <Link
//           to={-1}
//           className="flex items-center gap-2 text-[#8B6914] mb-6"
//         >
//           <FaArrowLeft /> Back
//         </Link>

//         <div className="grid md:grid-cols-2 gap-10">

//           {/* 🖼️ LEFT SIDE */}
//           <div>
//             {/* Main Image */}
//             <div className="h-96 border rounded-xl overflow-hidden">
//               <img
//                 src={`http://localhost:5000/uploads/${mainImage}`}
//                 className="w-full h-full object-cover"
//                 alt=""
//               />
//             </div>

//             {/* Thumbnails */}
//             <div className="flex gap-3 mt-4">
//               {[product.thumbnail, ...product.images].map((img, i) => (
//                 <img
//                   key={i}
//                   src={`http://localhost:5000/uploads/${img}`}
//                   onClick={() => setMainImage(img)}
//                   className="w-20 h-20 object-cover border cursor-pointer"
//                 />
//               ))}
//             </div>
//           </div>

//           {/* 📦 RIGHT SIDE */}
//           <div>
//             {/* Category */}
//             <p className="text-sm text-[#8B6914] uppercase">
//               {product.category} / {product.subCategory}
//             </p>

//             {/* Title */}
//             <h1 className="text-4xl font-bold text-[#3b2207] my-3">
//               {product.title}
//             </h1>

//             {/* Price */}
//             <div className="flex items-center gap-4">
//               <span className="text-2xl font-bold text-[#3b2207]">
//                 ₹{selectedVariant?.price || product.price}
//               </span>

//               {product.discountPrice && (
//                 <span className="line-through text-gray-500">
//                   ₹{product.price}
//                 </span>
//               )}
//             </div>

//             {/* Stock */}
//             <p className="mt-2 text-sm">
//               {product.stock > 0 ? (
//                 <span className="text-green-600">In Stock</span>
//               ) : (
//                 <span className="text-red-600">Out of Stock</span>
//               )}
//             </p>

//             {/* Eggless Badge */}
//             {product.Eggless && (
//               <span className="inline-block bg-green-100 text-green-700 px-2 py-1 text-xs rounded mt-2">
//                 Eggless
//               </span>
//             )}

//             {/* Short Desc */}
//             <p className="mt-4 text-gray-600">
//               {product.shortDescription}
//             </p>

//             {/* 🎂 Variants */}
//             {product.variants?.length > 0 && (
//               <div className="mt-6">
//                 <h3 className="font-semibold mb-2">Select Weight:</h3>
//                 <div className="flex gap-3">
//                   {product.variants.map((v, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedVariant(v)}
//                       className={`px-4 py-2 border rounded ${
//                         selectedVariant?.weight === v.weight
//                           ? "bg-[#8B6914] text-white"
//                           : ""
//                       }`}
//                     >
//                       {v.weight}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* 🍫 Flavors */}
//             {product.flavors?.length > 0 && (
//               <div className="mt-6">
//                 <h3 className="font-semibold mb-2">Flavors:</h3>
//                 <div className="flex gap-2 flex-wrap">
//                   {product.flavors.map((f, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 bg-[#fde68a] text-[#3b2207] rounded"
//                     >
//                       {f}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Description */}
//             <p className="mt-6 text-gray-700">
//               {product.description}
//             </p>

//             {/* 🛒 Button */}
//             <button
//               onClick={handleCartClick}
//               className="mt-8 w-full py-3 bg-[#3b2207] text-white rounded flex justify-center items-center gap-2"
//             >
//               {inCart ? (
//                 <>Go to Cart <FaArrowRight /></>
//               ) : (
//                 <><FaShoppingCart /> Add to Cart</>
//               )}
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import {
//   FaShoppingCart,
//   FaArrowLeft,
//   FaArrowRight,
//   FaLeaf
// } from "react-icons/fa";

// const ProductDetail = () => {
//   const { id } = useParams();

//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState("");
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [inCart, setInCart] = useState(false);

//   // 🔄 Fetch Single Product
//   useEffect(() => {
//     fetchProduct();
//   }, [id]);

//   const fetchProduct = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:5000/products/getdata`
//       );

//       const found = res.data.data.find((p) => p._id === id);

//       if (found) {
//         setProduct(found);
//         setMainImage(found.thumbnail || (found.images && found.images[0]));
//         setSelectedVariant(found.variants?.[0]);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   if (!product) {
//     return (
//       <div className="bg-[#1a0f03] min-h-screen flex items-center justify-center text-[#fde68a] text-xl tracking-widest uppercase">
//         <div className="animate-pulse flex gap-3 items-center">
//           <div className="w-4 h-4 rounded-full bg-[#fde68a]"></div>
//           Baking your request...
//         </div>
//       </div>
//     );
//   }

//   const handleCartClick = () => {
//     if (!inCart) setInCart(true);
//     else console.log("Navigating to cart...");
//   };

//   // Safely combine thumbnail and images, removing any undefined values
//   const allImages = [product.thumbnail, ...(product.images || [])].filter(Boolean);

//   return (
//     <div className="bg-[#1a0f03] min-h-screen py-8 px-4 md:px-10 font-sans">
//       <div className="max-w-6xl mx-auto">

//         {/* 🔙 Back */}
//         <Link
//           to={-1}
//           className="inline-flex items-center gap-2 text-[#8B6914] hover:text-[#fde68a] transition-colors uppercase tracking-widest text-xs font-semibold mb-8"
//         >
//           <FaArrowLeft /> Back to Menu
//         </Link>

//         {/* 🌟 Main Card Container */}
//         <div className="grid lg:grid-cols-2 gap-10 bg-[#2e1a06] border border-[#8B6914] rounded-2xl p-5 md:p-10 shadow-[0_0_20px_#00000080]">

//           {/* 🖼️ LEFT SIDE (Images) */}
//           <div className="flex flex-col gap-4">
//             {/* Main Image */}
//             <div className="w-full h-80 md:h-[500px] border border-[#8B6914] rounded-xl overflow-hidden shadow-lg relative group">
//               <img
//                 src={`http://localhost:5000/uploads/${mainImage}`}
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                 alt={product.title}
//               />
//               {/* Optional Glass Overlay effect */}
//               <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/60 to-transparent pointer-events-none"></div>
//             </div>

//             {/* Thumbnails (Scrollable on mobile) */}
//             <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
//               {allImages.map((img, i) => (
//                 <div
//                   key={i}
//                   onClick={() => setMainImage(img)}
//                   className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-300 ${
//                     mainImage === img
//                       ? "border-[#fde68a] shadow-[0_0_10px_#fde68a50] opacity-100"
//                       : "border-[#8B6914] opacity-60 hover:opacity-100"
//                   }`}
//                 >
//                   <img
//                     src={`http://localhost:5000/uploads/${img}`}
//                     className="w-full h-full object-cover"
//                     alt={`Thumbnail ${i + 1}`}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* 📦 RIGHT SIDE (Details) */}
//           <div className="flex flex-col justify-center">
            
//             {/* Category Breadcrumb */}
//             <p className="text-xs text-[#8B6914] uppercase tracking-[3px] mb-2 font-bold">
//               {product.category} {product.subCategory && `• ${product.subCategory}`}
//             </p>

//             {/* Title */}
//             <h1 className="text-3xl md:text-5xl font-semibold text-[#fde68a] mb-4 leading-tight">
//               {product.title}
//             </h1>

//             {/* Badges (Stock & Eggless) */}
//             <div className="flex items-center gap-3 mb-4">
//               <span className={`text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full border ${
//                 product.stock > 0 
//                   ? "bg-[#1f2e1a] text-green-400 border-green-800" 
//                   : "bg-[#2e1a1a] text-red-400 border-red-800"
//               }`}>
//                 {product.stock > 0 ? "In Stock" : "Sold Out"}
//               </span>

//               {product.Eggless && (
//                 <span className="flex items-center gap-1 bg-[#4a2e10] text-[#fde68a] border border-[#8B6914] px-3 py-1 text-xs uppercase tracking-widest font-bold rounded-full">
//                   <FaLeaf size={10} /> Eggless
//                 </span>
//               )}
//             </div>

//             {/* Price */}
//             <div className="flex items-end gap-4 mb-6">
//               <span className="text-4xl font-bold text-[#fde68a]">
//                 ₹{selectedVariant?.price || product.price}
//               </span>
//               {product.discountPrice && (
//                 <span className="text-lg line-through text-[#8B6914] mb-1">
//                   ₹{product.price}
//                 </span>
//               )}
//             </div>

//             {/* Short Desc */}
//             <p className="text-[#fde68a] opacity-90 text-lg mb-6 leading-relaxed">
//               {product.shortDescription}
//             </p>

//             <hr className="border-[#8B6914]/50 mb-6" />

//             {/* 🎂 Variants (Weight) */}
//             {product.variants?.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-[#8B6914] text-sm uppercase tracking-widest mb-3">Select Size</h3>
//                 <div className="flex flex-wrap gap-3">
//                   {product.variants.map((v, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedVariant(v)}
//                       className={`px-5 py-2.5 rounded-lg border font-medium tracking-wide transition-all duration-300 ${
//                         selectedVariant?.weight === v.weight
//                           ? "bg-[#fde68a] text-[#3b2207] border-[#fde68a] shadow-[0_0_10px_#fde68a40]"
//                           : "bg-[#4a2e10] text-[#fde68a] border-[#8B6914] hover:border-[#fde68a]"
//                       }`}
//                     >
//                       {v.weight}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* 🍫 Flavors */}
//             {product.flavors?.length > 0 && (
//               <div className="mb-6">
//                 <h3 className="text-[#8B6914] text-sm uppercase tracking-widest mb-3">Available Flavors</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {product.flavors.map((f, i) => (
//                     <span
//                       key={i}
//                       className="px-4 py-1.5 bg-[#4a2e10] border border-[#8B6914] text-[#fde68a] text-sm rounded-full shadow-sm"
//                     >
//                       {f}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Full Description */}
//             <div className="mt-4 mb-8">
//                <h3 className="text-[#8B6914] text-sm uppercase tracking-widest mb-2">Details</h3>
//                <p className="text-[#8B6914] leading-relaxed text-sm md:text-base">
//                  {product.description}
//                </p>
//             </div>

//             {/* 🛒 Add to Cart Button */}
//             <button
//               onClick={handleCartClick}
//               disabled={product.stock <= 0}
//               className={`mt-auto flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 border ${
//                 product.stock <= 0
//                   ? "bg-[#2e1a06] border-[#8B6914] text-[#8B6914] cursor-not-allowed"
//                   : inCart
//                   ? "bg-[#fde68a] border-[#fde68a] text-[#3b2207] hover:bg-[#e6c15c] shadow-[0_0_15px_#fde68a40]"
//                   : "bg-[#4a2e10] border-[#8B6914] text-[#fde68a] hover:border-[#fde68a] hover:shadow-[0_0_15px_#fde68a40]"
//               }`}
//             >
//               {product.stock <= 0 ? (
//                 "Out of Stock"
//               ) : inCart ? (
//                 <>Go to Cart <FaArrowRight /></>
//               ) : (
//                 <><FaShoppingCart size={18} /> Add to Order</>
//               )}
//             </button>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


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
      setMainImage(found?.thumbnail || found?.images[0]);
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
                src={`http://localhost:5000/uploads/${mainImage}`}
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
                alt=""
              />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 mt-4">
              {[product.thumbnail, ...product.images].map((img, i) => (
                <img
                  key={i}
                  src={`http://localhost:5000/uploads/${img}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                    mainImage === img ? "border-[#8B6914]" : "border-gray-200"
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
            {product.Eggless && (
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 text-xs rounded-full mt-2">
                Eggless
              </span>
            )}

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
                  src={`http://localhost:5000/uploads/${item.thumbnail}`}
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