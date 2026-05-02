import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCourses } from "../../utils/storage";
import { FaEllipsisV, FaTrash } from "react-icons/fa";

import {
  FaFilter,
  FaColumns,
  FaSort,
  FaPlus,
  FaChevronDown,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";

export default function AdminCourses() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("All");

  const [sort, setSort] = useState("latest");
  const [openSort, setOpenSort] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);

  useEffect(() => {
    setCourses(getCourses());
  }, []);

  // 🔍 SEARCH
  let filtered = courses.filter((c) =>
    // c.title.toLowerCase().includes(search.toLowerCase())
  (c.title || "").toLowerCase().includes((search || "").toLowerCase())
  );

  // 🔥 TAB FILTER
  if (tab === "Published") {
    filtered = filtered.filter((c) => c.status === "Active");
  }

  if (tab === "Draft") {
    filtered = filtered.filter((c) => c.status !== "Active");
  }

  // 🔃 SORT
  if (sort === "latest") {
    filtered = [...filtered].sort((a, b) => b.id - a.id);
  }

  if (sort === "oldest") {
    filtered = [...filtered].sort((a, b) => a.id - b.id);
  }

  return (
    <div className="p-6 bg-gray-80 min-h-screen">

      {/* HEADER */}
      {/* <h1 className="text-2xl font-semibold mb-6">Courses</h1> */}

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-6">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-4">

    {/* SEARCH */}
    <input
      placeholder="Search courses..."
      className="w-[300px] border px-4 py-2 rounded-lg shadow-sm"
      onChange={(e) => setSearch(e.target.value)}
    />

    {/* TABS */}
    <div className="flex items-center gap-2">

      <button
        onClick={() => setTab("All")}
        className={`px-4 py-1 rounded-full text-sm ${
          tab === "All" ? "bg-gray-200" : ""
        }`}
      >
        All
      </button>

      <button
        onClick={() => setTab("Published")}
        className={`px-4 py-1 rounded-full text-sm ${
          tab === "Published" ? "bg-gray-200" : ""
        }`}
      >
        Published
      </button>

      <button
        onClick={() => setTab("Draft")}
        className={`px-4 py-1 rounded-full text-sm ${
          tab === "Draft" ? "bg-gray-200" : ""
        }`}
      >
        Drafts
      </button>

    </div>
  </div>

  {/* RIGHT SIDE */}
  <button
    onClick={() => navigate("/courses/create")}
    className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg shadow"
  >
    <FaPlus />
    New Course
  </button>

</div>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {filtered.map((course) => (
          <div
            key={course.id}
            onClick={() => navigate(`/admin/courses/${course.id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            {/* TOP GRADIENT */}
            <div className="h-44 relative overflow-hidden">

  {/* IMAGE */}
  {course.thumbnail ? (
    <img
      src={course.thumbnail}
      alt="course"
      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500" />
  )}

  {/* DARK OVERLAY */}
  <div className="absolute inset-0 bg-black/20" />

  {/* CATEGORY */}
  <span className="absolute left-3 top-3 bg-white px-3 py-1 text-xs rounded-full shadow">
    {course.category}
  </span>

  {/* MENU */}
  <div
    className="absolute right-3 top-3 bg-white p-2 rounded-full cursor-pointer shadow"
    onClick={(e) => {
      e.stopPropagation();
      setOpenMenuId(openMenuId === course.id ? null : course.id);
    }}
  >
    <FaEllipsisV size={14} />
  </div>

            {/* <div
              className={`h-32 relative
              ${
                course.category === "Web Development"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500"
                  : course.category === "Data Science"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                  : course.category === "Design"
                  ? "bg-gradient-to-r from-pink-500 to-red-500"
                  : "bg-gradient-to-r from-green-500 to-teal-500"
              }`}
            >

              <span className="absolute left-3 top-3 bg-white px-3 py-1 text-xs rounded-full">
                {course.category}
              </span>

<div
  className="absolute right-3 top-3 bg-white p-2 rounded-full cursor-pointer"
  onClick={(e) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === course.id ? null : course.id);
  }}
>
  <FaEllipsisV size={14} />
</div> */}

{/* DROPDOWN */}
{openMenuId === course.id && (
  <div
    className="absolute right-3 top-12 bg-white shadow-lg rounded-lg p-2 z-50"
    onClick={(e) => e.stopPropagation()}
  >
    <button
      onClick={() => {
        const updated = courses.filter((c) => c.id !== course.id);
        setCourses(updated);
        localStorage.setItem("courses", JSON.stringify(updated));
        setOpenMenuId(null);
      }}
      className="flex items-center gap-2 text-red-500 px-1 py-1 hover:bg-gray-100 rounded"
    >
      <FaTrash className="size-3"/> Delete
    </button>
  </div>
)}
              
            </div>

            {/* BODY */}
            <div className="p-4 space-y-2">

              {/* TITLE + STATUS */}
              <div className="flex justify-between items-start">
                <h3 className="font-semibold">
                  {course.title}
                </h3>

                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    course.status === "Active"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {course.status === "Active" ? "Published" : "Draft"}
                </span>
              </div>

              {/* AUTHOR */}
              <p className="text-xs text-gray-500">
                By {course.instructor}
              </p>

              {/* STATS */}
              <div className="flex gap-4 text-xs text-gray-500">

                <span className="flex items-center gap-1">
                  <FaUsers /> {course.students || 0}
                </span>

                <span className="flex items-center gap-1">
                  <FaBookOpen /> {course.videos?.length || 0} lessons
                </span>

              </div>

              {/* PROGRESS (ONLY DRAFT) */}
              {course.status !== "Active" && (
                <div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Setup progress</span>
                    <span>60%</span>
                  </div>

                  <div className="w-full h-2 bg-gray-200 rounded mt-1">
                    <div className="w-[60%] h-2 bg-purple-500 rounded"></div>
                  </div>
                </div>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-10">
          No courses found
        </p>
      )}

    </div>
  );
}

