import React, { useEffect } from "react";
import axios from "axios";

function CoursesSection() {
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/course/courses",
          { withCredentials: true } // 🔹 Backend agar authentication use kar raha ho
        );
        console.log("Fetched Courses:", response); // ✅ Logging properly
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
      }
    };

    fetchCourses();
  }, []);

  return <div>CoursesSection</div>;
}

export default CoursesSection;
