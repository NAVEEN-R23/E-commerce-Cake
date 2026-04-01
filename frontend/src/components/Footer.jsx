import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaTwitter, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer() {

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Cakes", path: "/cakes" },
    { name: "Desserts", path: "/Desserts" },
    { name: "Custom Orders", path: "/custom" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <footer className="bg-[#2e1a06] border-t border-[#8B6914] text-[#8B6914] mt-10">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2
            className="text-3xl text-[#fde68a]"
            style={{ fontFamily: "Style Script" }}
          >
            Angelic Cakes
          </h2>
          <p className="mt-3 text-sm leading-relaxed">
            Crafted with love and the finest ingredients. Bringing sweetness to
            your special moments with every bite.
          </p>
        </div>

        {/* Quick Links with NavLink */}
        <div>
          <h3 className="text-[#fde68a] text-sm tracking-widest mb-3 uppercase">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `transition ${
                      isActive
                        ? "text-[#fde68a]"
                        : "hover:text-[#fde68a]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-[#fde68a] text-sm tracking-widest mb-3 uppercase">
            Contact
          </h3>

          <div className="space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#fde68a]" /> +91 98765 43210
            </p>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-[#fde68a]" /> support@angeliccakes.com
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4">
            {[FaInstagram, FaFacebookF, FaTwitter].map((Icon, index) => (
              <div
                key={index}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-[#4a2e10] border border-[#8B6914] text-[#fde68a] hover:border-[#fde68a] hover:shadow-[0_0_10px_#fde68a50] transition cursor-pointer"
              >
                <Icon size={12} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-xs border-t border-[#8B6914] py-4">
        © {new Date().getFullYear()} Angelic Cakes. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;