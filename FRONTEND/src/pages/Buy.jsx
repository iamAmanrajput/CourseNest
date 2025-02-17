import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Buy = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);

  // Retrieve user token safely
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) {
      toast.error("Please Login First To Access This Resource");
      navigate("/");
    }
  }, [user, navigate]);

  // Function to dynamically load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePurchase = async () => {
    if (!user) {
      toast.error("Please login first!");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Load Razorpay script dynamically
      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        toast.error("Failed to load Razorpay. Check your internet connection.");
        return;
      }

      // Step 2: Create Order on Backend
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/course/buy/${courseId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${user}` },
        }
      );

      if (!data.success) {
        throw new Error(data.message || "Failed to create order");
      }

      console.log("Order Response:", data);
      const { order } = data; // Extract order details

      // Step 3: Open Razorpay Payment Window
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded. Try again.");
        return;
      }

      const options = {
        key: "rzp_test_LwiUk0uIMvjhQP", // Replace with actual Razorpay API Key
        amount: order.amount,
        currency: order.currency,
        name: "CourseNest",
        description: "Purchase Course",
        order_id: order.id,
        prefill: {
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9999999999",
        },
        handler: async (response) => {
          try {
            console.log("Payment Response:", response);

            // Step 4: Verify Payment on Backend
            const verifyRes = await axios.post(
              `http://localhost:4000/api/v1/course/verify/${courseId}`,
              response,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${user}` },
              }
            );

            console.log("Payment Verification Response:", verifyRes.data);

            if (verifyRes.data.success) {
              toast.success("Payment Successful! 🎉");
              navigate("/purchases");
            } else {
              toast.error("Payment Verification Failed");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.error("Payment verification failed!");
          }
        },
        theme: {
          color: "#2563eb",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response) => {
        console.error("Payment Failed:", response);
        toast.error("Payment Failed! Try Again.");
      });
    } catch (error) {
      console.error("Payment initiation error:", error);
      toast.error(error.message || "Error initiating payment!");
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
