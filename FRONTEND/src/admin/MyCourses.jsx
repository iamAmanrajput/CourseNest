import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState("");
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) {
      toast.error("Please Login First to Access This Resource");
      navigate("/admin/login");
      return;
    } else {
      setAdmin(admin);
    }
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/course/courses",
          { withCredentials: true }
        );
        setCourses(response.data.courses);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="p-4 w-screen min-h-screen bg-gradient-to-r from-powder-blue to-white text-dark-sapphire">
      <h1 className="text-center font-bold text-2xl">My Courses</h1>
      <Link
        to="/admin/dashboard"
        className="px-5 py-2 text-white bg-blue-500 rounded-xl border border-blue-600 shadow-md 
  transition duration-300 hover:bg-blue-400 hover:border-blue-500 hover:shadow-lg active:scale-95"
      >
        Go To Dashboard
      </Link>
      <div className="mt-3"></div>
    </div>
  );
};

export default MyCourses;
