import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("user"))
  ); // ✅ Optimized state initialization

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(Boolean(user));
  }, []);

  const handleLogout = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      if (!API_URL) {
        throw new Error("VITE_API_URL is not defined in .env");
      }

      const response = await axios.get(`${API_URL}/user/logout`, {
        withCredentials: true,
      });

      if (response.data.success) {
        toast.success("Logout Successfully");
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Logout failed. Please try again."
      );
    }
  };

  return (
    <header className="flex items-center justify-between w-full px-4 md:px-6 py-3 mb-2">
      {/* Logo Section */}
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="h-10 md:h-12 w-auto" />
        <p className="font-bold text-dark-sapphire text-xl md:text-2xl">
          CourseNest
        </p>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-2 md:gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-dark-sapphire text-white font-bold py-1.5 px-4 md:py-2 md:px-6 rounded-lg shadow-md text-sm md:text-base transition duration-300 hover:bg-blue-900"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-golden-yellow text-dark-sapphire font-bold py-1.5 px-4 md:py-2 md:px-6 rounded-lg shadow-md text-sm md:text-base transition duration-300 hover:bg-yellow-500"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-dark-sapphire text-white font-bold py-1.5 px-4 md:py-2 md:px-6 rounded-lg shadow-md text-sm md:text-base transition duration-300 hover:bg-blue-900"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
