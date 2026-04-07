import React from 'react'
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
  
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  };
  return (
    <>
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f5f0]">

<div className="bg-white shadow-lg rounded-xl p-8 w-80 text-center">

  <h2 className="text-2xl font-semibold mb-4">
    Profile
  </h2>

  <p className="text-lg mb-2">
    Name: {user?.name}
  </p>

  <p className="text-gray-600 mb-6">
    Email: {user?.email}
  </p>

  <button
    onClick={handleLogout}
    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
  >
    Logout
  </button>

</div>

</div>
    </>
  )
}

export default Profile
