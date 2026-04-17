import React, { useState } from "react";
import Address from "./Address";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("home");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-800">

      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-300 flex flex-col justify-between p-4">

        {/* Top */}
        <div>
          <div className="mb-6 border-b border-gray-300 pb-4">
            <h2 className="text-xl font-bold text-black">
              {user?.name || "User"}
            </h2>
            <p className="text-sm text-gray-500">
              {user?.email || "email@example.com"}
            </p>
          </div>

          {/* Menu */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveTab("orders")}
              className={`text-left p-2 rounded ${
                activeTab === "orders" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
              }`}
            >
              📦 My Orders
            </button>

            <button
              onClick={() => setActiveTab("address")}
              className={`text-left p-2 rounded ${
                activeTab === "address" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
              }`}
            >
              🏠 Address Details
            </button>

            <button
              onClick={() => setActiveTab("account")}
              className={`text-left p-2 rounded ${
                activeTab === "account" ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
              }`}
            >
              ⚙️ Account Settings
            </button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-6">

        {activeTab === "home" && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-black">
              Welcome, {user?.name || "User"} 👋
            </h1>
            <p className="text-gray-500">
              Select an option from the sidebar to view details.
            </p>
          </>
        )}

        {activeTab === "orders" && (
          <h2 className="text-xl font-bold">📦 Orders (Coming Soon)</h2>
        )}

        {activeTab === "address" && <Address />}

        {activeTab === "account" && (
          <h2 className="text-xl font-bold">⚙️ Account Settings (Coming Soon)</h2>
        )}

      </div>
    </div>
  );
};

export default Profile;