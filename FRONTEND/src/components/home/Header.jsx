import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() =>
    Boolean(localStorage.getItem("user"))
  ); // ✅ Optimized

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(Boolean(user)); // ✅ More efficient
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
        setIsLoggedIn(false); // ✅ Ensure UI updates immediately
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
    <header className="h-24 flex justify-between items-center text-charcoal-gray px-6">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="logo" className="h-12 w-auto mr-2" />
        <p className="font-bold text-dark-sapphire text-2xl">CourseNest</p>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-dark-sapphire text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 hover:bg-blue-900"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-golden-yellow text-dark-sapphire font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 hover:bg-yellow-500"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-dark-sapphire text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 hover:bg-blue-900"
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
