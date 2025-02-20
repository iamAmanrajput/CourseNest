import React, { useState, useEffect } from "react";
import CoursePageHeader from "./CoursePageHeader";
import Card from "./Card";
import axios from "axios";
import Spinner from "../Spinner";

const CoursesLayout = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/courses`,
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
    <div className="w-screen md:w-[85vw] bg-powder-blue h-screen flex flex-col">
      <CoursePageHeader />
      <div className="w-full flex-1  p-4 bg-powder-blue overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-700">
            <p className="text-2xl font-semibold">No Courses Found</p>
            <p className="text-gray-500 mt-2">
              Try again later or check back soon!
            </p>
          </div>
        ) : (
          courses.map((course) => <Card key={course._id} courseData={course} />)
        )}
      </div>
    </div>
  );
};

export default CoursesLayout;
