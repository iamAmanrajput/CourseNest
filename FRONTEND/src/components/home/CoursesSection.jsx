import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Spinner from "../Spinner";

function CoursesSection() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/courses`,
          { withCredentials: true }
        );
        if (response.data.success) {
          setCourses(response.data.courses);
        }
      } catch (error) {
        console.error(
          "Error fetching courses:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          infinite: true,
          arrows: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
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
    <div className="mt-8 mb-8 px-4">
      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : courses.length > 0 ? (
        <Slider {...settings}>
          {courses.map((course) => (
            <div key={course._id} className="px-2">
              <div className="relative flex-shrink-0 w-full transition-transform duration-300 transform hover:scale-105">
                <div className="border-2 bg-white border-gray-300 rounded-lg overflow-hidden p-4 shadow-lg bg-gradient-to-r from-powder-blue to-blue-300">
                  <img
                    className="h-40 w-full object-cover rounded-md"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                    src={course.image?.url}
                    alt={course.title}
                  />
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-bold text-white mb-2">
                      {course.title}
                    </h2>
                    <Link
                      to={`/buy/${course._id}`}
                      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-dark-sapphire duration-300 shadow-md"
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
        <p className="text-center text-2xl font-semibold text-gray-500 mt-10">
          No courses found
        </p>
      )}
    </div>
  );
}

export default CoursesSection;
