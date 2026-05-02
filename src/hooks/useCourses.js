import { useEffect, useState } from "react";
import { getCourses } from "../utils/storage";


export default function useCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  return courses;
}