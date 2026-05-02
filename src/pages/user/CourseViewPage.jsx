import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  ArrowLeft,
  Play,
  Star,
  Clock,
  BookOpen,
  Award,
  Check,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
;
// import { getUnifiedCourse } from "@/utils/courseLookup";
import { reviews} from "@/lib/catalog";
import { getCourse } from "@/lib/catalog";
import VideoPlayer from "@/pages/user/VideoPlayer";
import { QuizRunner, sampleQuiz } from "@/pages/user/QuizRunner";
import { markLessonViewed, markMaterialOpened, markQuizCompleted } from "@/utils/userStore";
import Footer from "../../pages/Footer";

const fakeLessons = [
  { id: "l1", title: "Welcome & course overview", duration: "4:32", done: true, free: true },
  { id: "l2", title: "Setting up your environment", duration: "8:14", done: true, free: true },
  { id: "l3", title: "Core concepts in 20 minutes", duration: "20:45", done: true, free: true },
  { id: "l4", title: "Hands-on: your first project", duration: "32:10", done: false, free: true },
  { id: "l5", title: "Patterns to know cold", duration: "18:22", done: false, free: true },
  { id: "l6", title: "Advanced techniques", duration: "27:08", done: false, free: true },
  { id: "l7", title: "Capstone project walkthrough", duration: "41:55", done: false, free: true },
];

export default function CourseViewPage() {
  const { id } = useParams(); // ✅ FIX
  const navigate = useNavigate();
  const location = useLocation();

  // const course = getUnifiedCourse(id);
  const course = getCourse(id);

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Course not found</h2>
        <Button onClick={() => navigate("/courses")} className="mt-4">
          Back to courses
        </Button>
      </div>
    );
  }

  const [active, setActive] = useState(
    (course.videos?.length
      ? {
          id: "v1",
          title: course.videos[0]?.title || "Lesson 1",
          duration: course.videos[0]?.duration || "0:00",
          url: course.videos[0]?.url,
        }
      : fakeLessons.find((l) => !l.done) || fakeLessons[0])
  );
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizTitle, setQuizTitle] = useState("Module knowledge check");
  const [quizQuestions, setQuizQuestions] = useState(sampleQuiz);

  const defaultMaterials = [
    { title: "Module 1 reference.pdf", type: "PDF", url: "https://example.com/material-1" },
    { title: "Module 2 cheatsheet.pdf", type: "PDF", url: "https://example.com/material-2" },
  ];
  const defaultQuizzes = [
    { quizTitle: "Module 1 Quiz", questions: sampleQuiz },
    { quizTitle: "Module 2 Quiz", questions: sampleQuiz },
  ];
  const from = location.state?.from || "/dashboard";
  const backLabel = from.includes("development")
    ? "Back to development"
    : from.includes("courses")
      ? "Back to courses"
      : "Back to home";

  const lessonCount = course.videos?.length || fakeLessons.length;
  const completed = course.videos?.length ? 0 : fakeLessons.filter((l) => l.done).length;
  const progress = Math.round((completed / lessonCount) * 100);

  return (
    <div className="space-y-5 px-6 py-2 md:px-10">

      <Button variant="ghost" size="sm" onClick={() => navigate(from)}>
        <ArrowLeft className="h-4 w-4" /> {backLabel}
      </Button>
      <p className="text-sm text-muted-foreground">
          Home / {course.category} / {course.title}
        </p>
      {/* <div className="rounded-[28px] bg-card p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">{course.category}</Badge>
          <Badge variant="outline">{course.level}</Badge>
          {course.tag && <Badge>{course.tag}</Badge>}
        </div>

        <h1 className="mt-3 text-3xl font-semibold text-foreground">
          {course.title}
        </h1>

        <p className="mt-3 max-w-4xl text-sm text-muted-foreground">
          {course.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            {course.rating}
          </span>
          <span className="text-muted-foreground">
            {course.reviews.toLocaleString()} ratings
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {course.hours}h total
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" /> {course.lessons} lessons
          </span>
          <span className="text-muted-foreground">
            By <span className="font-medium text-foreground">{course.instructor}</span>
          </span>
        </div>
      </div> */}

      {/* <div className="grid gap-6 lg:grid-cols-[1fr_360px]"> */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-[1.3fr_1fr]">

        {/* LEFT */}
        <div className="space-y-5">

          <Card className="overflow-hidden border-border/60 p-0 shadow-sm ring-1 ring-black/5">
            <VideoPlayer
              key={active.id}
              // src={active.url || SAMPLE_VIDEO_URL}
              src={active.url}
              poster={course.thumbnail || course.cover}
              title={active.title}
              subtitle={active.duration}
            />
          </Card>

          <div className="rounded-xl p-6  ">
  
  {/* CATEGORY + LEVEL */}
  <div className="flex flex-wrap items-center gap-2 mb-2">
    <span className="bg-gray-200 text-xs px-2 py-1 rounded">
      {course.category}
    </span>
    <span className="bg-gray-200 text-xs px-2 py-1 rounded">
      {course.level}
    </span>
    {course.tag && (
      <span className="bg-gray-200 text-xs px-2 py-1 rounded">
        {course.tag}
      </span>
    )}
  </div>

  {/* TITLE */}
  <h1 className="text-2xl font-bold text-gray-900">
    {course.title}
  </h1>

  {/* DESCRIPTION */}
  <p className="mt-2 text-sm text-gray-500 max-w-4xl">
    {course.description}
  </p>

  {/* STATS */}
  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
    
    <span className="flex items-center gap-1">
      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      {course.rating} ({course.reviews.toLocaleString()})
    </span>

    <span className="flex items-center gap-1">
      <Clock className="h-4 w-4" />
      {course.hours}h
    </span>

    <span className="flex items-center gap-1">
      <BookOpen className="h-4 w-4" />
      {course.lessons} lessons
    </span>

    <span className="text-gray-500">
      By <span className="font-medium text-gray-900">
        {course.instructor}
      </span>
    </span>

  </div>
</div>

          {/* TABS */}
          <Tabs defaultValue="overview">
            <TabsList className="rounded-xl bg-white p-1 shadow-sm ring-1 ring-black/5">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="materials" className="rounded-lg">Materials</TabsTrigger>
              <TabsTrigger value="quizzes" className="rounded-lg">Quizzes</TabsTrigger>
              {/* <TabsTrigger value="reviews" className="rounded-lg">Reviews</TabsTrigger> */}
            </TabsList>

            <TabsContent value="overview">
              <Card className="p-6 shadow-sm ring-1 ring-black/5">
                <h3 className="font-semibold">What you'll learn</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {["Build apps", "Learn patterns", "Get certificate"].map((b) => (
                    <li key={b} className="flex gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
              
            </TabsContent>

            <TabsContent value="materials">
              {(course.materials?.length ? course.materials : defaultMaterials).map((m, i) => (
                <Card key={i} className="flex items-center justify-between p-4 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">{m.title || m.name || `Material ${i + 1}`}</p>
                      <p className="text-xs text-muted-foreground">{m.type || "FILE"}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => {
                      if (m.url) {
                        markMaterialOpened(course.id, m.title || m.name || `Material ${i + 1}`);
                        window.open(m.url, "_blank");
                      }
                    }}
                    disabled={!m.url}
                  >
                    Open
                  </Button>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="quizzes">
              {(course.quizzes?.length ? course.quizzes : defaultQuizzes).map((qz, i) => (
                <Card key={i} className="flex justify-between p-4 shadow-sm ring-1 ring-black/5">
                  <div>
                    <p className="text-sm font-medium">{qz.quizTitle || `Quiz ${i + 1}`}</p>
                    <p className="text-xs text-muted-foreground">
                      {(qz.questions?.length || 0)} questions
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      setQuizTitle(qz.quizTitle || `Quiz ${i + 1}`);
                      setQuizQuestions(
                        qz.questions?.length
                          ? qz.questions.map((q, qi) => ({
                              id: q.id || `q-${qi + 1}`,
                              question: q.question || q.q || "Question",
                              options: q.options || [],
                              correctIndex:
                                typeof q.correctIndex === "number" ? q.correctIndex : q.correct || 0,
                            }))
                          : sampleQuiz
                      );
                      markQuizCompleted(course.id, qz.quizTitle || `Quiz ${i + 1}`);
                      setQuizOpen(true);
                    }}
                  >
                    Start
                  </Button>
                </Card>
              ))}
              </TabsContent>

            {/* <TabsContent value="reviews">
  <div className="space-y-4">

    {reviews.slice(0, 3).map((r) => (
      <Card key={r.id} className="p-4 flex gap-4 items-start shadow-sm ring-1 ring-black/5">

        <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-semibold">
          {r.avatar || r.name.charAt(0)}
        </div>


        <div className="flex-1">

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{r.name}</p>
              <p className="text-xs text-gray-500">{r.role}</p>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-amber-500 fill-amber-500"
                />
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {r.text}
          </p>

        </div>

      </Card>
    ))}

  </div>
</TabsContent> */}

          </Tabs>

        </div>

        {/* RIGHT */}
        <aside className="space-y-4">

          <Card className="p-5 shadow-sm ring-1 ring-black/5">
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">Your progress</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>

            <Progress value={progress} />

            <p className="mt-2 text-xs text-muted-foreground">
              {completed}/{lessonCount} lessons completed
            </p>
            <p className="mt-3 text-xs text-emerald-600">
              Logged-in learners can watch every lesson without locks.
            </p>
            <Button className="mt-3 w-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500">
              Continue learning
            </Button>
          </Card>

          <Card className="overflow-hidden p-0 shadow-sm ring-1 ring-black/5">
              {(course.videos?.length ? course.videos : fakeLessons).map((l, i) => (
                <button
                  key={l.id || i}
                  onClick={() =>
                    {
                      const nextLesson = course.videos?.length
                        ? {
                            id: `v${i + 1}`,
                            title: l.title || `Lesson ${i + 1}`,
                            duration: l.duration || "0:00",
                            url: l.url,
                          }
                        : l;
                      setActive(nextLesson);
                      // markLessonViewed(course.id, nextLesson.title || `Lesson ${i + 1}`);
                    }
                  }
                  className="flex items-center justify-between w-full border-b px-4 py-3 text-left hover:bg-secondary/50 last:border-0"
                >
                  <div className="flex items-center gap-3">

                    {/* ICON */}
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-purple-100">
                      <Play className="w-4 h-4 text-purple-600" />
                    </div>

                    {/* TITLE */}
                    <div className="text-left">
                      <p className="text-sm font-medium">{l.title || `Lesson ${i + 1}`}</p>
                      <p className="text-xs text-muted-foreground">{l.duration || "0:00"}</p>
                    </div>

                  </div>

                  {/* DONE ICON */}
                  {l.done && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </button>
              ))}
            </Card>

            <Card className="p-6 shadow-sm ring-1 ring-black/5">
  <div className="flex items-center gap-3">
    <Award className="w-6 h-6 text-purple-600" />
    <div>
      <p className="font-semibold text-sm">Earn a certificate</p>
      <p className="text-xs text-muted-foreground">
        Complete the course and get a certificate
      </p>
    </div>
  </div>
</Card>

        </aside>

      </div>

      <QuizRunner
        open={quizOpen}
        onOpenChange={setQuizOpen}
        title={quizTitle}
        questions={quizQuestions}
        // onComplete={() => markQuizCompleted(course.id, quizTitle)}
          onComplete={(answers) => {
          // ✅ Save quiz
          markQuizCompleted(course.id, quizTitle);

          // ✅ Add course to MyLearning (VERY IMPORTANT)
          markLessonViewed(course.id, "Quiz Completed");
        }}
      />
      <Footer />
      
    </div>
  );
}