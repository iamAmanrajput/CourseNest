import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

function PurchaseLayout() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const token = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    if (!token) {
      toast.error("Please Login First To Access Purchases Section");
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchPurchases = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/purchases`,
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        if (response.data.success) {
          setPurchases(response.data.purchases);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(
          "Error fetching purchases:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, [token]);

  return (
    <div className="w-screen md:w-[85vw] bg-gray-100 min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        My Courses
      </h1>

      {loading ? (
        <Spinner />
      ) : purchases.length === 0 ? (
        <div className="text-center text-gray-700 mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
            alt="No Purchases"
            className="w-40 mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold">
            You have not purchased any courses yet!
          </h2>
          <p className="text-gray-500 mt-2">
            Explore our courses and start learning today.
          </p>
          <Link
            to="/courses"
            className="mt-4 inline-block px-6 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Explore Now
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {purchases.map((purchase) => (
            <div
              key={purchase.courseId?._id}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center transition duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={
                  purchase.courseId?.image?.url ||
                  "https://via.placeholder.com/150"
                }
                alt={purchase.courseId?.title || "Course Image"}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl font-semibold mt-3 text-gray-800">
                {purchase.courseId?.title || "Unknown Course"}
              </h2>
              <p className="text-gray-600 mt-2  h-[60px] overflow-hidden text-ellipsis">
                {purchase.courseId?.description?.length > 45
                  ? `${purchase.courseId.description.substring(0, 45)}....`
                  : purchase.courseId?.description ||
                    "No description available"}
              </p>
              <p className="text-lg font-bold text-green-600 mt-2">
                {purchase.courseId?.price
                  ? `₹${purchase.courseId.price}`
                  : "Free"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PurchaseLayout;
