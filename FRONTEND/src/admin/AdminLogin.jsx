import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error state added

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error before new request
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("admin", JSON.stringify(response.data.token));
        navigate("/admin/dashboard");
        setFormData({});
      } else {
        setError(response.data.message); // Show error above button
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed!"); // Show error message
    }
  };

  const goToSignup = () => {
    navigate("/admin/signup");
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[50vw] min-h-[40vh] md:h-screen bg-blue-400 text-white flex flex-col items-center justify-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Login as Admin
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[50vw] min-h-[60vh] md:h-screen bg-gray-100 flex items-center justify-center px-6">
        <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">
            Log in To Your Account
          </h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Don't have an account?{" "}
            <span
              onClick={goToSignup}
              className="text-blue-400 font-semibold cursor-pointer"
            >
              Sign up
            </span>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                required
                onChange={handleChange}
                name="email"
                placeholder="You@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  name="password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center mb-3">
                {error}
              </p>
            )}

            <button className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 transition-all">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
