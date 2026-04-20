// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";
// import CustomImage from "./images/bg1.png"

// const Home = () => {
//   const [products, setProducts] = useState([]);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Carousel Data
//   const slides = [
//     {
//       id: 1,
//       image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop",
//       title: "Artisanal Bakes",
//       subtitle: "Handcrafted with love, baked fresh daily.",
//     },
//     {
//       id: 2,
//       image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000&auto=format&fit=crop",
//       title: "Decadent Desserts",
//       subtitle: "Indulge in our premium signature collections.",
//     },
//     {
//       id: 3,
//       image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop",
//       title: "Custom Celebrations",
//       subtitle: "Make your special moments unforgettable.",
//     },
//   ];

//   // Auto-slide effect for carousel
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   // Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/products/getdata");
//         setProducts(res.data.data || []);
//       } catch (error) {
//         console.log("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Filter Data (Fallback slices used if specific flags aren't in your DB yet)
//   const bestSellers = products.slice(0, 4); 
//   const featuredProducts = products.slice(4, 8);
//   const egglessProducts = products.filter((p) => p.Eggless || p.dietary === "Eggless").slice(0, 4);

//   return (
//     <div className="bg-[beige] min-h-screen text-[#2e1a06] pb-16">

//       {/* ── 1. CAROUSEL BANNER ── */}
//       <section className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//               index === currentSlide ? "opacity-100" : "opacity-0"
//             }`}
//           >
//             <div className="absolute inset-0 bg-black/40 z-10" />
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
//               <h1
//                 className="text-5xl md:text-7xl text-[#fde68a] mb-4 drop-shadow-lg"
//                 style={{ fontFamily: "Style Script" }}
//               >
//                 {slide.title}
//               </h1>
//               <p className="text-white text-lg md:text-xl tracking-wide max-w-xl">
//                 {slide.subtitle}
//               </p>
//             </div>
//           </div>
//         ))}
//         <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
//           {slides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-colors ${
//                 index === currentSlide ? "bg-[#fde68a]" : "bg-white/50"
//               }`}
//             />
//           ))}
//         </div>
//       </section>

//       {/* ── 2. BRAND STORY / INTRO (NEWLY ADDED) ── */}
//       <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 text-center">
//         <div className="flex items-center justify-center gap-4 mb-4">
//           <span className="w-12 h-[1px] bg-[#8B6914]"></span>
//           <span className="text-[#8B6914] text-xl">✧</span>
//           <span className="w-12 h-[1px] bg-[#8B6914]"></span>
//         </div>
//         <h2 
//           className="text-4xl md:text-5xl text-[#2e1a06] mb-6" 
//           style={{ fontFamily: "Style Script" }}
//         >
//           A Symphony of Sweetness
//         </h2>
//         <p className="text-lg md:text-xl text-[#2e1a06]/80 leading-relaxed font-light">
//           Every slice tells a story. From our signature rich cakes to delicate, hand-crafted pastries, 
//           we use only the finest ingredients to bring your sweet dreams to life. Whether it is a grand 
//           celebration or a quiet midnight craving, we are here to make every moment unforgettable.
//         </p>
//       </section>

//       {/* ── 3. CATEGORY CARDS ── */}
//       {/* Changed py-16 to pb-16 since the section above handles the top padding */}
//       <section className="max-w-7xl mx-auto px-6 md:px-10 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Cakes */}
//           <Link to="/cakes" className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#8B6914]/20">
//             <img 
//               src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop" 
//               alt="Cakes" 
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/80 to-transparent flex items-end justify-center pb-8">
//               <h2 className="text-3xl text-[#fde68a] font-bold tracking-widest uppercase">Cakes</h2>
//             </div>
//           </Link>

//           {/* Desserts */}
//           <Link to="/desserts" className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#8B6914]/20">
//             <img 
//               src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop" 
//               alt="Desserts" 
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/80 to-transparent flex items-end justify-center pb-8">
//               <h2 className="text-3xl text-[#fde68a] font-bold tracking-widest uppercase">Desserts</h2>
//             </div>
//           </Link>

//           {/* Custom Orders */}
//           <Link to="/custom" className="group block relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-[#8B6914]/20">
//             <img 
//               src={CustomImage}
//               alt="Custom Orders" 
//               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#2e1a06]/80 to-transparent flex items-end justify-center pb-8">
//               <h2 className="text-3xl text-[#fde68a] font-bold tracking-widest uppercase text-center px-4">Custom Orders</h2>
//             </div>
//           </Link>
//         </div>
//       </section>

//       {/* ── 4. BEST SELLERS ── */}
//       {bestSellers.length > 0 && (
//         <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
//           <div className="text-center mb-10">
//             <h2 className="text-4xl text-[#8B6914]" style={{ fontFamily: "Style Script" }}>Best Sellers</h2>
//             <p className="text-sm text-[#2e1a06] tracking-widest uppercase mt-2">Loved by everyone</p>
//             <div className="w-24 h-0.5 bg-[#8B6914] mx-auto mt-4"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {bestSellers.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ── 5. FEATURED PRODUCTS ── */}
//       {featuredProducts.length > 0 && (
//         <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
//           <div className="text-center mb-10">
//             <h2 className="text-4xl text-[#8B6914]" style={{ fontFamily: "Style Script" }}>Featured Delights</h2>
//             <p className="text-sm text-[#2e1a06] tracking-widest uppercase mt-2">Chef's special recommendations</p>
//             <div className="w-24 h-0.5 bg-[#8B6914] mx-auto mt-4"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ── 6. EGGLESS PRODUCTS ── */}
//       {egglessProducts.length > 0 && (
//         <section className="max-w-7xl mx-auto px-6 md:px-10 py-10">
//           <div className="text-center mb-10">
//             <h2 className="text-4xl text-[#8B6914]" style={{ fontFamily: "Style Script" }}>100% Eggless</h2>
//             <p className="text-sm text-[#2e1a06] tracking-widest uppercase mt-2">Pure joy, zero eggs</p>
//             <div className="w-24 h-0.5 bg-[#8B6914] mx-auto mt-4"></div>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {egglessProducts.map((product) => (
//               <ProductCard key={product._id} product={product} />
//             ))}
//           </div>
//         </section>
//       )}

//       {/* ── 7. PREPAID DISCOUNT BANNER ── */}
//       <section className="max-w-5xl mx-auto px-6 md:px-10 py-16">
//         <div className="bg-gradient-to-r from-[#2e1a06] to-[#4a2e10] rounded-3xl overflow-hidden shadow-2xl border border-[#8B6914] flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
//           <div className="md:w-2/3 text-center md:text-left mb-6 md:mb-0">
//             <h3 className="text-3xl md:text-4xl text-[#fde68a] font-bold mb-3" style={{ fontFamily: "Style Script" }}>
//               Pay Online & Save!
//             </h3>
//             <p className="text-white/90 text-sm md:text-base tracking-wider uppercase">
//               Get an instant <span className="text-[#fde68a] font-bold text-xl">10% OFF</span> on all prepaid orders. Use code: <span className="border border-dashed border-[#fde68a] px-2 py-1 rounded text-[#fde68a] bg-black/20">PREPAID10</span>
//             </p>
//           </div>
//           <div className="md:w-1/3 flex justify-center md:justify-end">
//             <Link 
//               to="/cakes" 
//               className="bg-[#fde68a] text-[#2e1a06] hover:bg-white px-8 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition-colors shadow-[0_0_15px_rgba(253,230,138,0.3)]"
//             >
//               Order Now
//             </Link>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// };

// export default Home;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CustomImage from "./images/bg1.png";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch, useSelector, useStore } from "react-redux";
import { clearAiproducts } from "../redux/aiSlice";



/* ─── Floating particle dots for background ambiance ─── */
const Particles = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[...Array(18)].map((_, i) => (
      <span
        key={i}
        style={{
          position: "absolute",
          width: `${4 + (i % 5) * 3}px`,
          height: `${4 + (i % 5) * 3}px`,
          borderRadius: "50%",
          background: `rgba(253,230,138,${0.06 + (i % 4) * 0.04})`,
          top: `${(i * 17 + 5) % 95}%`,
          left: `${(i * 23 + 8) % 97}%`,
          animation: `floatDot ${7 + (i % 5)}s ease-in-out ${i * 0.4}s infinite alternate`,
        }}
      />
    ))}
  </div>
);

/* ─── Section heading component ─── */
const SectionHeading = ({ title, sub }) => (
  <div className="text-center mb-12">
    <div className="flex items-center justify-center gap-3 mb-3">
      <span className="block w-10 h-px bg-gradient-to-r from-transparent to-[#c8973a]" />
      <span className="text-[#c8973a] text-lg select-none">✦</span>
      <span className="block w-10 h-px bg-gradient-to-l from-transparent to-[#c8973a]" />
    </div>
    <h2
      className="text-5xl md:text-6xl leading-tight"
      style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", color: "#3b1f07" }}
    >
      {title}
    </h2>
    {sub && (
      <p className="mt-3 text-xs md:text-sm tracking-[0.25em] uppercase font-light" style={{ color: "#7a5c2e" }}>
        {sub}
      </p>
    )}
    <div className="mx-auto mt-5 w-20 h-px bg-gradient-to-r from-transparent via-[#c8973a] to-transparent" />
  </div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const timerRef = useRef(null);
  const dispatch = useDispatch();
  const aiProducts = useSelector((state) => state.ai.products);
  console.log("HOME AI PRODUCTS:", aiProducts);
  const safeProducts = aiProducts || [];
  console.log("SAFE PRODUCTS LENGTH:", safeProducts.length)




  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2000&auto=format&fit=crop",
      title: "Artisanal Bakes",
      subtitle: "Handcrafted with love, baked fresh every single day.",
      cta: "Explore Cakes",
      to: "/cakes",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2000&auto=format&fit=crop",
      title: "Decadent Desserts",
      subtitle: "Indulge in our premium signature collections.",
      cta: "See Desserts",
      to: "/desserts",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=2000&auto=format&fit=crop",
      title: "Custom Celebrations",
      subtitle: "Make your special moments truly unforgettable.",
      cta: "Order Custom",
      to: "/custom",
    },
  ];

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5500);
  };

  useEffect(() => {
    setHeroLoaded(true);
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get("/products/getdata");
        setProducts(res.data.data || []);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const bestSellers = products.slice(0, 4);
  const featuredProducts = products.slice(4, 8);
  const egglessProducts = products
    .filter((p) => p.Eggless || p.dietary === "Eggless")
    .slice(0, 4);

  const goToSlide = (i) => {
    setCurrentSlide(i);
    startTimer();
  };

  const categories = [
    {
      to: "/cakes",
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=800&auto=format&fit=crop",
      label: "Cakes",
      accent: "Layered. Luscious. Legendary.",
    },
    {
      to: "/desserts",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=800&auto=format&fit=crop",
      label: "Desserts",
      accent: "Sweet. Delicate. Divine.",
    },
    {
      to: "/custom",
      image: CustomImage,
      label: "Custom Orders",
      accent: "Your vision, our craft.",
    },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        @keyframes floatDot {
          from { transform: translateY(0px) scale(1); opacity: 0.5; }
          to   { transform: translateY(-28px) scale(1.2); opacity: 1; }
        }
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes pulse-ring {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253,230,138,0.25); }
          50%       { box-shadow: 0 0 0 12px rgba(253,230,138,0); }
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 12px rgba(200,151,58,0.2); }
          50%       { box-shadow: 0 0 30px rgba(200,151,58,0.45); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.92); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }

        .hero-text-enter {
          animation: heroIn 1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .slide-up { animation: slideUp 0.8s ease both; }

        .category-card:hover .cat-img { transform: scale(1.08); }
        .category-card:hover .cat-overlay { opacity: 1; }
        .category-card:hover .cat-label { letter-spacing: 0.22em; }
        .category-card .cat-img { transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .category-card .cat-label { transition: letter-spacing 0.4s ease; }

        .shimmer-btn {
          background-image: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255,255,255,0.18) 50%,
            transparent 100%
          );
          background-size: 400px 100%;
          animation: shimmer 2.5s infinite linear;
        }

        .glow-card { animation: borderGlow 3s ease-in-out infinite; }

        .discount-badge {
          animation: pulse-ring 2.2s ease-in-out infinite;
        }

        .stat-num {
          font-family: 'Playfair Display', serif;
          font-style: italic;
        }

        /* Scroll reveal utility */
        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div
        className="min-h-screen text-[#2e1a06] pb-16 relative overflow-x-hidden"
        style={{ background: "linear-gradient(160deg, #fdf6e3 0%, #f5e6c8 60%, #ede0c4 100%)" }}
      >
        <Particles />

        {/* aiproducts */}


        {safeProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 pt-6 relative z-20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl md:text-3xl font-bold">Voice search results</h2>
              <button
                onClick={() => dispatch(clearAiproducts())}
                className="px-4 py-2 bg-black text-white rounded-lg text-sm"
              >
                clear
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {safeProducts.map((p) => (<ProductCard key={p.id} product={{ ...p, name: p.title, image: p.thumbnail }} />

              ))}
            </div>
          </section>
        )}

        {/* ── 1. HERO CAROUSEL ── */}
        <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
              style={{ opacity: index === currentSlide ? 1 : 0, pointerEvents: index === currentSlide ? "auto" : "none" }}
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Layered dark vignette */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/70 z-10" />
              {/* Vertical gold line accent */}
              <div className="absolute left-8 md:left-16 top-1/4 bottom-1/4 w-[2px] bg-gradient-to-b from-transparent via-[#fde68a]/70 to-transparent z-20 hidden md:block" />

              {/* Text content */}
              {index === currentSlide && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
                  <p
                    className="text-[#fde68a]/80 text-xs md:text-sm tracking-[0.3em] uppercase mb-4 hero-text-enter"
                    style={{ animationDelay: "0.1s", fontFamily: "'Jost', sans-serif", fontWeight: 200 }}
                  >
                    The Baking House
                  </p>
                  <h1
                    className="text-5xl sm:text-7xl md:text-8xl text-white mb-5 leading-none drop-shadow-2xl hero-text-enter"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontStyle: "italic",
                      fontWeight: 400,
                      animationDelay: "0.25s",
                      textShadow: "0 4px 40px rgba(0,0,0,0.5)",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="text-white/80 text-base md:text-xl max-w-lg mb-8 font-light hero-text-enter"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", animationDelay: "0.4s" }}
                  >
                    {slide.subtitle}
                  </p>
                  <Link
                    to={slide.to}
                    className="relative overflow-hidden px-9 py-3.5 rounded-full border border-[#fde68a] text-[#fde68a] text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 hover:bg-[#fde68a] hover:text-[#2e1a06] hero-text-enter shimmer-btn"
                    style={{ animationDelay: "0.55s", fontFamily: "'Jost', sans-serif" }}
                  >
                    {slide.cta}
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* Dot indicators */}
          <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="transition-all duration-400"
                style={{
                  width: i === currentSlide ? "2.2rem" : "0.6rem",
                  height: "0.6rem",
                  borderRadius: "999px",
                  background: i === currentSlide ? "#fde68a" : "rgba(255,255,255,0.4)",
                  transition: "width 0.4s ease, background 0.3s",
                }}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div
            className="absolute bottom-8 right-8 z-30 text-white/50 text-xs hidden md:block"
            style={{ fontFamily: "'Jost', sans-serif", letterSpacing: "0.15em" }}
          >
            {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </div>
        </section>

        {/* ── 2. STATS BAR ── */}
        <section
          className="relative z-10 mx-4 md:mx-auto md:max-w-5xl -mt-8 md:-mt-12 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: "linear-gradient(135deg, #2e1a06 0%, #4a2e10 100%)", border: "1px solid rgba(200,151,58,0.3)" }}
        >
          <div className="grid grid-cols-3 divide-x divide-[#c8973a]/20 px-2 py-5 md:py-7">
            {[
              { num: "2000+", label: "Happy Customers" },
              { num: "50+", label: "Signature Recipes" },
              { num: "8+", label: "Years of Craft" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center px-3 md:px-8">
                <div
                  className="stat-num text-2xl md:text-4xl text-[#fde68a] font-normal mb-1"
                >
                  {num}
                </div>
                <div
                  className="text-[#c8973a]/80 text-[10px] md:text-xs tracking-widest uppercase"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. BRAND STORY ── */}
        <section className="max-w-3xl mx-auto px-6 md:px-10 py-20 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#c8973a]" />
            <span className="text-[#c8973a] text-2xl select-none">✦</span>
            <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#c8973a]" />
          </div>
          <h2
            className="text-4xl md:text-6xl mb-7 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", color: "#3b1f07" }}
          >
            A Symphony of Sweetness
          </h2>
          <p
            className="text-base md:text-xl text-[#4a2e10]/80 leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}
          >
            Every slice tells a story. From our signature rich cakes to delicate,
            hand-crafted pastries, we use only the finest ingredients to bring your
            sweet dreams to life. Whether it is a grand celebration or a quiet midnight
            craving — we are here to make every moment unforgettable.
          </p>
          <Link
            to="/about"
            className="inline-block mt-10 text-xs tracking-[0.25em] uppercase text-[#c8973a] border-b border-[#c8973a]/50 pb-0.5 hover:border-[#c8973a] transition-colors"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Our Story →
          </Link>
        </section>

        {/* ── 4. CATEGORY CARDS ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 pb-20">
          <SectionHeading title="Explore" sub="Discover what we craft" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-7">
            {categories.map(({ to, image, label, accent }) => (
              <Link
                key={label}
                to={to}
                className="category-card group block relative rounded-2xl md:rounded-3xl overflow-hidden shadow-xl"
                style={{ height: "22rem" }}
              >
                <img
                  src={image}
                  alt={label}
                  className="cat-img w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0d02]/90 via-[#2e1a06]/30 to-transparent" />
                {/* Gold border on hover */}
                <div
                  className="cat-overlay absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 transition-opacity duration-500"
                  style={{ boxShadow: "inset 0 0 0 2px rgba(253,230,138,0.6)" }}
                />
                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                  <p
                    className="text-[#fde68a]/70 text-[10px] tracking-[0.25em] uppercase mb-1"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {accent}
                  </p>
                  <h2
                    className="cat-label text-3xl md:text-4xl text-white font-normal tracking-widest uppercase"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {label}
                  </h2>
                  <span
                    className="inline-block mt-3 text-[10px] tracking-[0.2em] uppercase text-[#fde68a] opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Shop Now →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 5. BEST SELLERS ── */}
        {bestSellers.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
            <SectionHeading title="Best Sellers" sub="Loved by everyone" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {bestSellers.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ── 6. FEATURED QUOTE STRIP ── */}
        <section
          className="my-16 py-12 px-6 text-center relative overflow-hidden"
          style={{ background: "linear-gradient(90deg, #2e1a06 0%, #3d2208 50%, #2e1a06 100%)" }}
        >
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle, #fde68a 1px, transparent 1px)",
              backgroundSize: "28px 28px"
            }}
          />
          <p
            className="text-[#fde68a]/90 text-2xl md:text-4xl max-w-3xl mx-auto leading-relaxed relative z-10"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}
          >
            "Life is short. Eat the cake."
          </p>
          <p
            className="mt-4 text-[#c8973a]/70 text-xs tracking-[0.25em] uppercase relative z-10"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            — The Baking House
          </p>
        </section>

        {/* ── 7. FEATURED PRODUCTS ── */}
        {featuredProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
            <SectionHeading title="Featured Delights" sub="Chef's special recommendations" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ── 8. EGGLESS PRODUCTS ── */}
        {egglessProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 md:px-10 py-10">
            <SectionHeading title="100% Eggless" sub="Pure joy, zero eggs" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {egglessProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* ── 9. WHY US ── */}
        <section className="max-w-6xl mx-auto px-4 md:px-10 py-16">
          <SectionHeading title="Why Choose Us" sub="The promise we keep" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: "🌿", title: "Fresh Daily", desc: "Baked every morning with the finest ingredients" },
              { icon: "🥚", title: "Eggless Options", desc: "Wide range of eggless treats for everyone" },
              { icon: "🎨", title: "Custom Designs", desc: "Personalized cakes crafted to your vision" },
              { icon: "🚚", title: "Fast Delivery", desc: "Same-day delivery available across the city" },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="glow-card rounded-2xl p-6 md:p-8 text-center transition-transform duration-300 hover:-translate-y-2"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(253,230,138,0.08) 100%)",
                  border: "1px solid rgba(200,151,58,0.2)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3
                  className="text-[#2e1a06] font-semibold mb-2 text-sm md:text-base"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {title}
                </h3>
                <p
                  className="text-[#4a2e10]/70 text-xs md:text-sm leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. PREPAID DISCOUNT BANNER ── */}
        <section className="max-w-5xl mx-auto px-4 md:px-10 py-8">
          <div
            className="relative rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: "linear-gradient(135deg, #1a0d02 0%, #2e1a06 50%, #4a2e10 100%)" }}
          >
            {/* Radial glow */}
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(253,230,138,0.1) 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(200,151,58,0.08) 0%, transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">
              {/* Badge */}
              <div
                className="discount-badge w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #c8973a, #fde68a)", color: "#2e1a06" }}
              >
                <span className="text-2xl md:text-3xl font-bold leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>10%</span>
                <span className="text-[9px] md:text-[10px] tracking-widest uppercase font-semibold" style={{ fontFamily: "'Jost', sans-serif" }}>OFF</span>
              </div>

              {/* Text */}
              <div className="flex-1 text-center md:text-left">
                <h3
                  className="text-3xl md:text-4xl text-[#fde68a] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
                >
                  Pay Online &amp; Save!
                </h3>
                <p
                  className="text-white/70 text-sm leading-relaxed"
                  style={{ fontFamily: "'Jost', sans-serif", fontWeight: 300 }}
                >
                  Get an instant discount on all prepaid orders. Use code:
                </p>
                <div
                  className="inline-block mt-2 px-5 py-1.5 rounded-full text-[#fde68a] text-sm tracking-widest"
                  style={{ border: "1px dashed rgba(253,230,138,0.5)", background: "rgba(0,0,0,0.2)", fontFamily: "'Jost', sans-serif" }}
                >
                  PREPAID10
                </div>
              </div>

              {/* CTA */}
              <Link
                to="/cakes"
                className="flex-shrink-0 relative overflow-hidden px-9 py-4 rounded-full font-semibold uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #fde68a, #c8973a)",
                  color: "#2e1a06",
                  fontFamily: "'Jost', sans-serif",
                  boxShadow: "0 8px 32px rgba(253,230,138,0.25)",
                }}
              >
                <span className="relative z-10">Order Now</span>
                <span className="shimmer-btn absolute inset-0 rounded-full" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 11. INSTAGRAM / GALLERY TEASER ── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 pt-10 pb-4">
          <SectionHeading title="Made with Love" sub="Follow us @thebakinghouse" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
            {[
              "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1551404973-761c83cd8339?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1586985289906-406988974504?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1559620192-032c4bc4674e?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=400&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1612203985729-70726954388c?q=80&w=400&auto=format&fit=crop",
            ].map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={src}
                  alt="gallery"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#2e1a06]/0 group-hover:bg-[#2e1a06]/40 transition-colors duration-400 flex items-center justify-center">
                  <span className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">♡</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;