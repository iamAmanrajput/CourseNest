import React from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="w-screen h-screen flex">
      {/* Left Section */}
      <div className="w-[50vw] h-screen bg-blue-400 text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome To CourseNest</h1>
      </div>

      {/* Right Section */}
      <div className="w-[50vw] h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg w-96">
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
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Login@gmail.com"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your Password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "
              />
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
