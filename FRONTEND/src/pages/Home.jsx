import React from "react";
import Header from "../components/home/Header";
import Section from "../components/home/Section";
import Footer from "../components/home/Footer";
import CoursesSection from "../components/home/CoursesSection";

const Home = () => {
  return (
    <div className="bg-gradient-to-r from-powder-blue to-pure-white min-h-screen w-full md:px-16">
      <Header />
      <Section />
      <CoursesSection></CoursesSection>
      <Footer />
    </div>
  );
};

export default Home;
