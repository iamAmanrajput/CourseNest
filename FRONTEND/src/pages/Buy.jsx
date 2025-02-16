import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Buy = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  // Retrieve user data safely
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      toast.error("Please Login First To Access This Resource");
      navigate("/");
    }
  }, [user, navigate]);

  const handlePurchase = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/v1/course/buy/${courseId}`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${user}`, // Ensure token is extracted properly
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/purchases");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error("You have already purchased this course");
      } else {
        toast.error("Course purchase failed!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-800 duration-300 disabled:bg-gray-400"
        onClick={handlePurchase}
        disabled={loading}
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
};

export default Buy;
