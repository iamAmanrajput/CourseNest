import React from "react";
import { Link } from "react-router-dom";

function PagenotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-powder-blue px-4 text-center">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
        alt="Page Not Found"
        className="w-50 md:w-70 lg:w-86 mb-6 animate-bounce"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 text-lg md:text-xl">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-400 text-white text-lg md:text-xl rounded-lg shadow-md 
        hover:bg-blue-600 transition duration-300 hover:scale-105"
      >
        Go Home
      </Link>
    </div>
  );
}

export default PagenotFound;
