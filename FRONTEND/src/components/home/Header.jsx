import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Logout Successfully");
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        window.location.reload();
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
    <header className="h-24 flex justify-between items-center text-charcoal-gray">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="logo" className="h-12 w-auto mr-2" />
        <p className="font-bold text-dark-sapphire text-2xl">CourseNest</p>
      </Link>

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
