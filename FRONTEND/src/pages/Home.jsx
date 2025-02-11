import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gradient-to-r from-powder-blue to-pure-white h-screen w-full px-16">
      <header className="h-24 flex justify-between items-center text-charcoal-gray">
        {/* Logo Section */}
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-12 w-auto mr-2" />
          <p className="font-bold text-dark-sapphire text-2xl">CourseNest</p>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {/* Login Button */}
          <Link
            to="/login"
            className="bg-golden-yellow text-dark-sapphire font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 hover:bg-yellow-500"
          >
            Login
          </Link>

          {/* Signup Button */}
          <Link
            to="/signup"
            className="bg-dark-sapphire text-white font-bold py-2 px-6 rounded-lg shadow-md transition duration-300 hover:bg-blue-900"
          >
            Signup
          </Link>
        </div>
      </header>

      <section className=" w-full flex flex-col items-center">
        <h1 className="text-dark-sapphire font-bold text-3xl">CourseNest</h1>
        <p className="mt-3 text-xl text-charcoal-gray">
          Gain real-world skills with courses built by professionals .
        </p>
        <div className=" flex gap-4 mt-4">
          <Link className="text-white bg-dark-sapphire py-2 px-6 font-bold rounded-lg shadow-md transition duration-300 hover:bg-blue-900">
            Explore Courses
          </Link>
          <Link className="text-white bg-dark-sapphire py-2 px-6 font-bold rounded-lg shadow-md transition duration-300 hover:bg-blue-900">
            Course Videos
          </Link>
        </div>
      </section>
      <section>section 2</section>
      <footer>footer</footer>
    </div>
  );
}

export default Home;
