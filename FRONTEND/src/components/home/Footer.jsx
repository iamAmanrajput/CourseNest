import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-8 border-t-2 border-powder-blue rounded-2xl text-gray-700">
      {/* Logo & Branding */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left ">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-12 w-auto mr-2" />
          <p className="font-bold text-dark-sapphire text-2xl">CourseNest</p>
        </Link>
        <p className="text-sm mt-2">
          &copy; 2025 CourseNest. All Rights Reserved.
        </p>
        <p className="font-semibold mt-2">
          Made with <span className="text-red-600 text-xl">&hearts;</span> by{" "}
          <span className="font-bold text-dark-sapphire">Aman Singh</span>
        </p>
      </div>
      <div className="border-b-2 border-powder-blue h-1 w-full md:hidden"></div>

      {/* Legal Links */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2 ">
        <Link to="#" className="hover:underline">
          Terms & Conditions
        </Link>
        <Link to="#" className="hover:underline">
          Privacy Policy
        </Link>
        <Link to="#" className="hover:underline">
          Refund & Cancellation
        </Link>
      </div>
      <div className="border-b-2 border-powder-blue h-1 w-full md:hidden"></div>

      {/* Social Links */}
      <div className="flex flex-col items-center md:items-start gap-2">
        <Link
          to="https://github.com/iamAmanrajput"
          className="flex items-center gap-2 hover:text-blue-500 transition"
        >
          <FaGithub className="text-xl" /> iamAmanrajput
        </Link>
        <p className="flex items-center gap-2">
          <MdOutlineEmail className="text-xl" /> Aman.it360@gmail.com
        </p>
        <Link
          to="#"
          className="flex items-center gap-2 hover:text-blue-500 transition"
        >
          <CiLinkedin className="text-xl" /> Aman Singh
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
