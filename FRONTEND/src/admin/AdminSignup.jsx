import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

function AdminSignup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/signup`,
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
        navigate("/admin/login");
        setFormData({ firstName: "", lastName: "", email: "", password: "" }); // Reset form data
      } else {
        setError(response.data.message); // Show error message
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const goToLogin = () => {
    navigate("/admin/login");
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[50vw] h-[40vh] md:h-screen bg-blue-400 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Join as Admin</h1>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[50vw] h-[60vh] md:h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold text-center">Create an Account</h1>
          <p className="text-sm text-gray-600 text-center mt-2">
            Already have an account?{" "}
            <span
              onClick={goToLogin}
              className="text-blue-400 font-semibold cursor-pointer"
            >
              Log in
            </span>
          </p>

          {/* Form */}
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-medium"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-medium"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
