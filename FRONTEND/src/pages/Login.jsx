import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-screen h-screen flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-[50vw] h-[40vh] md:h-screen bg-blue-400 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">
          Welcome To CourseNest
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-[50vw] h-[60vh] md:h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
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
          <form className="mt-6">
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
                placeholder="You@example.com"
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
                  placeholder="Enter your Password"
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
            <button className="w-full bg-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-all">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
