import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { SiBookstack } from "react-icons/si";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import toast from "react-hot-toast";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/logout`,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Logout Successfully");
        setIsLoggedIn(false);
        localStorage.removeItem("user");
        navigate("/");
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
      {/* Hamburger Button (Visible only on small screens) */}
      <button
        className="md:hidden fixed top-2 left-4 z-[100] p-4 text-xl bg-powder-blue rounded-full shadow-lg"
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 p-6 w-[75vw] md:w-[15vw] md:relative md:translate-x-0 shadow-lg z-[100] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:transition-none`}
      >
        {/* Close Button (Only visible on small screens) */}
        <button
          className="absolute top-4 right-4 md:hidden text-xl"
          onClick={() => setIsSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="w-12 h-12 flex justify-center items-center rounded-full mb-12"
        >
          <img src={logo} alt="logo" className="w-8 h-8" />
        </Link>

        {/* Sidebar Links */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center gap-2">
            <FaHome /> <p>Home</p>
          </Link>
          <Link to="/courses" className="flex items-center gap-2">
            <SiBookstack /> <p>Courses</p>
          </Link>
          <Link to="/purchases" className="flex items-center gap-2">
            <FaCloudDownloadAlt /> <p>Purchases</p>
          </Link>
          <Link to="/settings" className="flex items-center gap-2">
            <IoMdSettings /> <p>Settings</p>
          </Link>
          {isLoggedIn ? (
            <div
              onClick={handleLogout}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IoLogOut /> <p>Logout</p>
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2">
              <IoLogIn /> <p>Login</p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
