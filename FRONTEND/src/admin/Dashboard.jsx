import React from "react";
import AdminSidebar from "./AdminSidebar";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex">
      <AdminSidebar></AdminSidebar>
      <div className="flex justify-center items-center grow-[1] bg-gradient-to-br from-blue-50 to-blue-200">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-300 to-sky-500 bg-clip-text text-transparent drop-shadow-2xl animate-pulse">
          Welcome Admin
        </h1>
      </div>
    </div>
  );
};

export default Dashboard;
