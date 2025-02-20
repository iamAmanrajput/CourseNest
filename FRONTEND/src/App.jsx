import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import Buy from "./pages/Buy";
import Purchases from "./pages/Purchases";
import PagenotFound from "./pages/PagenotFound";
import AdminSignup from "./admin/AdminSignup";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import CourseCreate from "./admin/CourseCreate";
import UpdateCourse from "./admin/UpdateCourse";
import MyCourses from "./admin/MyCourses";
import Settings from "./pages/Settings";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* private Routes --login needed */}
        <Route path="/courses" element={<Courses />} />
        <Route path="/buy/:courseId" element={<Buy />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/settings" element={<Settings />} />

        {/* Admin routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-course" element={<CourseCreate />} />
        <Route
          path="/admin/update-course/:courseId"
          element={<UpdateCourse />}
        />
        <Route path="/admin/our-courses" element={<MyCourses />} />

        <Route path="*" element={<PagenotFound />} />
      </Routes>
    </div>
  );
}

export default App;
