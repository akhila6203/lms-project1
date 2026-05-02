import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Lock,
  Star,
  Clock,
  BookOpen,
  FileText,
  ListChecks,
  MessageSquare,
  Check,
} from "lucide-react";
import { Award } from "lucide-react";

import { useState } from "react";
import VideoPlayer from "../../pages/user/VideoPlayer";
// import { reviews, SAMPLE_VIDEO_URL } from "../../lib/catalog";
import { reviews } from "../../lib/catalog";
import { getCourse } from "@/lib/catalog";
import Footer from "../../pages/Footer";
// import { getUnifiedCourse } from "@/utils/courseLookup";

const lessons = [
  { id: "1", title: "Welcome & course overview", duration: "4:32", free: true },
  { id: "2", title: "Setting up your environment", duration: "8:14" },
  { id: "3", title: "Core concepts in 20 minutes", duration: "20:45" },
  { id: "4", title: "Hands-on: your first project", duration: "32:10" },
  { id: "5", title: "Patterns to know cold", duration: "18:22" },
  { id: "6", title: "Advanced techniques", duration: "27:08" },
  { id: "7", title: "Capstone project walkthrough", duration: "41:55" },
];

export default function PublicCoursePage({ courseOverride = null }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tab, setTab] = useState("overview");

  // const course = courseOverride || getUnifiedCourse(id);
  const course = courseOverride || getCourse(id);

  const isLoggedIn = localStorage.getItem("user");

  if (!course) return <h2 className="p-6">Course not found</h2>;

  const handleProtected = () => {
    if (!isLoggedIn) navigate(`/login?redirect=/courses/${id}`);
    else navigate(`/courses/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen px-24 py-6">

      {/* BACK */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 mb-4 text-sm text-gray-600"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </button>

      {/* <div className="grid lg:grid-cols-[1fr_350px] gap-16"> */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1.3fr_1fr]">

        {/* LEFT */}
        <div className="space-y-6 ">

          {/* VIDEO */}
          <div className="bg-white rounded-xl overflow-hidden shadow">
            <VideoPlayer
              src={course.videos?.[0]?.url || "https://cdn.pixabay.com/video/2016/09/21/5456-183788693_medium.mp4"}
              title={course.videos?.[0]?.title || lessons[0].title}
              subtitle={course.videos?.[0]?.duration || lessons[0].duration}
              badge="Free preview"
              // className="h-[480px]"
            />
          </div>

          {/* DEMO BOX */}
          <div className="flex justify-between items-center bg-purple-50 border border-purple-200 p-4 rounded-xl">
            <div className="flex gap-3">
              <Lock className="text-purple-600" />
              <div>
                <p className="font-semibold text-sm">
                  You're watching the demo lesson
                </p>
                <p className="text-xs text-gray-500">
                  Sign in to unlock all lessons, materials, quizzes and certificate.
                </p>
              </div>
            </div>

            <button
              onClick={handleProtected}
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-2 rounded-lg text-sm"
            >
              Continue
            </button>
          </div>

          {/* TITLE */}
          <div>
            <div className="flex gap-2 mb-2">
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                {course.category}
              </span>
              <span className="bg-gray-200 text-xs px-2 py-1 rounded">
                {course.level}
              </span>
            </div>

            <h1 className="text-2xl font-bold">
              {course.title}
            </h1>

            <p className="text-gray-500 mt-2 text-sm">
              {course.description}
            </p>

            <div className="flex gap-4 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                {course.rating} ({course.reviews})
              </span>

              <span className="flex gap-1 items-center">
                <Clock className="h-4 w-4" />
                {course.hours}h
              </span>

              <span className="flex gap-1 items-center">
                <BookOpen className="h-4 w-4" />
                {course.lessons} lessons
              </span>

              <span className="text-gray-500">
                By <span className="font-medium">{course.instructor}</span>
              </span>
            </div>
          </div>

          {/* TABS */}
          <div className="flex gap-2 bg-gray-200 p-1 rounded-xl w-fit">
            {/* OVERVIEW */}
            <button
                onClick={() => setTab("overview")}
                className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 transition
                ${tab === "overview"
                    ? "bg-white shadow text-black font-medium"
                    : "text-gray-600"
                }`}
            >
                Overview
            </button>

            {/* MATERIALS */}
            <button
                onClick={() => setTab("materials")}
                className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 transition
                ${tab === "materials"
                    ? "bg-white shadow text-black font-medium"
                    : "text-gray-600"
                }`}
            >
                <FileText className="h-4 w-4" /> Materials
            </button>

            {/* QUIZ */}
            <button
                onClick={() => setTab("quiz")}
                className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 transition
                ${tab === "quiz"
                    ? "bg-white shadow text-black font-medium"
                    : "text-gray-600"
                }`}
            >
                <ListChecks className="h-4 w-4" /> Quizzes
            </button>

            {/* REVIEWS */}
            {/* <button
                onClick={() => setTab("reviews")}
                className={`px-4 py-1.5 rounded-lg text-sm flex items-center gap-1 transition
                ${tab === "reviews"
                    ? "bg-white shadow text-black font-medium"
                    : "text-gray-600"
                }`}
            >
                <MessageSquare className="h-4 w-4" /> Reviews
            </button> */}
            </div>

          {/* TAB CONTENT */}

          {tab === "overview" && (
            <div className="mt-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">

                <h3 className="font-semibold mb-4">What you'll learn</h3>

                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">

                <p className="flex gap-2 items-start">
                    <Check className="text-green-500 mt-1" />
                    Build production-ready features end-to-end
                </p>

                <p className="flex gap-2 items-start">
                    <Check className="text-green-500 mt-1" />
                    Master core concepts with real examples
                </p>

                <p className="flex gap-2 items-start">
                    <Check className="text-green-500 mt-1" />
                    Apply patterns used by top engineering teams
                </p>

                <p className="flex gap-2 items-start">
                    <Check className="text-green-500 mt-1" />
                    Lifetime access to all updates
                </p>

                </div>
            </div>
            )}

          {tab === "materials" && (
            <div className="mt-4 border border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50">

                {/* ICON */}
                <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <FileText className="text-gray-500" />
                </div>

                {/* TEXT */}
                <h3 className="font-medium text-sm">
                Course materials are locked
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                Sign in to download module PDFs, code samples and reference sheets.
                </p>

                {/* BUTTON */}
                <button
                onClick={handleProtected}
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-2 rounded-lg text-sm"
                >
                Continue
                </button>

            </div>
            )}

          {tab === "quiz" && (
            <div className="mt-4 border border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50">

                <div className="mx-auto w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                <ListChecks className="text-gray-500" />
                </div>

                <h3 className="font-medium text-sm">
                Quizzes are locked
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                Sign in to take module knowledge checks and the final quiz.
                </p>

                <button
                onClick={handleProtected}
                className="mt-4 bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-2 rounded-lg text-sm"
                >
                Continue
                </button>
            </div>
            )}
          {/* {tab === "reviews" && (
            <div className="mt-4 space-y-4">

                {reviews.map((r) => (
                <div
                    key={r.id}
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex gap-4 items-start"
                >

                    <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold">
                    {r.name.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex-1">

                    <p className="font-medium text-sm">{r.name}</p>

                    <div className="flex gap-1 my-1">
                        {Array.from({ length: r.rating }).map((_, i) => (
                        <Star
                            key={i}
                            className="h-4 w-4 text-yellow-500 fill-yellow-500"
                        />
                        ))}
                    </div>

                    
                    <p className="text-sm text-gray-600">
                        {r.text}
                    </p>

                    </div>
                </div>
                ))}
            </div>
            )} */}
        </div>


        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          {/* CONTINUE */}
          <div className="bg-white p-5 rounded-xl shadow">
            <h3 className="text-sm font-semibold mb-2">Get full access</h3>
            <p className="text-xs text-gray-500 mb-3">
              Sign in as a student to watch every lesson, download materials and earn your certificate.
            </p>

            <button
              onClick={handleProtected}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-2 rounded-lg"
            >
              Continue learning
            </button>
          </div>

          {/* CURRICULUM */}
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="p-4 border-b text-sm font-semibold">
              Curriculum
              <p className="text-xs text-gray-400">7 lessons · 22h total</p>
            </div>

            {lessons.map((l, i) => (
              <div
                key={l.id}
                className="flex justify-between items-center p-4 border-b text-sm"
              >
                <div className="flex gap-2 items-center">
                  {l.free ? (
                    <Play className="text-purple-600 h-4 w-4" />
                  ) : (
                    <Lock className="text-gray-400 h-4 w-4" />
                  )}
                  {l.title}
                </div>

                <span className="text-gray-400">{l.duration}</span>
              </div>
            ))}
          </div>

          {/* CERTIFICATE */}
          <div className="bg-white p-4 rounded-xl shadow flex items-start gap-3">
            {/* ICON */}
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                <Award className="h-5 w-5" />
            </div>

            {/* CONTENT */}
            <div>
                <h3 className="text-sm font-semibold">Earn a certificate</h3>

                <p className="text-xs text-gray-500 mt-1">
                Complete all lessons and the final quiz to receive your verified certificate.
                </p>
            </div>

            </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}



