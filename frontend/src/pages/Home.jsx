import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CustomImage from "./images/bg1.png"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel Data
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop",
      title: "Artisanal Bakes",
      subtitle: "Handcrafted with love, baked fresh daily.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000&auto=format&fit=crop",
      title: "Decadent Desserts",
      subtitle: "Indulge in our premium signature collections.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop",
      title: "Custom Celebrations",
      subtitle: "Make your special moments unforgettable.",
    },
  ];

  // Auto-slide effect for carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products/getdata");
        setProducts(res.data.data || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Filter Data (Fallback slices used if specific flags aren't in your DB yet)
  const bestSellers = products.slice(0, 4); 
  const featuredProducts = products.slice(4, 8);
  const egglessProducts = products.filter((p) => p.Eggless || p.dietary === "Eggless").slice(0, 4);

  return (
    <div className="bg-[beige] min-h-screen text-[#2e1a06] pb-16">
      
      {/* ── 1. CAROUSEL BANNER ── */}
      <section className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
              <h1
                className="text-5xl md:text-7xl text-[#fde68a] mb-4 drop-shadow-lg"
                style={{ fontFamily: "Style Script" }}
              >
                {slide.title}
              </h1>
              <p className="text-white text-lg md:text-xl tracking-wide max-w-xl">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-[#fde68a]" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ── 2. BRAND STORY / INTRO (NEWLY ADDED) ── */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-12 h-[1px] bg-[#8B6914]"></span>
          <span className="text-[#8B6914] text-xl">✧</span>
          <span className="w-12 h-[1px] bg-[#8B6914]"></span>
        </div>
        <h2 
          className="text-4xl md:text-5xl text-[#2e1a06] mb-6" 
          style={{ fontFamily: "Style Script" }}
        >
          A Symphony of Sweetness
        </h2>
        <p className="text-lg md:text-xl text-[#2e1a06]/80 leading-relaxed font-light">
          Every slice tells a story. From our signature rich cakes to delicate, hand-crafted pastries, 
          we use only the finest ingredients to bring your sweet dreams to life. Whether it is a grand 
          celebration or a quiet midnight craving, we are here to make every moment unforgettable.
        </p>
      </section>

      {/* ── 3. CATEGORY CARDS ── */}
      {/* Changed py-16 to pb-16 since the section above handles the top padding */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cakes */}
          <Link to="/cakes" className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#8B6914]/20">
            <img 
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop" 
              alt="Cakes" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/80 to-transparent flex items-end justify-center pb-8">
              <h2 className="text-3xl text-[#fde68a] font-bold tracking-widest uppercase">Cakes</h2>
            </div>
          </Link>

          {/* Desserts */}
          <Link to="/desserts" className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#8B6914]/20">
            <img 
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop" 
              alt="Desserts" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/80 to-transparent flex items-end justify-center pb-8">
              <h2 className="text-3xl text-[#fde68a] font-bold tracking-widest uppercase">Desserts</h2>
            </div>
          </Link>

          {/* Custom Orders */}
          <Link to="/custom" className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#8B6914]/20">
            <img 
              src={CustomImage}
              alt="Custom Orders" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/80 to-transparent flex items-end justify-center pb-8">
              <h2 className="text-3xl text-[#fde68a] font-bold tracking-widest uppercase text-center px-4">Custom Orders</h2>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 4. BEST SELLERS ── */}
      {bestSellers.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl text-[#8B6914]" style={{ fontFamily: "Style Script" }}>Best Sellers</h2>
            <p className="text-sm text-[#2e1a06] tracking-widest uppercase mt-2">Loved by everyone</p>
            <div className="w-24 h-0.5 bg-[#8B6914] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── 5. FEATURED PRODUCTS ── */}
      {featuredProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl text-[#8B6914]" style={{ fontFamily: "Style Script" }}>Featured Delights</h2>
            <p className="text-sm text-[#2e1a06] tracking-widest uppercase mt-2">Chef's special recommendations</p>
            <div className="w-24 h-0.5 bg-[#8B6914] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── 6. EGGLESS PRODUCTS ── */}
      {egglessProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl text-[#8B6914]" style={{ fontFamily: "Style Script" }}>100% Eggless</h2>
            <p className="text-sm text-[#2e1a06] tracking-widest uppercase mt-2">Pure joy, zero eggs</p>
            <div className="w-24 h-0.5 bg-[#8B6914] mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {egglessProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* ── 7. PREPAID DISCOUNT BANNER ── */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
        <div className="bg-gradient-to-r from-[#2e1a06] to-[#4a2e10] rounded-3xl overflow-hidden shadow-2xl border border-[#8B6914] flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
          <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
            <h3 className="text-3xl md:text-4xl text-[#fde68a] font-bold mb-3" style={{ fontFamily: "Style Script" }}>
              Pay Online & Save!
            </h3>
            <p className="text-white/90 text-sm md:text-base tracking-wider uppercase">
              Get an instant <span className="text-[#fde68a] font-bold text-xl">10% OFF</span> on all prepaid orders. Use code: <span className="border border-dashed border-[#fde68a] px-2 py-1 rounded text-[#fde68a] bg-black/20">PREPAID10</span>
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Link 
              to="/cakes" 
              className="bg-[#fde68a] text-[#2e1a06] hover:bg-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_15px_rgba(253,230,138,0.3)]"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;