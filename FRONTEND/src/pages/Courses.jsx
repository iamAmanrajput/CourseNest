import React from "react";
import Sidebar from "../components/coursesPage/Sidebar";
import CoursesLayout from "../components/coursesPage/CoursesLayout";

function Courses() {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar></Sidebar>
      <CoursesLayout></CoursesLayout>
    </div>
  );
}

export default Courses;
