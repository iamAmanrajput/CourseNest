import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function CoursesSection() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/courses`,
          { withCredentials: true }
        );
        setCourses(response.data.courses);
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
      }
    };

    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true, // 🔹 Loop enable taaki end pe rukega nahi
    speed: 500,
    autoplay: true, // 🔹 Autoplay enable
    autoplaySpeed: 2000, // 🔹 3 seconds per slide
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true, // 🔹 Arrows rakh rahe hain
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 768, // 🔹 Tablet aur mobile ke liye
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false, // 🔹 Mobile par arrows hata diye
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="mt-8 mb-8 ml-8">
      {courses.length > 0 ? ( // ✅ Syntax Fix
        <Slider {...settings}>
          {courses.map((course) => (
            <div key={course._id} className="px-2">
              <div className="relative flex-shrink-0 md:w-80 w-92 transition-transform duration-300 transform hover:scale-105">
                <div className="border-2 bg-powder-blue border-powder-blue rounded-lg overflow-hidden p-4">
                  <img
                    className="h-32 w-full object-contain"
                    src={course.image?.url}
                    alt={course.title}
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-bold text-dark-sapphire mb-2">
                      {course.title}
                    </h2>
                    <Link
                      to={`/buy/${course._id}`}
                      className="bg-golden-yellow text-dark-sapphire font-bold py-2 px-4 rounded-lg hover:bg-yellow-500 duration-300 shadow-md"
                    >
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-center text-3xl font-semibold text-gray-500 mt-10">
          No courses found
        </p>
      )}
    </div>
  );
}

export default CoursesSection;
