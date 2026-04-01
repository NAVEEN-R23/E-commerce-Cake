import React from 'react';
import ProductCard from '../components/ProductCard';
// Make sure this path points exactly to where you saved your dummy data!
import { productsData } from '../pages/dummyProducts'; 

const Cakes = () => {
  // Filter the data to only include items in the "Cakes" category
  const cakeProducts = productsData.filter(
    (product) => product.category === "Cakes"
  );

  return (
    // Added a dark background and padding to match your luxurious theme
    <div className="bg-[white] min-h-screen py-10 px-4 md:px-10">
      
      <h1 
        className="text-4xl md:text-5xl text-[#fde68a] text-center mb-10" 
        style={{ fontFamily: "Style Script" }}
      >
        Signature Cakes
      </h1>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          
          {/* Map over the filtered array instead of the whole thing */}
          {cakeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
        </div>
      </div>
      
    </div>
  );
};

export default Cakes;