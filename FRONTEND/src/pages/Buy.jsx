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
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Create Order on Backend
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/course/buy/${courseId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${user}` },
        }
      );

      if (!data.success) {
        console.log("nhi mila response");
        toast.error(data.message);
        return;
      } else {
        console.log("mil gya response");
      }

      const { order } = data; // Extract order details

      // Step 2: Open Razorpay Payment Window
      const options = {
        key: "rzp_test_LwiUk0uIMvjhQP", // Replace with actual API key
        amount: order.amount,
        currency: order.currency,
        name: "CourseNest",
        description: "Purchase Course",
        order_id: order.id,
        handler: async (response) => {
          // Step 3: Verify Payment on Backend
          try {
            const verifyRes = await axios.post(
              `http://localhost:4000/api/v1/course/verify/${courseId}`,
              response,
              {
                headers: { Authorization: `Bearer ${user}` },
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful! 🎉");
              navigate("/purchases");
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (err) {
            toast.error("Payment verification error!");
          }
        },
        theme: {
          color: "#2563eb", // Blue color theme
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", () => {
        toast.error("Payment Failed! Try Again.");
      });
    } catch (error) {
      toast.error("Error initiating payment!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 text-center w-96">
        <h2 className="text-xl font-semibold mb-4">Purchase Course</h2>
        <p className="text-gray-600 mb-6">Get access to this course now!</p>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>
    </div>
  );
};

export default Buy;
