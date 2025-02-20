import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem("admin"));
    if (!storedAdmin) {
      navigate("/admin/login");
    } else {
      setAdmin(storedAdmin);
    }
  }, [navigate]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/course/${courseId}`,
          { withCredentials: true }
        );

        if (response.data.success) {
          setTitle(response.data.course.title);
          setDescription(response.data.course.description);
          setPrice(response.data.course.price);
          setImage(response.data.course.image.url);
          setPreview(response.data.course.image.url);
        } else {
          toast.error("Failed to fetch course data");
        }
      } catch (error) {
        toast.error("Error fetching course data");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Course Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !price) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!image) {
      toast.error("Please upload a course image!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("image", image);

    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/course/update/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${admin}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        toast.success("Course updated successfully!");
        navigate("/admin/our-courses");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-powder-blue p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Update Course
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter course title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter course description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Price (₹)
            </label>
            <input
              type="number"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter course price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block text-gray-700 font-semibold">
              Upload Course Image
            </label>

            {/* Upload Box */}
            <div
              className="mt-2 flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />

              {preview ? (
                <div className="relative w-full">
                  {/* Preview Image */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering file input click
                      setPreview(null);
                      setImage(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full shadow-md hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <p className="text-gray-500">
                  Click to upload or drag & drop an image
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition active:scale-95"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
