import { useState } from "react";
import { catalog } from "../../lib/catalog";
import { CourseCard } from "../../pages/user/CourseCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import Footer from "../../pages/Footer";

// import {  useEffect } from "react";
// import { catalog } from "@/lib/catalog";
// import { getCourses } from "@/utils/storage";

export default function HomeCoursesPage() {
  const [tab, setTab] = useState("All");
  const [featureTab, setFeatureTab] = useState("Popular");

  const [catSwiper, setCatSwiper] = useState(null);
  const [trendSwiper, setTrendSwiper] = useState(null);
  const [featSwiper, setFeatSwiper] = useState(null);
  const [, forceUpdate] = useState(0);

  const categories = [
    "All",
    "Development",
    "Business",
    "Data Science",
    "Design",
  ];

  const featureTabs = ["Popular", "New", "Advanced"];

  // 🔥 ARROW VISIBILITY LOGIC
  // const showLeft = (swiper) => swiper?.activeIndex > 0;
  const showLeft = (swiper) => {
  if (!swiper) return false;
  return swiper.activeIndex > 0;
};

   const showRight = (swiper) => {
  if (!swiper) return false;

  const totalSlides = swiper.slides?.length || 0;
  const perView = swiper.params?.slidesPerView || 1;

  return swiper.activeIndex < totalSlides - perView;
};

// const [courses, setCourses] = useState([]);

// useEffect(() => {
//   const adminCourses = getCourses();

//   const activeAdmin = adminCourses.filter(
//     (c) => c.status === "Active"
//   );

//   // 🔥 merge catalog + admin
//   setCourses([...catalog, ...activeAdmin]);

// }, []);

  return (
    <div className="pt-10 px-6 max-w-7xl mx-auto space-y-10">

      {/* 🔗 BREADCRUMB */}
      <p className="text-sm text-gray-500 -mt-2">
        Home &gt; <span className="text-black font-medium">Courses</span>
      </p>

      {/* 🧠 HEADING */}
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Discover Top Courses to Boost Your Career 
        </h1>
        <p className="text-gray-500">
          Explore trending skills and expert-led learning
        </p>
      </div>

      {/* ================= CATEGORY ================= */}
      <div>

        {/* TABS */}
        <div className="flex gap-6 border-b pb-2 overflow-x-auto">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              className={`pb-2 text-sm whitespace-nowrap ${
                tab === c
                  ? "border-b-2 border-purple-600 text-black font-medium"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* SLIDER */}
        <div className="relative mt-6">

          {/* LEFT ARROW */}
          {showLeft(catSwiper) && (
            <button
              onClick={() => catSwiper.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-gray-100"
              // className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow"
            >
              ❮
            </button>
          )}

          {/* RIGHT ARROW */}
          {showRight(catSwiper) && (
            <button
              onClick={() => catSwiper.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-gray-100"
              // className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow"
            >
              ❯
            </button>
          )}

          <Swiper
            modules={[Navigation]}
          onSwiper={(swiper) => setCatSwiper(swiper)}

          onSlideChange={() => {
            forceUpdate((n) => n + 1); // 🔥 re-render
          }}
            spaceBetween={20}
            slidesPerView={4}
          >
            {catalog
              .filter((c) => tab === "All" || c.category === tab)
              .map((c) => (
                <SwiperSlide key={c.id}>
                  <CourseCard course={c} />
                </SwiperSlide>
              ))}
              {/* {courses
  .filter((c) => tab === "All" || c.category === tab)
  .map((c) => (
    <SwiperSlide key={c.id}>
      <CourseCard course={c} />
    </SwiperSlide>
  ))} */}
          </Swiper>

        </div>
      </div>

      {/* ================= TRENDING ================= */}
      <div>
        <h2 className="text-2xl font-semibold">
          Trending Courses
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Most popular courses chosen by thousands of learners to boost skills and career growth.
        </p>

        <div className="relative">

          {showLeft(trendSwiper) && (
            <button
              onClick={() => trendSwiper.slidePrev()}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-gray-100"
              // className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow"
            >
              ❮
            </button>
          )}

          {showRight(trendSwiper) && (
            <button
              onClick={() => trendSwiper.slideNext()}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border w-10 h-10 flex items-center justify-center rounded-full shadow hover:bg-gray-100"
              // className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow"
            >
              ❯
            </button>
          )}

          <Swiper
            onSwiper={(swiper) => setTrendSwiper(swiper)}

            onSlideChange={() => {
              forceUpdate((n) => n + 1);
            }}
            spaceBetween={20}
            slidesPerView={4}
          >
            {catalog.slice(0, 8).map((c) => (
              <SwiperSlide key={c.id}>
                <CourseCard course={c} />
              </SwiperSlide>
            ))}
            {/* {courses.slice(0, 8).map((c) => (
  <SwiperSlide key={c.id}>
    <CourseCard course={c} />
  </SwiperSlide>
))} */}
          </Swiper>

        </div>
      </div>

      {/* ================= FEATURED ================= */}
      <div>

        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">
            Featured Courses
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Hand-picked courses for you
          </p>
        </div>

        {/* TABS */}
        <div className="flex gap-6 border-b mt-4 pb-2">
          {featureTabs.map((t) => (
            <button
              key={t}
              onClick={() => setFeatureTab(t)}
              className={`pb-2 text-sm ${
                featureTab === t
                  ? "border-b-2 border-purple-600 text-black font-medium"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {t === "Advanced" ? "Intermediate & Advanced" : t}
            </button>
          ))}
        </div>

        {/* SLIDER */}
        <div className="relative mt-6">

          {showLeft(featSwiper) && (
            <button
              onClick={() => featSwiper.slidePrev()}
              className="absolute left-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow"
            >
              ❮
            </button>
          )}

          {showRight(featSwiper) && (
            <button
              onClick={() => featSwiper.slideNext()}
              className="absolute right-[-12px] top-1/2 -translate-y-1/2 z-10 bg-white w-9 h-9 flex items-center justify-center rounded-full shadow"
            >
              ❯
            </button>
          )}

          <Swiper
            onSwiper={(swiper) => setFeatSwiper(swiper)}

            onSlideChange={() => {
              forceUpdate((n) => n + 1);
            }}
            spaceBetween={20}
            slidesPerView={4}
          >
            {catalog
              .filter((c) =>
                featureTab === "Advanced"
                  ? ["Advanced", "Intermediate"].includes(c.level)
                  : c.tag === featureTab
              )
              .map((c) => (
                <SwiperSlide key={c.id}>
                  <CourseCard course={c} />
                </SwiperSlide>
              ))}
              {/* {courses
  .filter((c) =>
    featureTab === "Advanced"
      ? ["Advanced", "Intermediate"].includes(c.level)
      : c.tag === featureTab
  )
  .map((c) => (
    <SwiperSlide key={c.id}>
      <CourseCard course={c} />
    </SwiperSlide>
  ))} */}
          </Swiper>

        </div>
      </div>
        <Footer/>
    </div>
  );
}