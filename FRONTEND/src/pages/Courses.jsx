import React from "react";
import Sidebar from "../components/coursesPage/Sidebar";
import CoursesLayout from "../components/coursesPage/CoursesLayout";

function Courses() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar className="w-[20vw] bg-amber-400 h-full" />
      <CoursesLayout className="w-[80vw] bg-amber-600 h-full" />
    </div>
  );
}

export default Courses;
