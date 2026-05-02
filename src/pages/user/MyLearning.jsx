import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { catalog } from "@/lib/catalog";
import { getLearningProgress, saveLearningProgress } from "@/utils/userStore";
import { getUnifiedCourse } from "@/utils/courseLookup";

function formatDate(value) {
  if (!value) return "-";
  try {
    return new Date(value).toLocaleDateString();
  } catch {
    return "-";
  }
}

export default function MyLearningPage() {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const navigate = useNavigate();
  const [progressMap, setProgressMap] = useState(getLearningProgress());

  const joinedAt = localStorage.getItem("user_joined_at") || new Date().toISOString();
  if (!localStorage.getItem("user_joined_at")) {
    localStorage.setItem("user_joined_at", joinedAt);
  }

  const rows = useMemo(
    () =>
      Object.entries(progressMap).map(([courseId, p]) => {
        const course = getUnifiedCourse(courseId);
        const totalLessons = course?.videos?.length || course?.lessons || 1;
        // const watched = p.lessons?.length || 0;
        const watched =
        (p.lessons?.length || 0) +
        (p.quizzes?.length || 0);
        const percent = Math.min(100, Math.round((watched / totalLessons) * 100));
        return {
          courseId,
          title: course?.title || `Course ${courseId}`,
          watched,
          totalLessons,
          percent,
          status: percent >= 100 ? "Completed" : "Pending",
          joined: formatDate(joinedAt),
          ended: percent >= 100 ? formatDate(p.updatedAt) : "-",
          materials: p.materials?.length || 0,
          quizzes: p.quizzes?.length || 0,
        };
      }),
    [progressMap, joinedAt]
  );

  const stats = useMemo(() => {
    const enrolled = rows.length;
    const completed = rows.filter((r) => r.status === "Completed").length;
    const hoursLearned = rows.reduce((sum, r) => sum + r.watched * 0.7, 0).toFixed(0);
    const streak = Math.max(1, Math.min(30, rows.filter((r) => r.watched > 0).length * 2));
    return { enrolled, completed, hoursLearned, streak };
  }, [rows]);

  const removeProgress = (courseId) => {
    const next = { ...progressMap };
    delete next[courseId];
    setProgressMap(next);
    saveLearningProgress(next);
  };

  return (
    <div className="space-y-8 px-6 py-4 md:px-10">
      <div>
        <h1 className="text-4xl font-semibold">Welcome back, {user?.name?.split(" ")[0] || "Student"} 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pick up where you left off.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4"><p className="text-xs text-muted-foreground">Enrolled</p><p className="text-3xl font-semibold">{stats.enrolled}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Completed</p><p className="text-3xl font-semibold">{stats.completed}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Hours learned</p><p className="text-3xl font-semibold">{stats.hoursLearned}</p></Card>
        <Card className="p-4"><p className="text-xs text-muted-foreground">Streak</p><p className="text-3xl font-semibold">{stats.streak}d</p></Card>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60 text-left">
            <tr>
              <th className="px-4 py-3">Course</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Ended</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-6 text-muted-foreground" colSpan={6}>
                  No course progress yet. Open any course and start learning.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.courseId} className="border-t">
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3">
                    <div className="w-44">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div className="h-2 rounded-full bg-purple-600" style={{ width: `${row.percent}%` }} />
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{row.percent}% ({row.watched}/{row.totalLessons})</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{row.joined}</td>
                  <td className="px-4 py-3">{row.ended}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${row.status === "Completed" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => navigate(`/courses/${row.courseId}`, { state: { from: "/my-learning" } })}>
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => removeProgress(row.courseId)}>
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recommended Courses</h2>
          <Link to="/courses" className="text-sm text-primary">View all</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {catalog.slice(0, 4).map((c) => (
            <Card key={c.id} className="overflow-hidden p-0">
              <img src={c.thumbnail} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2">{c.title}</p>
                <Button size="sm" className="mt-2" onClick={() => navigate(`/courses/${c.id}`, { state: { from: "/my-learning" } })}>
                  Open
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Popular Courses</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {catalog.slice(4, 8).map((c) => (
            <Card key={c.id} className="overflow-hidden p-0">
              <img src={c.thumbnail} alt={c.title} className="h-32 w-full object-cover" />
              <div className="p-3">
                <p className="text-sm font-medium line-clamp-2">{c.title}</p>
                <Button size="sm" variant="outline" className="mt-2" onClick={() => navigate(`/courses/${c.id}`, { state: { from: "/my-learning" } })}>
                  View course
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
