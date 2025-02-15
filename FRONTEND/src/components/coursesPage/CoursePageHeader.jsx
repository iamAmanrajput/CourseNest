import React from "react";

const CoursePageHeader = () => {
  return (
    <div className="flex justify-between items-center p-4  shadow-sm bg-powder-blue">
      <h1 className="text-xl font-bold">Courses</h1>
      <div className="flex items-center space-x-2 border px-3 py-1 rounded-full">
        <input
          type="text"
          placeholder="Type here to search..."
          className="outline-none text-gray-600 placeholder-gray-400"
        />
        <button className="text-gray-500">🔍</button>
      </div>
      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
        👤
      </div>
    </div>
  );
};

export default CoursePageHeader;
