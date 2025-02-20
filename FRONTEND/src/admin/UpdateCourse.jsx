import React from "react";
import { useParams } from "react-router-dom";

const UpdateCourse = () => {
  const { courseId } = useParams();
  return <div>this is updateCourse Route UpdateCourse</div>;
};

export default UpdateCourse;
