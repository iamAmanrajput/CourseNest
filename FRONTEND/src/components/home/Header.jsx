import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Header = () => {
  return (
    <header className="h-24 flex justify-between items-center text-charcoal-gray">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img src={Logo} alt="logo" className="h-12 w-auto mr-2" />
        <p className="font-bold text-dark-sapphire text-2xl">CourseNest</p>
      </Link>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
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
      </div>
    </header>
  );
};

export default Header;
