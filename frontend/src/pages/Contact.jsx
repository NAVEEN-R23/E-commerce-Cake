// import { useState, useRef, useEffect } from "react";

// /* ── Intersection hook ── */
// function useInView(threshold = 0.15) {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const obs = new IntersectionObserver(
//       ([entry]) => { if (entry.isIntersecting) setVisible(true); },
//       { threshold }
//     );
//     if (ref.current) obs.observe(ref.current);
//     return () => obs.disconnect();
//   }, []);
//   return [ref, visible];
// }

// /* ── Contact info cards ── */
// const contactInfo = [
//   {
//     icon: "✉",
//     label: "Email Us",
//     value: "hello@angeliccakes.in",
//     sub: "We reply within 24 hours",
//     href: "mailto:hello@angeliccakes.in",
//   },
//   {
//     icon: "✆",
//     label: "Call Us",
//     value: "+91 98765 43210",
//     sub: "Mon – Sat, 9 AM to 7 PM",
//     href: "tel:+919876543210",
//   },
//   {
//     icon: "✦",
//     label: "Visit Us",
//     value: "12, Baker Street, Chennai",
//     sub: "Tamil Nadu – 600001",
//     href: "https://maps.google.com",
//   },
// ];

// /* ── Order type options ── */
// const orderTypes = [
//   "Birthday Cake",
//   "Wedding Cake",
//   "Custom Desserts",
//   "Bulk Order",
//   "General Inquiry",
// ];

// export default function Contact() {
//   const [heroRef, heroVisible] = useInView(0.1);
//   const [cardsRef, cardsVisible] = useInView(0.1);
//   const [formRef, formVisible] = useInView(0.1);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     orderType: "",
//     date: "",
//     message: "",
//   });

//   const [focused, setFocused] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};
//     if (!form.name.trim()) e.name = "Name is required";
//     if (!form.email.trim()) e.email = "Email is required";
//     else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
//     if (!form.message.trim()) e.message = "Message is required";
//     return e;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const errs = validate();
//     if (Object.keys(errs).length) { setErrors(errs); return; }
//     setLoading(true);
//     await new Promise((r) => setTimeout(r, 1600)); // simulate API
//     setLoading(false);
//     setSubmitted(true);
//   };

//   const resetForm = () => {
//     setForm({ name: "", email: "", phone: "", orderType: "", date: "", message: "" });
//     setSubmitted(false);
//     setErrors({});
//   };

//   /* Field helper */
//   const Field = ({ name, label, type = "text", children, required }) => {
//     const hasError = !!errors[name];
//     const isFocused = focused === name;
//     const hasValue = !!form[name];

//     return (
//       <div className="relative">
//         <label
//           htmlFor={name}
//           className="block text-xs tracking-[3px] uppercase mb-2 transition-colors duration-300"
//           style={{
//             color: hasError ? "#f87171" : isFocused || hasValue ? "#fde68a" : "#8B6914",
//             fontFamily: "'Cinzel', serif",
//           }}
//         >
//           {label}{required && <span className="text-[#fde68a] ml-1">*</span>}
//         </label>
//         {children || (
//           <input
//             id={name}
//             name={name}
//             type={type}
//             value={form[name]}
//             onChange={handleChange}
//             onFocus={() => setFocused(name)}
//             onBlur={() => setFocused(null)}
//             className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-[#fde68a] text-sm outline-none transition-all duration-300 placeholder-[#4a2e10]"
//             style={{
//               borderColor: hasError ? "#f87171" : isFocused ? "#fde68a" : "#8B6914",
//               boxShadow: isFocused ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
//               fontFamily: "'Cormorant Garamond', serif",
//               fontSize: "1rem",
//             }}
//             placeholder={`Enter your ${label.toLowerCase()}`}
//           />
//         )}
//         {hasError && (
//           <p className="mt-1.5 text-xs text-red-400 tracking-wide">{errors[name]}</p>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div
//       className="bg-[#1e0f03] text-[#fde68a] min-h-screen overflow-x-hidden"
//       style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
//     >
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Style+Script&family=Cinzel:wght@400;600&display=swap');

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(32px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.9); }
//           to   { opacity: 1; transform: scale(1); }
//         }
//         @keyframes slideLeft {
//           from { opacity: 0; transform: translateX(-40px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes slideRight {
//           from { opacity: 0; transform: translateX(40px); }
//           to   { opacity: 1; transform: translateX(0); }
//         }
//         @keyframes float {
//           0%,100% { transform: translateY(0); }
//           50%      { transform: translateY(-8px); }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to   { transform: rotate(360deg); }
//         }
//         @keyframes shimmer {
//           0%,100% { opacity:0.5; }
//           50%      { opacity:1; }
//         }
//         @keyframes success-pop {
//           0%   { opacity:0; transform:scale(0.7); }
//           70%  { transform:scale(1.05); }
//           100% { opacity:1; transform:scale(1); }
//         }

//         .animate-fadeUp     { animation: fadeUp 0.75s ease forwards; }
//         .animate-fadeIn     { animation: fadeIn 0.75s ease forwards; }
//         .animate-scaleIn    { animation: scaleIn 0.75s ease forwards; }
//         .animate-slideLeft  { animation: slideLeft 0.75s ease forwards; }
//         .animate-slideRight { animation: slideRight 0.75s ease forwards; }
//         .animate-float      { animation: float 4s ease-in-out infinite; }
//         .animate-spin-slow  { animation: spin-slow 20s linear infinite; }
//         .animate-shimmer    { animation: shimmer 2.5s ease infinite; }
//         .animate-success    { animation: success-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }

//         .gold-divider {
//           height: 1px;
//           background: linear-gradient(90deg, transparent, #8B6914 30%, #fde68a 50%, #8B6914 70%, transparent);
//         }
//         .ornament {
//           display: flex; align-items: center; gap: 12px; color: #8B6914; font-size: 12px; letter-spacing: 6px;
//         }
//         .ornament::before, .ornament::after {
//           content: ""; flex: 1; height: 1px;
//         }
//         .ornament::before { background: linear-gradient(90deg, transparent, #8B6914); }
//         .ornament::after  { background: linear-gradient(90deg, #8B6914, transparent); }

//         input[type="date"]::-webkit-calendar-picker-indicator {
//           filter: invert(70%) sepia(50%) saturate(500%) hue-rotate(5deg);
//           cursor: pointer;
//         }
//         select option { background: #2e1a06; color: #fde68a; }
//       `}</style>

//       {/* ── HERO ── */}
//       <section
//         ref={heroRef}
//         className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24"
//         style={{
//           background: "radial-gradient(ellipse 80% 70% at 50% 40%, #3b1f08 0%, #1e0f03 70%)",
//         }}
//       >
//         {/* decorative rings */}
//         {[440, 620, 800].map((size) => (
//           <div
//             key={size}
//             className="absolute inset-0 flex items-center justify-center pointer-events-none"
//           >
//             <div
//               className="rounded-full border border-[#8B6914]"
//               style={{
//                 width: size,
//                 height: size,
//                 opacity: 0.06 + (800 - size) / 8000,
//               }}
//             />
//           </div>
//         ))}

//         {/* spinning ornament */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <div
//             className="animate-spin-slow rounded-full border border-dashed border-[#8B6914]/10"
//             style={{ width: 520, height: 520 }}
//           />
//         </div>

//         <p
//           className={`text-xs tracking-[8px] uppercase text-[#8B6914] mb-4 opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
//           style={{ animationDelay: "0.05s" }}
//         >
//           Get in Touch
//         </p>

//         <h1
//           className={`text-6xl sm:text-8xl md:text-9xl leading-none mb-5 opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
//           style={{ fontFamily: "'Style Script', cursive", animationDelay: "0.2s" }}
//         >
//           Contact Us
//         </h1>

//         <div
//           className={`ornament w-48 mx-auto mb-5 opacity-0 ${heroVisible ? "animate-fadeIn" : ""}`}
//           style={{ animationDelay: "0.4s" }}
//         >
//           ✿
//         </div>

//         <p
//           className={`max-w-md text-[#c9a96e] text-lg italic font-light leading-relaxed opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
//           style={{ animationDelay: "0.5s" }}
//         >
//           We'd love to hear from you — let's bake something unforgettable together.
//         </p>
//       </section>

//       {/* ── CONTACT CARDS ── */}
//       <section ref={cardsRef} className="px-6 py-14 max-w-5xl mx-auto">
//         <div className="gold-divider mb-14" />

//         <div className="grid sm:grid-cols-3 gap-6">
//           {contactInfo.map((info, i) => (
//             <a
//               key={info.label}
//               href={info.href}
//               target={info.href.startsWith("http") ? "_blank" : undefined}
//               rel="noreferrer"
//               className={`group relative bg-gradient-to-b from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/30 rounded-2xl p-8 text-center hover:border-[#fde68a]/50 transition-all duration-500 opacity-0 hover:-translate-y-1 block ${cardsVisible ? "animate-fadeUp" : ""}`}
//               style={{
//                 animationDelay: `${i * 0.12}s`,
//                 boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
//                 textDecoration: "none",
//               }}
//             >
//               <div
//                 className="text-3xl text-[#8B6914] mb-4 group-hover:text-[#fde68a] transition-colors duration-300 animate-float"
//                 style={{ animationDelay: `${i * 0.4}s` }}
//               >
//                 {info.icon}
//               </div>
//               <p
//                 className="text-xs tracking-[4px] uppercase text-[#8B6914] mb-2"
//                 style={{ fontFamily: "'Cinzel', serif" }}
//               >
//                 {info.label}
//               </p>
//               <p className="text-[#fde68a] text-base font-medium mb-1">{info.value}</p>
//               <p className="text-[#8B6914] text-xs italic">{info.sub}</p>

//               {/* bottom glow line */}
//               <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#fde68a] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
//             </a>
//           ))}
//         </div>

//         <div className="gold-divider mt-14" />
//       </section>

//       {/* ── FORM ── */}
//       <section ref={formRef} className="px-6 pb-24 max-w-5xl mx-auto">

//         <div className="grid md:grid-cols-5 gap-12 items-start">

//           {/* Left: heading + notes */}
//           <div
//             className={`md:col-span-2 opacity-0 ${formVisible ? "animate-slideLeft" : ""}`}
//           >
//             <p className="text-xs tracking-[6px] uppercase text-[#8B6914] mb-3">Send a Message</p>
//             <h2
//               className="text-4xl sm:text-5xl mb-6 leading-tight"
//               style={{ fontFamily: "'Cinzel', serif" }}
//             >
//               Let's Talk<br />
//               <span style={{ fontFamily: "'Style Script', cursive", fontSize: "1.3em" }}>
//                 Cake
//               </span>
//             </h2>
//             <p className="text-[#c9a96e] font-light leading-relaxed text-base mb-8">
//               Have a special occasion in mind? A flavor you've been dreaming about?
//               Drop us a message and our team will get back to you within 24 hours.
//             </p>

//             {/* Quick notes */}
//             <div className="space-y-4">
//               {[
//                 { icon: "◈", text: "Custom orders need 5–7 days advance notice" },
//                 { icon: "◈", text: "Wedding cakes require a tasting consultation" },
//                 { icon: "◈", text: "Bulk orders of 10+ get a special discount" },
//               ].map((note) => (
//                 <div key={note.text} className="flex items-start gap-3">
//                   <span className="text-[#8B6914] mt-0.5 text-sm flex-shrink-0">{note.icon}</span>
//                   <p className="text-[#8B6914] text-sm italic leading-snug">{note.text}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Right: Form */}
//           <div
//             className={`md:col-span-3 opacity-0 ${formVisible ? "animate-slideRight" : ""}`}
//             style={{ animationDelay: "0.15s" }}
//           >
//             {submitted ? (
//               /* ── Success State ── */
//               <div
//                 className="animate-success bg-gradient-to-br from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/40 rounded-2xl p-12 text-center"
//                 style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
//               >
//                 <div
//                   className="text-6xl mb-5 animate-shimmer"
//                   style={{ fontFamily: "'Style Script', cursive" }}
//                 >
//                   ✿
//                 </div>
//                 <h3
//                   className="text-3xl text-[#fde68a] mb-3"
//                   style={{ fontFamily: "'Cinzel', serif" }}
//                 >
//                   Message Sent!
//                 </h3>
//                 <p className="text-[#c9a96e] italic mb-8 leading-relaxed">
//                   Thank you for reaching out. We'll get back to you within 24 hours with all the sweet details.
//                 </p>
//                 <button
//                   onClick={resetForm}
//                   className="px-8 py-3 rounded-xl border border-[#8B6914] text-[#fde68a] text-sm tracking-[3px] uppercase hover:border-[#fde68a] transition-colors duration-300"
//                   style={{ fontFamily: "'Cinzel', serif" }}
//                 >
//                   Send Another
//                 </button>
//               </div>
//             ) : (
//               /* ── Form ── */
//               <form
//                 onSubmit={handleSubmit}
//                 className="bg-gradient-to-br from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/30 rounded-2xl p-8 sm:p-10 space-y-6"
//                 style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
//                 noValidate
//               >
//                 {/* Name + Email */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <Field name="name" label="Your Name" required />
//                   <Field name="email" label="Email Address" type="email" required />
//                 </div>

//                 {/* Phone + Order Type */}
//                 <div className="grid sm:grid-cols-2 gap-5">
//                   <Field name="phone" label="Phone Number" type="tel" />

//                   {/* Order Type Select */}
//                   <Field name="orderType" label="Order Type">
//                     <select
//                       id="orderType"
//                       name="orderType"
//                       value={form.orderType}
//                       onChange={handleChange}
//                       onFocus={() => setFocused("orderType")}
//                       onBlur={() => setFocused(null)}
//                       className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
//                       style={{
//                         borderColor: focused === "orderType" ? "#fde68a" : "#8B6914",
//                         color: form.orderType ? "#fde68a" : "#4a2e10",
//                         boxShadow: focused === "orderType" ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
//                         fontFamily: "'Cormorant Garamond', serif",
//                         fontSize: "1rem",
//                       }}
//                     >
//                       <option value="" disabled>Select type...</option>
//                       {orderTypes.map((t) => (
//                         <option key={t} value={t}>{t}</option>
//                       ))}
//                     </select>
//                   </Field>
//                 </div>

//                 {/* Event Date */}
//                 <Field name="date" label="Event / Delivery Date" type="date">
//                   <input
//                     id="date"
//                     name="date"
//                     type="date"
//                     value={form.date}
//                     onChange={handleChange}
//                     onFocus={() => setFocused("date")}
//                     onBlur={() => setFocused(null)}
//                     min={new Date().toISOString().split("T")[0]}
//                     className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-[#fde68a] text-sm outline-none transition-all duration-300"
//                     style={{
//                       borderColor: focused === "date" ? "#fde68a" : "#8B6914",
//                       boxShadow: focused === "date" ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "1rem",
//                       colorScheme: "dark",
//                     }}
//                   />
//                 </Field>

//                 {/* Message */}
//                 <Field name="message" label="Your Message" required>
//                   <textarea
//                     id="message"
//                     name="message"
//                     value={form.message}
//                     onChange={handleChange}
//                     onFocus={() => setFocused("message")}
//                     onBlur={() => setFocused(null)}
//                     rows={5}
//                     placeholder="Tell us about your dream cake, occasion, flavors, or any special requests..."
//                     className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-[#fde68a] text-sm outline-none transition-all duration-300 resize-none placeholder-[#4a2e10]"
//                     style={{
//                       borderColor: errors.message ? "#f87171" : focused === "message" ? "#fde68a" : "#8B6914",
//                       boxShadow: focused === "message" ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
//                       fontFamily: "'Cormorant Garamond', serif",
//                       fontSize: "1rem",
//                     }}
//                   />
//                   {errors.message && (
//                     <p className="mt-1.5 text-xs text-red-400 tracking-wide">{errors.message}</p>
//                   )}
//                 </Field>

//                 {/* Submit */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full py-4 rounded-xl text-sm tracking-[4px] uppercase font-semibold transition-all duration-300 relative overflow-hidden"
//                   style={{
//                     fontFamily: "'Cinzel', serif",
//                     background: loading
//                       ? "rgba(139,105,20,0.3)"
//                       : "linear-gradient(135deg, #8B6914, #fde68a 50%, #8B6914)",
//                     color: loading ? "#8B6914" : "#1e0f03",
//                     backgroundSize: "200% 100%",
//                     boxShadow: loading ? "none" : "0 4px 20px rgba(253,230,138,0.2)",
//                   }}
//                 >
//                   {loading ? (
//                     <span className="flex items-center justify-center gap-3">
//                       <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#8B6914" strokeWidth="4" />
//                         <path className="opacity-75" fill="#fde68a" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                       </svg>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message ✦"
//                   )}
//                 </button>
//               </form>
//             )}
//           </div>
//         </div>
//       </section>

//       {/* ── CLOSING BAR ── */}
//       <div
//         className="text-center py-10 border-t border-[#8B6914]/20"
//         style={{ background: "linear-gradient(180deg, #1e0f03 0%, #2e1a06 100%)" }}
//       >
//         <p
//           className="text-3xl text-[#8B6914] animate-shimmer"
//           style={{ fontFamily: "'Style Script', cursive" }}
//         >
//           Baked with Love
//         </p>
//       </div>
//     </div>
//   );
// }




import { useState, useRef, useEffect } from "react";

/* ── Intersection hook ── */
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

/* ── Field component — MUST be outside Contact() to avoid remount on every render ── */
function Field({ name, label, type = "text", children, required, form, errors, focused, onChange, onFocus, onBlur }) {
  const hasError = !!errors[name];
  const isFocused = focused === name;
  const hasValue = !!form[name];

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-xs tracking-[3px] uppercase mb-2 transition-colors duration-300"
        style={{
          color: hasError ? "#f87171" : isFocused || hasValue ? "#fde68a" : "#8B6914",
          fontFamily: "'Cinzel', serif",
        }}
      >
        {label}{required && <span className="text-[#fde68a] ml-1">*</span>}
      </label>
      {children || (
        <input
          id={name}
          name={name}
          type={type}
          value={form[name]}
          onChange={onChange}
          onFocus={() => onFocus(name)}
          onBlur={onBlur}
          className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-[#fde68a] text-sm outline-none transition-all duration-300 placeholder-[#4a2e10]"
          style={{
            borderColor: hasError ? "#f87171" : isFocused ? "#fde68a" : "#8B6914",
            boxShadow: isFocused ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
          }}
          placeholder={`Enter your ${label.toLowerCase()}`}
        />
      )}
      {hasError && (
        <p className="mt-1.5 text-xs text-red-400 tracking-wide">{errors[name]}</p>
      )}
    </div>
  );
}

/* ── Contact info cards ── */
const contactInfo = [
  {
    icon: "✉",
    label: "Email Us",
    value: "hello@angeliccakes.in",
    sub: "We reply within 24 hours",
    href: "mailto:hello@angeliccakes.in",
  },
  {
    icon: "✆",
    label: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon – Sat, 9 AM to 7 PM",
    href: "tel:+919876543210",
  },
  {
    icon: "✦",
    label: "Visit Us",
    value: "12, Baker Street, Chennai",
    sub: "Tamil Nadu – 600001",
    href: "https://maps.google.com",
  },
];

/* ── Order type options ── */
const orderTypes = [
  "Birthday Cake",
  "Wedding Cake",
  "Custom Desserts",
  "Bulk Order",
  "General Inquiry",
];

/* ── EmailJS config — fill these in ── */
const EMAILJS_SERVICE_ID="service_pekdojy"   // from EmailJS dashboard
const EMAILJS_TEMPLATE_ID="template_0dnl3gt" // from EmailJS dashboard
const EMAILJS_PUBLIC_KEY="IbbeLf81F8z9eot4d"   // from EmailJS dashboard

export default function Contact() {
  const [heroRef, heroVisible] = useInView(0.1);
  const [cardsRef, cardsVisible] = useInView(0.1);
  const [formRef, formVisible] = useInView(0.1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    orderType: "",
    date: "",
    message: "",
  });

  const [focused, setFocused] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [sendError, setSendError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setSendError("");

    try {
      // Dynamically load EmailJS SDK
      if (!window.emailjs) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      window.emailjs.init(EMAILJS_PUBLIC_KEY);

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    form.name,
        from_email:   form.email,
        phone:        form.phone || "Not provided",
        order_type:   form.orderType || "Not specified",
        event_date:   form.date || "Not specified",
        message:      form.message,
        reply_to:     form.email,
      });

      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendError("Oops! Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", orderType: "", date: "", message: "" });
    setSubmitted(false);
    setErrors({});
    setSendError("");
  };

  return (
    <div
      className="bg-[#1e0f03] text-[#fde68a] min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Style+Script&family=Cinzel:wght@400;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
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
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%,100% { opacity:0.5; }
          50%      { opacity:1; }
        }
        @keyframes success-pop {
          0%   { opacity:0; transform:scale(0.7); }
          70%  { transform:scale(1.05); }
          100% { opacity:1; transform:scale(1); }
        }

        .animate-fadeUp     { animation: fadeUp 0.75s ease forwards; }
        .animate-fadeIn     { animation: fadeIn 0.75s ease forwards; }
        .animate-scaleIn    { animation: scaleIn 0.75s ease forwards; }
        .animate-slideLeft  { animation: slideLeft 0.75s ease forwards; }
        .animate-slideRight { animation: slideRight 0.75s ease forwards; }
        .animate-float      { animation: float 4s ease-in-out infinite; }
        .animate-spin-slow  { animation: spin-slow 20s linear infinite; }
        .animate-shimmer    { animation: shimmer 2.5s ease infinite; }
        .animate-success    { animation: success-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }

        .gold-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #8B6914 30%, #fde68a 50%, #8B6914 70%, transparent);
        }
        .ornament {
          display: flex; align-items: center; gap: 12px; color: #8B6914; font-size: 12px; letter-spacing: 6px;
        }
        .ornament::before, .ornament::after {
          content: ""; flex: 1; height: 1px;
        }
        .ornament::before { background: linear-gradient(90deg, transparent, #8B6914); }
        .ornament::after  { background: linear-gradient(90deg, #8B6914, transparent); }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(70%) sepia(50%) saturate(500%) hue-rotate(5deg);
          cursor: pointer;
        }
        select option { background: #2e1a06; color: #fde68a; }
      `}</style>

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-24"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, #3b1f08 0%, #1e0f03 70%)",
        }}
      >
        {[440, 620, 800].map((size) => (
          <div
            key={size}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="rounded-full border border-[#8B6914]"
              style={{
                width: size,
                height: size,
                opacity: 0.06 + (800 - size) / 8000,
              }}
            />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="animate-spin-slow rounded-full border border-dashed border-[#8B6914]/10"
            style={{ width: 520, height: 520 }}
          />
        </div>

        <p
          className={`text-xs tracking-[8px] uppercase text-[#8B6914] mb-4 opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
          style={{ animationDelay: "0.05s" }}
        >
          Get in Touch
        </p>

        <h1
          className={`text-6xl sm:text-8xl md:text-9xl leading-none mb-5 opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
          style={{ fontFamily: "'Style Script', cursive", animationDelay: "0.2s" }}
        >
          Contact Us
        </h1>

        <div
          className={`ornament w-48 mx-auto mb-5 opacity-0 ${heroVisible ? "animate-fadeIn" : ""}`}
          style={{ animationDelay: "0.4s" }}
        >
          ✿
        </div>

        <p
          className={`max-w-md text-[#c9a96e] text-lg italic font-light leading-relaxed opacity-0 ${heroVisible ? "animate-fadeUp" : ""}`}
          style={{ animationDelay: "0.5s" }}
        >
          We'd love to hear from you — let's bake something unforgettable together.
        </p>
      </section>

      {/* ── CONTACT CARDS ── */}
      <section ref={cardsRef} className="px-6 py-14 max-w-5xl mx-auto">
        <div className="gold-divider mb-14" />

        <div className="grid sm:grid-cols-3 gap-6">
          {contactInfo.map((info, i) => (
            <a
              key={info.label}
              href={info.href}
              target={info.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={`group relative bg-gradient-to-b from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/30 rounded-2xl p-8 text-center hover:border-[#fde68a]/50 transition-all duration-500 opacity-0 hover:-translate-y-1 block ${cardsVisible ? "animate-fadeUp" : ""}`}
              style={{
                animationDelay: `${i * 0.12}s`,
                boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
                textDecoration: "none",
              }}
            >
              <div
                className="text-3xl text-[#8B6914] mb-4 group-hover:text-[#fde68a] transition-colors duration-300 animate-float"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                {info.icon}
              </div>
              <p
                className="text-xs tracking-[4px] uppercase text-[#8B6914] mb-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {info.label}
              </p>
              <p className="text-[#fde68a] text-base font-medium mb-1">{info.value}</p>
              <p className="text-[#8B6914] text-xs italic">{info.sub}</p>

              <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[#fde68a] to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </a>
          ))}
        </div>

        <div className="gold-divider mt-14" />
      </section>

      {/* ── FORM ── */}
      <section ref={formRef} className="px-6 pb-24 max-w-5xl mx-auto">

        <div className="grid md:grid-cols-5 gap-12 items-start">

          {/* Left: heading + notes */}
          <div
            className={`md:col-span-2 opacity-0 ${formVisible ? "animate-slideLeft" : ""}`}
          >
            <p className="text-xs tracking-[6px] uppercase text-[#8B6914] mb-3">Send a Message</p>
            <h2
              className="text-4xl sm:text-5xl mb-6 leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Let's Talk<br />
              <span style={{ fontFamily: "'Style Script', cursive", fontSize: "1.3em" }}>
                Cake
              </span>
            </h2>
            <p className="text-[#c9a96e] font-light leading-relaxed text-base mb-8">
              Have a special occasion in mind? A flavor you've been dreaming about?
              Drop us a message and our team will get back to you within 24 hours.
            </p>

            <div className="space-y-4">
              {[
                { icon: "◈", text: "Custom orders need 5–7 days advance notice" },
                { icon: "◈", text: "Wedding cakes require a tasting consultation" },
                { icon: "◈", text: "Bulk orders of 10+ get a special discount" },
              ].map((note) => (
                <div key={note.text} className="flex items-start gap-3">
                  <span className="text-[#8B6914] mt-0.5 text-sm flex-shrink-0">{note.icon}</span>
                  <p className="text-[#8B6914] text-sm italic leading-snug">{note.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div
            className={`md:col-span-3 opacity-0 ${formVisible ? "animate-slideRight" : ""}`}
            style={{ animationDelay: "0.15s" }}
          >
            {submitted ? (
              <div
                className="animate-success bg-gradient-to-br from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/40 rounded-2xl p-12 text-center"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
              >
                <div
                  className="text-6xl mb-5 animate-shimmer"
                  style={{ fontFamily: "'Style Script', cursive" }}
                >
                  ✿
                </div>
                <h3
                  className="text-3xl text-[#fde68a] mb-3"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Message Sent!
                </h3>
                <p className="text-[#c9a96e] italic mb-8 leading-relaxed">
                  Thank you for reaching out. We'll get back to you within 24 hours with all the sweet details.
                </p>
                <button
                  onClick={resetForm}
                  className="px-8 py-3 rounded-xl border border-[#8B6914] text-[#fde68a] text-sm tracking-[3px] uppercase hover:border-[#fde68a] transition-colors duration-300"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-[#2e1a06] to-[#1e0f03] border border-[#8B6914]/30 rounded-2xl p-8 sm:p-10 space-y-6"
                style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}
                noValidate
              >
                {/* Name + Email */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    name="name" label="Your Name" required
                    form={form} errors={errors} focused={focused}
                    onChange={handleChange} onFocus={setFocused} onBlur={() => setFocused(null)}
                  />
                  <Field
                    name="email" label="Email Address" type="email" required
                    form={form} errors={errors} focused={focused}
                    onChange={handleChange} onFocus={setFocused} onBlur={() => setFocused(null)}
                  />
                </div>

                {/* Phone + Order Type */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field
                    name="phone" label="Phone Number" type="tel"
                    form={form} errors={errors} focused={focused}
                    onChange={handleChange} onFocus={setFocused} onBlur={() => setFocused(null)}
                  />

                  {/* Order Type Select */}
                  <Field
                    name="orderType" label="Order Type"
                    form={form} errors={errors} focused={focused}
                    onChange={handleChange} onFocus={setFocused} onBlur={() => setFocused(null)}
                  >
                    <select
                      id="orderType"
                      name="orderType"
                      value={form.orderType}
                      onChange={handleChange}
                      onFocus={() => setFocused("orderType")}
                      onBlur={() => setFocused(null)}
                      className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-sm outline-none transition-all duration-300 appearance-none cursor-pointer"
                      style={{
                        borderColor: focused === "orderType" ? "#fde68a" : "#8B6914",
                        color: form.orderType ? "#fde68a" : "#4a2e10",
                        boxShadow: focused === "orderType" ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                      }}
                    >
                      <option value="" disabled>Select type...</option>
                      {orderTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                {/* Event Date */}
                <Field
                  name="date" label="Event / Delivery Date"
                  form={form} errors={errors} focused={focused}
                  onChange={handleChange} onFocus={setFocused} onBlur={() => setFocused(null)}
                >
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    onFocus={() => setFocused("date")}
                    onBlur={() => setFocused(null)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-[#fde68a] text-sm outline-none transition-all duration-300"
                    style={{
                      borderColor: focused === "date" ? "#fde68a" : "#8B6914",
                      boxShadow: focused === "date" ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      colorScheme: "dark",
                    }}
                  />
                </Field>

                {/* Message */}
                <Field
                  name="message" label="Your Message" required
                  form={form} errors={errors} focused={focused}
                  onChange={handleChange} onFocus={setFocused} onBlur={() => setFocused(null)}
                >
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={5}
                    placeholder="Tell us about your dream cake, occasion, flavors, or any special requests..."
                    className="w-full bg-[#1e0f03] border rounded-xl px-4 py-3 text-[#fde68a] text-sm outline-none transition-all duration-300 resize-none placeholder-[#4a2e10]"
                    style={{
                      borderColor: errors.message ? "#f87171" : focused === "message" ? "#fde68a" : "#8B6914",
                      boxShadow: focused === "message" ? "0 0 0 3px rgba(253,230,138,0.08)" : "none",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                    }}
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-xs text-red-400 tracking-wide">{errors.message}</p>
                  )}
                </Field>

                {/* Send Error */}
                {sendError && (
                  <p className="text-sm text-red-400 text-center italic">{sendError}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl text-sm tracking-[4px] uppercase font-semibold transition-all duration-300 relative overflow-hidden"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background: loading
                      ? "rgba(139,105,20,0.3)"
                      : "linear-gradient(135deg, #8B6914, #fde68a 50%, #8B6914)",
                    color: loading ? "#8B6914" : "#1e0f03",
                    backgroundSize: "200% 100%",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(253,230,138,0.2)",
                  }}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#8B6914" strokeWidth="4" />
                        <path className="opacity-75" fill="#fde68a" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message ✦"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── CLOSING BAR ── */}
      <div
        className="text-center py-10 border-t border-[#8B6914]/20"
        style={{ background: "linear-gradient(180deg, #1e0f03 0%, #2e1a06 100%)" }}
      >
        <p
          className="text-3xl text-[#8B6914] animate-shimmer"
          style={{ fontFamily: "'Style Script', cursive" }}
        >
          Baked with Love
        </p>
      </div>
    </div>
  );
}