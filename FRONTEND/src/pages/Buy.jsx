import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Buy = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const [courseDetail, setCourseDetail] = useState("");

  // Retrieve user token safely
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!user) {
        toast.error("Please Login First To Access This Resource");
        navigate("/");
      } else {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/course/${courseId}`,
            { withCredentials: true }
          );

          if (response.data.success) {
            setCourseDetail(response.data.course);
          } else {
            toast.error(
              response.data.message || "Failed to load course details."
            );
          }
        } catch (error) {
          console.error("Error fetching course details:", error);
          toast.error("Failed to load course details. Please try again.");
        }
      }
    };

    fetchCourseDetails();
  }, [user, navigate, courseId]);

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
        toast.error("Failed to load Razorpay. Please try again later.");
        return;
      }

      // Step 2: Create Order on Backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/course/buy/${courseId}`,
        {},
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${user}` },
        }
      );

      if (!data.success) {
        toast.error(data.message || "Error creating order. Please try again.");
        return;
      }

      const { order } = data; // Extract order details

      // Step 3: Open Razorpay Payment Window
      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded. Please try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_API_KEY, // Replace with actual Razorpay API Key
        amount: order.amount,
        currency: order.currency,
        name: courseDetail.title,
        description: courseDetail.description,
        order_id: order.id,
        prefill: {
          email: user?.email || "guest@example.com",
          contact: user?.phone || "9999999999",
        },
        handler: async (response) => {
          try {
            // Step 4: Verify Payment on Backend
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/course/verify/${courseId}`,
              response,
              {
                withCredentials: true,
                headers: { Authorization: `Bearer ${user}` },
              }
            );

            if (verifyRes.data.success) {
              toast.success("Payment Successful! 🎉");
              navigate("/purchases");
            } else {
              toast.error("Payment Verification Failed. Please try again.");
            }
          } catch (err) {
            console.error("Payment verification error:", err);
            toast.error("Payment verification failed. Please try again.");
          }
        },
        theme: {
          color: "#BBDEFB",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

      rzp.on("payment.failed", (response) => {
        console.error("Payment Failed:", response);
        toast.error("Payment Failed! Try Again.");
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("You Have Already Purchased this Course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-powder-blue to-pure-white p-6">
      <div className="bg-white bg-opacity-90 backdrop-blur-md shadow-2xl rounded-2xl p-8 max-w-md text-center border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Unlock Your Course! 🚀
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Get instant access and start learning today.
        </p>

        <div className="relative w-full flex flex-col items-center">
          <img
            src={courseDetail?.image?.url || "https://via.placeholder.com/300"}
            alt="Course Preview"
            className="w-full h-48 object-cover rounded-lg shadow-md"
          />
          <h3 className="mt-4 text-lg font-semibold text-gray-800">
            {courseDetail?.title || "Course Title"}
          </h3>
        </div>

        <button
          className="mt-6 w-full bg-blue-400 text-white py-3 px-6 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400"
          onClick={handlePurchase}
          disabled={loading}
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Secure Payment via <span className="font-semibold">Razorpay</span>.
        </p>
      </div>
    </div>
  );
};

export default Buy;
