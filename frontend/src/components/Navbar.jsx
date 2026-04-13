import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link, NavLink } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import AClogo from "../assets/AC_logo.png";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation()

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location]);

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cakes", path: "/cakes" },
    { name: "Desserts", path: "/desserts" },
    { name: "Custom Orders", path: "/custom" },
    { name: "About US", path: "/about" },
    { name: "Contact US", path: "/contact" },
  ];

  return (
    <nav className="bg-[#3b2207] border-b border-[#8B6914]">

      {/* Top Bar */}
      <div className="relative flex items-center px-4 md:px-6 py-2">

        {/* Left */}
        <div className="flex items-center gap-3 md:gap-4">

          <img
            src={AClogo}
            className="h-10 md:h-14 w-auto brightness-110 contrast-110"
            alt="logo"
          />

          {/* Search */}
          <div className="hidden sm:flex items-center gap-2 bg-[#4a2e10] border border-[#8B6914] rounded-lg px-3 py-1.5 hover:border-[#fde68a] transition">

            <FaSearch className="text-[#8B6914] text-xs" />

            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-[#fde68a] placeholder-[#8B6914] text-xs md:text-sm w-24 md:w-36"
            />
          </div>
        </div>

        {/* Brand */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <h1
            className="text-2xl md:text-5xl text-[#fde68a]"
            style={{ fontFamily: "Style Script" }}
          >
            Angelic Cakes
          </h1>

          <p className="hidden md:block text-[10px] tracking-[4px] uppercase text-[#8B6914] mt-2 opacity-80">
            Baked with Love
          </p>
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">

          <div className="hidden sm:flex items-center gap-3">

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative cursor-pointer w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#4a2e10] border border-[#8B6914] flex items-center justify-center text-[#fde68a] hover:border-[#fde68a] transition"
            >
              <FaHeart size={12} />
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative cursor-pointer w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#4a2e10] border border-[#8B6914] flex items-center justify-center text-[#fde68a] hover:border-[#fde68a] transition"
            >
              <FaShoppingCart size={12} />
            </Link>

            {/* Login/Profile */}
            {user ? (
              <div
                onClick={() => navigate("/profile")}
                className="cursor-pointer w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#4a2e10] border border-[#8B6914] flex items-center justify-center text-[#fde68a] hover:border-[#fde68a] transition font-semibold"
              >
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:block bg-[#4a2e10] border border-[#8B6914] text-[#fde68a] px-4 py-1.5 text-sm rounded-lg hover:border-[#fde68a] transition"
              >
                Login
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden text-[#fde68a] text-lg"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex justify-center bg-[#2e1a06] border-t border-[#8B6914]">
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `text-[11px] tracking-[2.5px] uppercase px-5 py-2.5 border-b-2 ${
                isActive
                  ? "text-[#fde68a] border-[#fde68a]"
                  : "text-[#8B6914] border-transparent hover:text-[#fde68a]"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center bg-[#2e1a06] border-t border-[#8B6914] py-3 space-y-3">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="text-sm tracking-widest uppercase text-[#8B6914] hover:text-[#fde68a]"
            >
              {link.name}
            </NavLink>
          ))}

          {/* Mobile Wishlist + Cart */}
          <div className="flex gap-4 pt-2">

            <Link
              to="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-[#4a2e10] border border-[#8B6914] flex items-center justify-center text-[#fde68a]"
            >
              <FaHeart size={14} />
            </Link>

            <Link
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="w-9 h-9 rounded-full bg-[#4a2e10] border border-[#8B6914] flex items-center justify-center text-[#fde68a]"
            >
              <FaShoppingCart size={14} />
            </Link>

          </div>

          {/* Login/Profile */}
          {user ? (
            <div
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="cursor-pointer w-9 h-9 rounded-full bg-[#4a2e10] border border-[#8B6914] flex items-center justify-center text-[#fde68a] font-semibold"
            >
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="bg-[#4a2e10] border border-[#8B6914] text-[#fde68a] px-4 py-1.5 text-sm rounded-lg hover:border-[#fde68a] transition"
            >
              Login
            </Link>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;