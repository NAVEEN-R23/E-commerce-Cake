import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: "✦",
    title: "Crafted with Soul",
    desc: "Every cake is a labor of love — hand-decorated, slow-baked, and made from scratch using generations-old recipes.",
  },
  {
    icon: "✿",
    title: "Finest Ingredients",
    desc: "We source premium Belgian chocolate, organic flour, and real vanilla — because you deserve nothing less.",
  },
  {
    icon: "❋",
    title: "Custom Creations",
    desc: "From intimate birthdays to grand weddings, we sculpt your sweetest visions into edible masterpieces.",
  },
  {
    icon: "✸",
    title: "Baked Fresh Daily",
    desc: "No preservatives, no shortcuts. Every order is baked to order and delivered at peak perfection.",
  },
];

const team = [
  {
    name: "Angelica Russo",
    role: "Head Pastry Chef & Founder",
    years: "15 years of craft",
    initial: "A",
  },
  {
    name: "Meera Nair",
    role: "Cake Artist & Designer",
    years: "8 years of craft",
    initial: "M",
  },
  {
    name: "Clara Dubois",
    role: "Custom Orders Specialist",
    years: "10 years of craft",
    initial: "C",
  },
];

const stats = [
  { number: "12+", label: "Years of Sweetness" },
  { number: "8K+", label: "Cakes Delivered" },
  { number: "500+", label: "Custom Designs" },
  { number: "99%", label: "Happy Smiles" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ── Particle layer ── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animDuration: `${6 + Math.random() * 8}s`,
    animDelay: `${Math.random() * 6}s`,
    size: Math.random() > 0.5 ? "text-xs" : "text-[8px]",
    symbol: ["✦", "✿", "·", "❋", "✸"][i % 5],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`absolute ${p.size} text-[#8B6914] opacity-20 animate-float`}
          style={{
            left: p.left,
            bottom: "-20px",
            animationDuration: p.animDuration,
            animationDelay: p.animDelay,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

export default function About() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [storyRef, storyVisible] = useInView(0.15);
  const [statsRef, statsVisible] = useInView(0.15);
  const [valuesRef, valuesVisible] = useInView(0.1);
  const [teamRef, teamVisible] = useInView(0.1);
  const [closingRef, closingVisible] = useInView(0.1);

  return (
    <div className="bg-[#1e0f03] text-[#fde68a] min-h-screen overflow-x-hidden relative"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Style+Script&family=Cinzel:wght@400;600&display=swap');

        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.2; }
          90% { opacity: 0.15; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.88); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes pulse-border {
          0%, 100% { box-shadow: 0 0 0 0 rgba(253,230,138,0.15); }
          50%       { box-shadow: 0 0 0 8px rgba(253,230,138,0); }
        }

        .animate-float { animation: float linear infinite; }
        .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
        .animate-fadeIn { animation: fadeIn 0.8s ease forwards; }
        .animate-scaleIn { animation: scaleIn 0.8s ease forwards; }
        .animate-slideLeft { animation: slideLeft 0.8s ease forwards; }
        .animate-slideRight { animation: slideRight 0.8s ease forwards; }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #8B6914 30%, #fde68a 50%, #8B6914 70%, transparent);
        }
        .ornament {
          display: flex; align-items: center; gap: 12px;
          color: #8B6914; font-size: 12px; letter-spacing: 6px;
        }
        .ornament::before, .ornament::after {
          content: ""; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, #8B6914);
        }
        .ornament::after {
          background: linear-gradient(90deg, #8B6914, transparent);
        }
        .value-card:hover { transform: translateY(-4px); }
        .team-card:hover .team-avatar { animation: pulse-border 1s ease infinite; }
        .shimmer-text { animation: shimmer 3s ease infinite; }
      `}</style>

      <Particles />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[82vh] flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, #3b1f08 0%, #1e0f03 70%)",
        }}
      >
        {/* decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-[#8B6914]/10" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-[#8B6914]/5" />
        </div>

        <p
          className={`text-xs tracking-[8px] uppercase text-[#8B6914] mb-4 opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
          style={{ animationDelay: "0.1s" }}
        >
          Our Story
        </p>

        <h1
          className={`text-6xl sm:text-8xl md:text-9xl leading-none mb-6 opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
          style={{ fontFamily: "'Style Script', cursive", animationDelay: "0.25s" }}
        >
          About Us
        </h1>

        <div
          className={`ornament w-48 mx-auto mb-6 opacity-0 ${heroVisible ? "animate-fadeIn" : ""}`}
          style={{ animationDelay: "0.45s" }}
        >
          ✦
        </div>

        <p
          className={`max-w-xl text-[#c9a96e] text-lg sm:text-xl italic font-light leading-relaxed opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
          style={{ animationDelay: "0.55s" }}
        >
          Where flour becomes art, and every slice tells a story worth savoring.
        </p>

        {/* scroll cue */}
        <div
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-0 ${heroVisible ? "animate-fadeIn" : ""}`}
          style={{ animationDelay: "1.1s" }}
        >
          <span className="text-[#8B6914] text-[10px] tracking-[4px] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#8B6914] to-transparent" />
        </div>
      </section>

      {/* ── STORY ── */}
      <section ref={storyRef} className="relative px-6 py-20 max-w-6xl mx-auto">
        <div className="gold-divider mb-16" />

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text */}
          <div className={`opacity-0 ${storyVisible ? "animate-slideLeft" : ""}`}>
            <p className="text-xs tracking-[6px] uppercase text-[#8B6914] mb-4">Est. 2012</p>
            <h2
              className="text-4xl sm:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              A Bakery Born<br />
              <em style={{ fontFamily: "'Style Script', cursive", fontSize: "1.2em" }}>from Love</em>
            </h2>
            <p className="text-[#c9a96e] font-light leading-relaxed mb-5 text-base sm:text-lg">
              It started in a tiny Chennai kitchen — Angelica, her grandmother's recipe book,
              and a dream to make every celebration unforgettable. What began as weekend treats
              for family quickly became the most-anticipated desserts in the neighborhood.
            </p>
            <p className="text-[#c9a96e] font-light leading-relaxed text-base sm:text-lg">
              Today, Angelic Cakes is a full-service artisan bakery, but our soul hasn't changed.
              We still bake by hand, still taste every batch, and still believe that a truly great
              cake can make any moment feel magical.
            </p>
          </div>

          {/* Visual block */}
          <div className={`opacity-0 ${storyVisible ? "animate-slideRight" : ""}`} style={{ animationDelay: "0.15s" }}>
            <div className="relative">
              {/* main card */}
              <div
                className="relative bg-gradient-to-br from-[#3b2207] to-[#2e1a06] border border-[#8B6914]/40 rounded-2xl p-10 text-center"
                style={{ boxShadow: "0 20px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(253,230,138,0.1)" }}
              >
                <div
                  className="text-8xl mb-4 shimmer-text"
                  style={{ fontFamily: "'Style Script', cursive" }}
                >
                  ✿
                </div>
                <p
                  className="text-2xl sm:text-3xl text-[#fde68a] italic mb-3"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  "Every cake carries a piece of our heart."
                </p>
                <p className="text-[#8B6914] text-xs tracking-[3px] uppercase">— Angelica Russo, Founder</p>
              </div>
              {/* floating badge */}
              <div
                className="absolute -top-5 -right-5 w-20 h-20 rounded-full bg-[#3b2207] border-2 border-[#8B6914] flex flex-col items-center justify-center text-center"
                style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}
              >
                <span className="text-[#fde68a] text-xl font-bold" style={{ fontFamily: "'Cinzel'" }}>12</span>
                <span className="text-[#8B6914] text-[8px] tracking-widest uppercase leading-tight">Years</span>
              </div>
            </div>
          </div>
        </div>

        <div className="gold-divider mt-16" />
      </section>

      {/* ── STATS ── */}
      <section
        ref={statsRef}
        className="py-16 px-6"
        style={{
          background: "linear-gradient(180deg, #1e0f03 0%, #2e1a06 50%, #1e0f03 100%)",
          borderTop: "1px solid rgba(139,105,20,0.2)",
          borderBottom: "1px solid rgba(139,105,20,0.2)",
        }}
      >
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center opacity-0 ${statsVisible ? "animate-scaleIn" : ""}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <p
                className="text-5xl sm:text-6xl text-[#fde68a] mb-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {s.number}
              </p>
              <div className="w-8 mx-auto h-px bg-[#8B6914] mb-2" />
              <p className="text-[#8B6914] text-xs tracking-[3px] uppercase">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section ref={valuesRef} className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[6px] uppercase text-[#8B6914] mb-3">What Drives Us</p>
          <h2
            className="text-4xl sm:text-5xl"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            Our Values
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`value-card group relative bg-gradient-to-b from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/30 rounded-xl p-7 text-center transition-all duration-500 opacity-0 ${valuesVisible ? "animate-fadeUp" : ""}`}
              style={{
                animationDelay: `${i * 0.12}s`,
                boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
              }}
            >
              <div
                className="text-4xl text-[#fde68a] mb-4 transition-transform duration-500 group-hover:scale-110"
              >
                {v.icon}
              </div>
              <h3
                className="text-lg text-[#fde68a] mb-3"
                style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem", letterSpacing: "1px" }}
              >
                {v.title}
              </h3>
              <p className="text-[#c9a96e] text-sm font-light leading-relaxed">{v.desc}</p>

              {/* hover glow line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#fde68a] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl" />
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section
        ref={teamRef}
        className="px-6 py-20"
        style={{
          background: "radial-gradient(ellipse 90% 60% at 50% 50%, #2e1a06 0%, #1e0f03 100%)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[6px] uppercase text-[#8B6914] mb-3">The Artists</p>
            <h2
              className="text-4xl sm:text-5xl"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Meet Our Team
            </h2>
            <p className="text-[#8B6914] mt-3 italic font-light text-base">
              The hands and hearts behind every creation
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`team-card group text-center opacity-0 ${teamVisible ? "animate-fadeUp" : ""}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Avatar */}
                <div className="relative w-24 h-24 mx-auto mb-5">
                  <div
                    className="team-avatar w-full h-full rounded-full bg-gradient-to-br from-[#4a2e10] to-[#2e1a06] border-2 border-[#8B6914]/50 flex items-center justify-center transition-all duration-500 group-hover:border-[#fde68a]"
                    style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}
                  >
                    <span
                      className="text-3xl text-[#fde68a]"
                      style={{ fontFamily: "'Style Script', cursive" }}
                    >
                      {member.initial}
                    </span>
                  </div>
                  {/* ring */}
                  <div className="absolute inset-0 rounded-full border border-[#8B6914]/20 scale-110 group-hover:scale-125 transition-transform duration-500" />
                </div>

                <h3
                  className="text-xl text-[#fde68a] mb-1"
                  style={{ fontFamily: "'Cinzel', serif", fontSize: "1rem" }}
                >
                  {member.name}
                </h3>
                <p className="text-[#8B6914] text-xs tracking-[2px] uppercase mb-2">{member.role}</p>
                <p className="text-[#c9a96e] text-xs italic">{member.years}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section
        ref={closingRef}
        className="px-6 py-24 text-center"
        style={{
          background: "linear-gradient(180deg, #1e0f03 0%, #3b2207 50%, #1e0f03 100%)",
          borderTop: "1px solid rgba(139,105,20,0.2)",
        }}
      >
        <div
          className={`max-w-2xl mx-auto opacity-0 ${closingVisible ? "animate-scaleIn" : ""}`}
        >
          <div
            className="text-6xl mb-6 shimmer-text"
            style={{ fontFamily: "'Style Script', cursive" }}
          >
            ✦
          </div>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl mb-6"
            style={{ fontFamily: "'Style Script', cursive" }}
          >
            Let's Create Something<br />
            <span className="text-[#8B6914]">Beautiful Together</span>
          </h2>
          <p className="text-[#c9a96e] font-light text-lg mb-10 italic">
            Whether you have a vision or just a craving — we're here for it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/custom"
              className="inline-block px-10 py-3.5 rounded-xl text-sm tracking-[3px] uppercase bg-[#fde68a] text-[#1e0f03] font-semibold hover:bg-[#c9a96e] transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Custom Order
            </Link>
            <Link
              to="/contact"
              className="inline-block px-10 py-3.5 rounded-xl text-sm tracking-[3px] uppercase border border-[#8B6914] text-[#fde68a] hover:border-[#fde68a] transition-colors duration-300"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
