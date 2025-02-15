import React from "react";
import { Link } from "react-router-dom";

const Section = () => {
  return (
    <section className="w-full flex flex-col items-center">
      <h1 className="text-dark-sapphire font-bold text-3xl">CourseNest</h1>
      <p className="mt-3 text-xl text-charcoal-gray text-center">
        Gain real-world skills with courses built by professionals.
      </p>
      <div className="flex gap-4 mt-4">
        <Link
          to="/courses"
          className="text-white bg-dark-sapphire py-2 px-6 font-bold rounded-lg shadow-md transition duration-300 hover:bg-blue-900"
        >
          Explore Courses
        </Link>
        <Link className="text-white bg-dark-sapphire py-2 px-6 font-bold rounded-lg shadow-md transition duration-300 hover:bg-blue-900">
          Course Videos
        </Link>
      </div>
    </section>
  );
};

export default Section;
