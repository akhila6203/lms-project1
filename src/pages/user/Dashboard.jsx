import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { catalog } from "@/lib/catalog";
import Footer from "../../pages/Footer";
import { getLearningProgress } from "@/utils/userStore";
import { getUnifiedCourse } from "@/utils/courseLookup";

const sections = [
  {
    title: "Recommended for you",
    items: catalog.slice(0, 5),
  },
  {
    title: "Because you viewed AI Engineer Course 2026",
    items: catalog.slice(5, 10),
  },
  {
    title: "Trending courses",
    items: catalog.slice(0, 5),
  },
  {
    title: "Featured courses",
    items: catalog.slice(7, 12),
  },
];

function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Learner",
    email: "learner@example.com",
  };

  const progressMap = getLearningProgress();
  const progressRows = Object.entries(progressMap).map(([courseId, p]) => {
    const c = getUnifiedCourse(courseId);
    const totalLessons = c?.videos?.length || c?.lessons || 1;
    const doneLessons = p.lessons?.length || 0;
    const percent = Math.min(100, Math.round((doneLessons / totalLessons) * 100));
    return {
      courseId,
      courseTitle: c?.title || `Course ${courseId}`,
      lessons: doneLessons,
      materials: p.materials?.length || 0,
      quizzes: p.quizzes?.length || 0,
      percent,
      status: percent >= 100 ? "Completed" : percent > 0 ? "In Progress" : "Not Started",
      updatedAt: p.updatedAt,
    };
  });

  return (
    <div className="space-y-8 sm:space-y-10 px-1 sm:px-6 md:px-10 py-4 sm:py-6">
      <div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {(user?.name || "L").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-semibold text-slate-900">
              Welcome back, {user?.name?.split(" ")[0] || "Learner"}
            </p>
            {/* <p className="text-sm text-muted-foreground">{user?.email}</p> */}
          </div>
        </div>
        <h1 className="mt-6 sm:mt-8 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
          What to learn next
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Continue learning with full access to every lesson after login.
        </p>
      </div>

      

      {sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">{section.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Click any card to open the full course details page.
              </p>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link to="/courses">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
            {section.items.map((course) => (
              <Link key={course.id} to={`/courses/${course.id}`} state={{ from: "/dashboard" }} className="group">
                <Card className="overflow-hidden rounded-2xl border-0 bg-white p-0 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    {course.thumbnail ? (
                      <img src={course.thumbnail} alt={course.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className={`h-full w-full bg-gradient-to-br ${course.cover}`} />
                    )}
                    <div className="absolute inset-0 bg-black/10" />
                    {course.tag && (
                      <Badge className="absolute left-3 top-3 bg-white text-slate-900 hover:bg-white">
                        {course.tag}
                      </Badge>
                    )}
                    <button className="absolute bottom-3 right-3 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white text-slate-900 shadow-sm">
                      <Play className="h-4 w-4 fill-current" />
                    </button>
                  </div>

                  <div className="space-y-2 p-3 sm:p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {course.category}
                    </p>
                    <h3 className="line-clamp-2 min-h-[3rem] text-sm sm:text-base font-semibold text-slate-900 group-hover:text-primary">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{course.instructor}</p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-semibold text-amber-600">{course.rating}</span>
                      <span className="text-muted-foreground">
                        ({course.reviews.toLocaleString()} ratings)
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
}

export default StudentDashboard;