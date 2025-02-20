import React from "react";
import { FaHourglassHalf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-powder-blue to-dark-sapphire text-white p-6">
      <FaHourglassHalf className="text-6xl mb-4 animate-pulse" />
      <h1 className="text-4xl font-bold mb-2 text-center">
        Feature Coming Soon!
      </h1>
      <p className="text-lg text-center max-w-md opacity-80">
        We're working hard to bring this feature to you. Stay tuned for updates!
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-6 bg-white text-dark-sapphire px-6 py-2 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ComingSoon;
