import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Desserts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/products/getdata");

      // ✅ Filter Cakes category from backend data
      const dessertProducts = res.data.data.filter(
        (product) => product.category === "Desserts"
      );

      setProducts(dessertProducts);
    } catch (error) {
      console.log("Error fetching cakes:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen py-10 px-4 md:px-10">
      
      <h1
        className="text-4xl md:text-5xl text-[#8B6914] text-center mb-10"
        style={{ fontFamily: "Style Script" }}
      >
        Signature Desserts
      </h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-[#8B6914] text-center col-span-3">
              No Desserts available
            </p>
          )}

        </div>
      </div>

    </div>
  );
};

export default Desserts;