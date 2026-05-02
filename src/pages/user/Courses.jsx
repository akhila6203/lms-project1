import { useEffect, useMemo, useState } from "react";
import { Search, Filter as FilterIcon } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Footer from "../../pages/Footer";

import { CourseCard } from "@/pages/user/CourseCard";
import { catalog, CATEGORY_TABS } from "@/lib/catalog";
import { getCourses } from "@/utils/storage";
import { getUnifiedCourse } from "@/utils/courseLookup";


function AppCoursesPage() {
  const [searchParams] = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(searchParams.get("category") || "All");
  const defaultTab = (category) => CATEGORY_TABS[category]?.[0] || "All";
  const [activeTab, setActiveTab] = useState(
    searchParams.get("subCategory") || defaultTab(searchParams.get("category"))
  );
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("popular");
  const [storedCourses, setStoredCourses] = useState([]);

  useEffect(() => {
    setStoredCourses(getCourses());
  }, []);

  useEffect(() => {
    const nextCat = searchParams.get("category") || "All";
    setCat(nextCat);
    setActiveTab(searchParams.get("subCategory") || defaultTab(nextCat));
  }, [searchParams]);

  const list = useMemo(() => {
    const storedUnified = storedCourses
      .map((c) => getUnifiedCourse(c.id))
      .filter(Boolean);

    let out = [...storedUnified, ...catalog];

    if (cat !== "All") {
      out = out.filter((c) => c.category === cat);
    }

    const categoryTabs = CATEGORY_TABS[cat];
    const allTabLabel = categoryTabs?.[0];
    if (categoryTabs?.length && activeTab && activeTab !== allTabLabel) {
      out = out.filter((c) => c.subCategory === activeTab);
    }

    if (level !== "All") {
      out = out.filter((c) => c.level === level);
    }

    if (q.trim()) {
      const t = q.toLowerCase();
      out = out.filter(
        (c) =>
          c.title.toLowerCase().includes(t) ||
          c.instructor.toLowerCase().includes(t)
      );
    }

    if (sort === "rating") {
      out.sort((a, b) => b.rating - a.rating);
    } else if (sort === "newest") {
      out.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      out.sort((a, b) => b.reviews - a.reviews);
    }

    return out;
  }, [q, cat, activeTab, level, sort, storedCourses]);

  return (
    <div className="space-y-6 px-6 py-3 md:px-10">
      <div>
        <p className="text-xs text-muted-foreground">
          {cat === "All" ? "Home / Courses" : `Home / ${cat} / Courses`}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          {cat === "All" ? "All Courses" : `${cat} Courses`}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Browse the same style of category page you showed in the reference. Use the navbar or the filters below, and click any course card to open its details page.
        </p>
      </div>

      {CATEGORY_TABS[cat]?.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border bg-white p-2 shadow-sm">
          {CATEGORY_TABS[cat].map((tab) => (
            <Button
              key={tab}
              type="button"
              variant={activeTab === tab ? "default" : "ghost"}
              className={`rounded-full px-4 ${
                activeTab === tab ? "" : "text-muted-foreground"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      )}

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="relative max-w-sm flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses or instructors..."
              className="h-11 rounded-full pl-9"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-[140px] rounded-full">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[160px] rounded-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most popular</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="newest">A → Z</SelectItem>
              </SelectContent>
            </Select>

          </div>
      </div>

      {/* COURSE GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {list.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}

        {list.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <FilterIcon className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              No courses match your filters.
            </p>
          </div>
        )}

      </div>
      <Footer />
    </div>
  );
}

export default AppCoursesPage;

