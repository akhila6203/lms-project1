import { useState } from "react";
import {
  Search,
  FileText,
  FileVideo,
  FileImage,
  Download,
  ExternalLink,
  FolderOpen,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "../../pages/Footer";

// ❌ removed TS types

const items = [
  {
    id: "1",
    title: "React Patterns Cheatsheet.pdf",
    course: "Advanced React Patterns",
    type: "PDF",
    size: "2.4 MB",
    added: "2d ago",
  },
  {
    id: "2",
    title: "Hooks deep-dive recording",
    course: "Advanced React Patterns",
    type: "Video",
    size: "412 MB",
    added: "3d ago",
  },
  {
    id: "3",
    title: "ML Foundations slides",
    course: "Machine Learning Foundations",
    type: "Slides",
    size: "8.1 MB",
    added: "1w ago",
  },
  {
    id: "4",
    title: "Cloud architecture patterns",
    course: "Cloud Architecture on AWS",
    type: "PDF",
    size: "5.6 MB",
    added: "5d ago",
  },
  {
    id: "5",
    title: "Recommended reading",
    course: "Generative AI for Builders",
    type: "Link",
    size: "—",
    added: "1d ago",
  },
  {
    id: "6",
    title: "Capstone project brief.pdf",
    course: "Full-Stack TypeScript",
    type: "PDF",
    size: "1.1 MB",
    added: "Today",
  },
];

// ❌ removed Record type
const ICONS = {
  PDF: FileText,
  Video: FileVideo,
  Slides: FileImage,
  Link: ExternalLink,
};

function MyMaterialsPage() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = items.filter((m) => {
    if (tab !== "all" && m.type.toLowerCase() !== tab) return false;

    if (
      q &&
      !m.title.toLowerCase().includes(q.toLowerCase()) &&
      !m.course.toLowerCase().includes(q.toLowerCase())
    )
      return false;

    return true;
  });

  return (
    <div className="space-y-6 px-6 py-3">

      {/* HEADER */}
      <div>
        {/* <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          My materials
        </h1> */}
        <p className="mt-1 text-sm text-muted-foreground">
          Everything you've downloaded or saved across your courses.
        </p>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title or course…"
            className="pl-9"
          />
        </div>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pdf">PDF</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
            <TabsTrigger value="slides">Slides</TabsTrigger>
            <TabsTrigger value="link">Links</TabsTrigger>
          </TabsList>
        </Tabs>

      </div>

      {/* LIST */}
      <Card className="border-border/60 divide-y divide-border/60 p-0">

        {filtered.map((m) => {
          const Icon = ICONS[m.type];

          return (
            <div
              key={m.id}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
            >

              {/* LEFT */}
              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {m.course}
                  </p>
                </div>

              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">

                <Badge variant="secondary" className="text-[10px]">
                  {m.type}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  {m.size} · {m.added}
                </span>

                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" /> Download
                </Button>

              </div>

            </div>
          );
        })}

        {/* EMPTY */}
        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center">
            <FolderOpen className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Nothing here yet.
            </p>
          </div>
        )}

      </Card>
      
      <Footer/>
    </div>
  );
}

export default MyMaterialsPage;