import React from "react";
import { Link } from "react-router-dom";

const Card = (props) => {
  return (
    <div className="w-full md:w-80 h-auto bg-white p-6 shadow-xl rounded-xl flex flex-col items-center border border-gray-200 hover:shadow-2xl transition-shadow">
      <div className="w-full h-48 overflow-hidden rounded-3xl border-4 bg-powder-blue">
        <img
          src={props.courseData.image.url}
          alt={props.courseData.title}
          className="w-full h-full "
        />
      </div>
      <h1 className="text-lg md:text-xl font-bold mt-3 text-gray-800 text-center">
        {props.courseData.title}
      </h1>
      <p className="text-gray-500 text-sm md:text-base text-center mt-3">
        {props.courseData.description}
      </p>
      <div className="flex justify-between w-full px-6 mt-4 text-sm md:text-lg font-medium">
        <p className="text-gray-700">₹{props.courseData.price}</p>
        <p className="text-green-600">20% Off</p>
      </div>
      <Link
        to={`/buy/${props.courseData._id}`}
        className="mt-4 px-6 py-2 bg-blue-400 text-white text-sm md:text-lg font-semibold rounded-full hover:bg-blue-500 transition"
      >
        Buy Now
      </Link>
    </div>
  );
};

export default Card;
