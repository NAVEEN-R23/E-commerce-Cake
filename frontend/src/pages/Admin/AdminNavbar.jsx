import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Add Product", path: "addproduct" },
    { name: "Admin Products", path: "/adminproducts" },
    { name: "Order Details", path: "/orders" },
    { name: "CustomOrders", path:"/customorder"}
  ];

  const handleLogout = () => {
    // ❌ Remove token (adjust based on your storage)
    localStorage.removeItem("token");

    // optional: clear everything
    // localStorage.clear();

    alert("Logged out successfully");

    // redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-[#3b2207] border-b border-[#8B6914] px-6 py-4 text-[#fde68a] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">Admin Panel</h1>

        {/* Links */}
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-white transition ${
                location.pathname === link.path
                  ? "border-b-2 border-[#fde68a] pb-1"
                  : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* 🔴 Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 px-4 py-1 rounded hover:bg-red-700 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;