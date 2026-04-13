// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";

// const Desserts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/products/getdata");

//       // ✅ Filter Cakes category from backend data
//       const dessertProducts = res.data.data.filter(
//         (product) => product.category === "Desserts"
//       );

//       setProducts(dessertProducts);
//     } catch (error) {
//       console.log("Error fetching cakes:", error);
//     }
//   };

//   return (
//     <div className="bg-white min-h-screen py-10 px-4 md:px-10">
      
//       <h1
//         className="text-4xl md:text-5xl text-[#8B6914] text-center mb-10"
//         style={{ fontFamily: "Style Script" }}
//       >
//         Signature Desserts
//       </h1>

//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

//           {products.length > 0 ? (
//             products.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))
//           ) : (
//             <p className="text-[#8B6914] text-center col-span-3">
//               No Desserts available
//             </p>
//           )}

//         </div>
//       </div>

//     </div>
//   );
// };

// export default Desserts;



import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Desserts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Mobile sidebar toggle state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter states
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedFlavor, setSelectedFlavor] = useState("");
  const [priceRange, setPriceRange] = useState(1000); // Max price set to 1000 for desserts
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [selectedSubCategory, selectedFlavor, priceRange, sortOrder, allProducts]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products/getdata");
      // Filter for Desserts category
      const desserts = res.data.data.filter((p) => p.category === "Desserts");
      setAllProducts(desserts);
      setFilteredProducts(desserts);
    } catch (error) {
      console.log("Error fetching desserts:", error);
    }
  };

  const applyFiltersAndSort = () => {
    let updated = [...allProducts];

    // Filter by Subcategory (Assumes your backend uses 'subCategory' or adjust to match your DB schema)
    if (selectedSubCategory) {
      updated = updated.filter((p) => p.subCategory === selectedSubCategory);
    }

    // Filter by Flavor
    if (selectedFlavor) {
      updated = updated.filter((p) => p.flavors?.includes(selectedFlavor));
    }

    // Filter by Price
    updated = updated.filter((p) => p.price <= priceRange);

    // Sort
    if (sortOrder === "price-asc") updated.sort((a, b) => a.price - b.price);
    else if (sortOrder === "price-desc") updated.sort((a, b) => b.price - a.price);

    setFilteredProducts(updated);
  };

  const resetFilters = () => {
    setSelectedSubCategory("");
    setSelectedFlavor("");
    setPriceRange(1000);
    setSortOrder("");
  };

  return (
    // Replaced bg-white with bg-[beige] to keep consistent with the Cakes page theme
    <div className="bg-[beige] min-h-screen flex items-start relative">
      
      {/* ── MOBILE OVERLAY BACKDROP ── */}
      {isMobileFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
          onClick={() => setIsMobileFiltersOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen w-64 shrink-0 bg-[#2e1a06] border-r border-[#8B6914] flex flex-col overflow-hidden z-50 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header with Mobile Close Button */}
        <div className="px-6 py-5 border-b border-[#8B6914] shrink-0 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#fde68a] uppercase tracking-widest">
            Filters
          </h2>
          <button 
            className="md:hidden text-[#fde68a] hover:text-white"
            onClick={() => setIsMobileFiltersOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable filter body */}
        <div className="flex-1 px-6 py-6 space-y-6 overflow-y-auto scrollbar-hide">
          
          {/* Sort By */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-[#8B6914] uppercase tracking-widest">
              Sort By
            </h3>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full bg-[#4a2e10] border border-[#8B6914] text-[#fde68a] text-sm rounded-lg px-3 py-2 outline-none focus:border-[#fde68a] focus:ring-1 focus:ring-[#fde68a] transition"
            >
              <option value="">Default (Recommended)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <hr className="border-[#8B6914]/30" />

          {/* Subcategory */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-[#8B6914] uppercase tracking-widest">
              Subcategory
            </h3>
            <div className="space-y-2">
              {["Muffins", "Donuts", "Brownies", "Cupcakes", "Macarons"].map((sub) => (
                <label key={sub} className="flex items-center gap-3 text-sm text-[#fde68a] cursor-pointer">
                  <input
                    type="radio"
                    name="subcategory"
                    value={sub}
                    checked={selectedSubCategory === sub}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                    className="accent-[#8B6914] cursor-pointer"
                  />
                  {sub}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-[#8B6914]/30" />

          {/* Flavor */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-[#8B6914] uppercase tracking-widest">
              Flavor
            </h3>
            <div className="space-y-2">
              {["Chocolate", "Vanilla", "Strawberry", "Red Velvet"].map((flavor) => (
                <label key={flavor} className="flex items-center gap-3 text-sm text-[#fde68a] cursor-pointer">
                  <input
                    type="radio"
                    name="flavor"
                    value={flavor}
                    checked={selectedFlavor === flavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                    className="accent-[#8B6914] cursor-pointer"
                  />
                  {flavor}
                </label>
              ))}
            </div>
          </div>

          <hr className="border-[#8B6914]/30" />

          {/* Price Range */}
          <div>
            <h3 className="text-xs font-semibold mb-3 text-[#8B6914] uppercase tracking-widest">
              Max Price: <span className="text-[#fde68a]">₹{priceRange}</span>
            </h3>
            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#fde68a] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-[#8B6914] mt-1">
              <span>₹50</span>
              <span>₹1000</span>
            </div>
          </div>
        </div>

        {/* Reset */}
        <div className="px-6 py-5 border-t border-[#8B6914] shrink-0">
          <button
            onClick={resetFilters}
            className="w-full bg-[#1a0f03] border border-[#8B6914] text-[#8B6914] hover:text-[#fde68a] hover:border-[#fde68a] py-2.5 rounded-lg uppercase tracking-widest text-xs font-bold transition-all duration-300"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 py-6 px-6 md:py-10 md:px-10 w-full min-w-0">
        
        {/* MOBILE TOP BAR (Filter Button) */}
        <div className="md:hidden flex justify-end mb-4">
          <button 
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center gap-2 bg-[#2e1a06] text-[#fde68a] border border-[#8B6914] px-4 py-2 rounded-lg text-sm font-semibold tracking-wide shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            FILTERS
          </button>
        </div>

        <h1
          className="text-4xl md:text-5xl text-[brown] text-center mb-10 mt-2 md:mt-0"
          style={{ fontFamily: "Style Script" }}
        >
          Signature Desserts
        </h1>

        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 border border-[#8B6914] border-dashed rounded-xl bg-[#2e1a06]/50">
            <p className="text-[#8B6914] text-lg tracking-widest uppercase text-center px-4">
              No desserts match your filters
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 text-[brown] underline underline-offset-4 text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Desserts;