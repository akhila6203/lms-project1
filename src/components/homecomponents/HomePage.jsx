import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Sparkles,
  Star,
  Award,
  Users,
  BookOpen,
  Zap,
  Shield,
} from "lucide-react";

import { catalog, CATEGORIES, reviews } from "../../lib/catalog";
import { CourseCard } from "../../pages/user/CourseCard";
import VideoPlayer from "../../pages/user/VideoPlayer";

import demo from "../../assets/videos/demo.mp4"
import Footer from "../../pages/Footer";
// import Footer from "../Footer";

const features = [
  { icon: Award, title: "Certified courses", desc: "Industry-recognized certificates upon completion." },
  { icon: Users, title: "Mentor support", desc: "Direct access to instructors and community." },
  { icon: Zap, title: "Hands-on projects", desc: "Ship real work — not just theory." },
  { icon: Shield, title: "Lifetime access", desc: "Buy once, learn forever." },
];

export default function HomePage() {
  const [active, setActive] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);
  // const isLoggedIn = Boolean(localStorage.getItem("user"));
  const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = user && user.role !== "admin";

  const filtered = useMemo(() => {
    return active === "All"
      ? catalog
      : catalog.filter((c) => c.category === active);
  }, [active]);

  const visibleCourses = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-background text-foreground px-4 sm:px-6 lg:px-8">

      {/* HERO */}
      <section className="relative overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 py-12 sm:py-16 lg:py-20">

          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
              <Sparkles className="w-4 h-4 text-purple-600" />
              New: AI for Builders course is live
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Learning today,
              <br />
              <span className="text-purple-600">
                leading tomorrow.
              </span>
            </h1>

            <p className="mt-4 text-muted-foreground">
              Mentor-led courses with real projects in web development,
              data science, design, AI and cloud.
            </p>

            <div className="mt-6 flex gap-4">
              <a href="#courses" className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2">
                Browse courses <ChevronRight className="w-4 h-4" />
              </a>

              {!isLoggedIn && (
                <Link to="/login" className="rounded-lg border px-6 py-3">
                  Sign in
                </Link>
              )}
            </div>

            {/* USERS + RATING */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-purple-500","bg-blue-500","bg-green-500","bg-orange-500"].map((c,i)=>(
                    <div key={i} className={`w-7 h-7 rounded-full border-2 border-white ${c}`} />
                  ))}
                </div>
                50,000+ learners
              </div>

              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i=>(
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500"/>
                ))}
                <span className="font-medium">4.8</span>
              </div>
            </div>
          </div>

          {/* RIGHT VIDEO */}
          <div className="hidden lg:block">
            <div className="rounded-2xl bg-card p-4 shadow-xl">
              <VideoPlayer
               src={demo}
               controls
                autoPlay
                muted
                loop
                // src={SAMPLE_VIDEO_URL}
                poster={catalog[0].thumbnail || catalog[0].cover}
                title={catalog[0].title}
                subtitle={`${catalog[0].lessons} lessons · ${catalog[0].hours}h`}
              />

              {/* MINI CARDS */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                {catalog.slice(1,4).map((c)=>(
                  <div key={c.id} className="bg-white rounded-xl shadow overflow-hidden">
                    {c.thumbnail ? (
                      <img src={c.thumbnail} alt={c.title} className="h-16 w-full object-cover" />
                    ) : (
                      <div className={`h-16 bg-gradient-to-br ${c.cover}`} />
                    )}
                    <div className="p-2">
                      <p className="text-xs">{c.title}</p>
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500"/>
                        {c.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="border-y bg-secondary/40 py-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((f)=>(
            <div key={f.title} className="flex gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-card shadow">
                <f.icon className="w-5 h-5 text-purple-600"/>
              </div>
              <div>
                <p className="font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" className="max-w-7xl mx-auto py-12 sm:py-16">

        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold">
              Skills to transform your career
            </h2>
            <p className="mt-2 text-muted-foreground">
              Browse courses across categories
            </p>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-3 mt-6 border-b pb-2 overflow-x-auto">
          {CATEGORIES.map((c)=>(
            <button
              key={c}
              onClick={() => {
                setActive(c);
                setVisibleCount(8);
              }}
              className={`pb-2 ${
                active===c
                  ? "border-b-2 border-purple-600 text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {visibleCourses.map((c)=>(
            <CourseCard key={c.id} course={c} />
          ))}
        </div>

        {visibleCount < filtered.length && (
          <div className="mt-8 text-center">
            <Button
              type="button"
              variant="outline"
              className="rounded-full px-8"
              onClick={() => setVisibleCount((prev) => prev + 20)}
            >
              More
            </Button>
          </div>
        )}

      </section>

      {/* REVIEWS */}
      <section className="bg-secondary/40 py-20">
  <div className="max-w-7xl mx-auto px-6">

    {/* HEADER */}
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-foreground">
        Loved by learners worldwide
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Real stories from people who shipped after taking our courses.
      </p>
    </div>

    {/* CARDS */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

      {reviews.map((r) => (
        <div
          key={r.id}
          className="rounded-2xl bg-card p-6 shadow-sm transition hover:shadow-md"
        >

          {/* ⭐ STARS */}
          <div className="flex gap-1 mb-3">
            {Array.from({ length: r.rating }).map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 text-amber-500 fill-amber-500"
              />
            ))}
          </div>

          {/* TEXT */}
          <p className="text-sm leading-relaxed text-foreground/90">
            “{r.text}”
          </p>

          {/* USER */}
          <div className="flex items-center gap-3 mt-5">

            {/* AVATAR */}
            <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm font-semibold">
              {r.avatar || r.name.charAt(0)}
            </div>

            {/* NAME + ROLE */}
            <div>
              <p className="text-sm font-semibold text-foreground">
                {r.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {r.role}
              </p>
            </div>

          </div>

        </div>
      ))}

    </div>
  </div>
</section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl px-8 py-14 text-center text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-500 shadow-xl">
            <BookOpen className="mx-auto h-10 w-10 opacity-90" />
            <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
            Start your learning journey today
            </h3>
            <p className="mx-auto mt-2 max-w-xl text-sm opacity-90">
            Join 50,000+ learners building skills that matter — with mentor-led courses and real-world projects.
            </p>
            <div className="mt-6 flex justify-center gap-3">
            {!isLoggedIn && (
              <Link
                  to="/login"
                  className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium shadow hover:scale-105 transition"
              >
                  Get started free
              </Link>
            )}
            </div>
        </div>
        </section>

      <Footer />
    </div>
  );
}
