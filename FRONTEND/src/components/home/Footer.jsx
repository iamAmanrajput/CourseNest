import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import Logo from "../../assets/Logo.png";

const Footer = () => {
  return (
    <footer className="flex justify-between h-60 items-center border-t-powder-blue border-t-2 rounded-2xl">
      <div>
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="logo" className="h-12 w-auto mr-2" />
          <p className="font-bold text-dark-sapphire text-2xl">CourseNest</p>
        </Link>
        <p className="font-light text-[0.8rem] mt-2">Copyright &copy; 2025</p>
        <p className="font-semibold mt-2">
          Made with <span className="text-red-600 text-xl">&hearts;</span> By{" "}
          <span className="font-bold text-dark-sapphire">Aman Singh</span>
        </p>
      </div>

      <div>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Refund & Cancellation</p>
      </div>

      {/* Social Links - Hidden on Mobile */}
      <div className="hidden md:block">
        <Link
          to="https://github.com/iamAmanrajput"
          className="flex items-center gap-1"
        >
          <FaGithub /> iamAmanrajput
        </Link>
        <p className="flex items-center gap-1">
          <MdOutlineEmail /> Aman.it360@gmail.com
        </p>
        <Link to="/" className="flex items-center gap-1">
          <CiLinkedin /> Aman Singh
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
