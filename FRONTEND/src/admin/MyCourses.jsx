import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const MyCourses = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) {
      toast.error("Please Login First to Access This Resource");
      navigate("/admin/login");
    } else {
      setAdmin(admin);
    }
  }, [admin, navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/courses`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setCourses(response.data.courses);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch courses");
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // handle delete function
  const handleDelete = async (courseId) => {
    try {
      setDeleteLoading(true);
      toast.success("processing...");

      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/course/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${admin}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Course deleted successfully");
        // Remove the deleted course from the UI
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
      } else {
        toast.error(response.data.message || "Failed to delete course");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the course"
      );
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="p-4 w-full min-h-screen bg-gradient-to-r from-powder-blue to-white text-dark-sapphire">
      <h1 className="text-center font-bold text-2xl md:text-3xl">
        Our Courses
      </h1>
      <div className="flex justify-center mt-4">
        <Link
          to="/admin/dashboard"
          className="px-5 py-2 text-white bg-blue-500 rounded-xl border border-blue-600 shadow-md 
          transition duration-300 hover:bg-blue-400 hover:border-blue-500 hover:shadow-lg active:scale-95"
        >
          Go To Dashboard
        </Link>
      </div>

      <div className="w-full mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 justify-items-center">
        {loading ? (
          <Spinner />
        ) : (
          courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden w-full sm:w-80 p-4 
              transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Course Image */}
              <img
                src={course.image.url}
                alt={course.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              {/* Course Info */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {course.title}
                </h2>
                <p className="text-gray-600 mt-2 text-sm line-clamp-2">
                  {course.description}
                </p>

                {/* Price */}
                <p className="text-lg font-semibold text-blue-600 mt-2">
                  ₹{course.price}
                </p>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() =>
                      navigate(`/admin/update-course/${course._id}`)
                    }
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md
                    hover:bg-blue-600 hover:shadow-lg transition active:scale-95"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md
                    hover:bg-red-600 hover:shadow-lg transition active:scale-95"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyCourses;
