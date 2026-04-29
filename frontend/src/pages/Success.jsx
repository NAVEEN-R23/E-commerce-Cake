import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#2e1a06] text-[#fde68a]">
      <h1 className="text-3xl font-bold mb-4">🎉 Order Placed Successfully</h1>
      <p className="mb-4">Your order will be delivered soon.</p>

      <button
        onClick={() => navigate("/")}
        className="bg-[#fde68a] text-black px-4 py-2 rounded"
      >
        Go Home
      </button>
    </div>
  );
};

export default Success;