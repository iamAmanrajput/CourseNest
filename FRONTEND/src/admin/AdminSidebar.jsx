import React, { useState, useEffect } from "react";
import logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { IoIosCreate } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { IoLogIn, IoLogOut } from "react-icons/io5";

function AdminSidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    setIsLoggedIn(!!admin);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/logout`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Logout Successfully");
        setIsLoggedIn(false);
        localStorage.removeItem("admin");
        navigate("/admin/login");
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
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-3 text-white bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 transition-all"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars className="text-2xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 p-4 w-[75vw] sm:w-[60vw] md:w-[18vw] lg:w-[18vw] shadow-xl z-50 
        transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative`}
      >
        {/* Close Button for Mobile */}
        <button
          className="absolute top-4 right-4 md:hidden text-gray-600 hover:text-red-500 transition-all"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="flex justify-center items-center mb-6"
        >
          <img
            src={logo}
            alt="logo"
            className="w-14 h-14 rounded-full shadow-md"
          />
        </Link>

        {/* Admin Text */}
        <h1 className="text-xl font-bold text-gray-700 text-center mb-6">
          I'm Admin
        </h1>

        {/* Sidebar Links */}
        <nav className="space-y-4">
          <Link
            to="/admin/our-courses"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-100 transition-all"
          >
            <SiBookstack className="text-blue-500 text-xl" /> <p>Our Courses</p>
          </Link>
          <Link
            to="/admin/create-course"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-100 transition-all"
          >
            <IoIosCreate className="text-green-500 text-xl" />{" "}
            <p>Create Course</p>
          </Link>
          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-purple-100 transition-all"
          >
            <FaHome className="text-purple-500 text-xl" /> <p>Home</p>
          </Link>

          {/* Login/Logout Button */}
          {isLoggedIn ? (
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-red-100 transition-all"
            >
              <IoLogOut className="text-red-500 text-xl" /> <p>Logout</p>
            </div>
          ) : (
            <Link
              to="/admin/login"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-100 transition-all"
            >
              <IoLogIn className="text-yellow-500 text-xl" /> <p>Login</p>
            </Link>
          )}
        </nav>
      </div>
    </>
  );
}

export default AdminSidebar;
