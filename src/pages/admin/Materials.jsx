import { useMemo, useState } from "react";
import {
  Search,
  Upload,
  FileText,
  FileImage,
  FileVideo,
  FileSpreadsheet,
  Link2,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Filter,
  FolderOpen,
  HardDrive,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { courses } from "@/lib/mockData";
import { toast } from "sonner";

/* ---------------- DATA ---------------- */

const seed = [
  { id: "m1", title: "Course Introduction.pdf", type: "PDF", size: "2.4 MB", course: "Advanced React Patterns", uploadedAt: "2d ago", uploadedBy: "Sarah Chen" },
  { id: "m2", title: "Week 1 Slides", type: "Slides", size: "8.1 MB", course: "Machine Learning Foundations", uploadedAt: "1w ago", uploadedBy: "Marcus Liu" },
  { id: "m3", title: "Reference Guide.docx", type: "Doc", size: "640 KB", course: "UI/UX Design Principles", uploadedAt: "3d ago", uploadedBy: "Emma Rodriguez" },
  { id: "m4", title: "Hooks Deep Dive.mp4", type: "Video", size: "184 MB", course: "Advanced React Patterns", uploadedAt: "5h ago", uploadedBy: "Sarah Chen" },
  { id: "m5", title: "Architecture Diagram.png", type: "Image", size: "1.2 MB", course: "Cloud Architecture on AWS", uploadedAt: "1d ago", uploadedBy: "David Kim" },
  { id: "m6", title: "Pandas Cheatsheet", type: "Link", size: "—", course: "Python for Data Analysis", uploadedAt: "4d ago", uploadedBy: "James Park" },
  { id: "m7", title: "Design System.fig (export).pdf", type: "PDF", size: "5.6 MB", course: "UI/UX Design Principles", uploadedAt: "6h ago", uploadedBy: "Emma Rodriguez" },
  { id: "m8", title: "Marketing Funnel.xlsx", type: "Doc", size: "320 KB", course: "Digital Marketing Mastery", uploadedAt: "2w ago", uploadedBy: "Olivia Wang" },
];

/* ---------------- ICON MAP ---------------- */

const typeMeta = {
  PDF: { icon: FileText, tint: "bg-rose-500/10 text-rose-600", ring: "ring-rose-500/20" },
  Doc: { icon: FileSpreadsheet, tint: "bg-sky-500/10 text-sky-600", ring: "ring-sky-500/20" },
  Slides: { icon: FileText, tint: "bg-amber-500/10 text-amber-600", ring: "ring-amber-500/20" },
  Video: { icon: FileVideo, tint: "bg-violet-500/10 text-violet-600", ring: "ring-violet-500/20" },
  Image: { icon: FileImage, tint: "bg-emerald-500/10 text-emerald-600", ring: "ring-emerald-500/20" },
  Link: { icon: Link2, tint: "bg-indigo-500/10 text-indigo-600", ring: "ring-indigo-500/20" },
};

/* ---------------- MAIN ---------------- */

export default function MaterialsPage() {
  const [items, setItems] = useState(seed);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [open, setOpen] = useState(false);


  const filtered = useMemo(() => {
    return items.filter((m) => {
      const matchQuery =
        !query ||
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.course.toLowerCase().includes(query.toLowerCase());

      const matchTab = tab === "all" || m.type === tab;
      const matchCourse =
        courseFilter === "all" || m.course === courseFilter;

      return matchQuery && matchTab && matchCourse;
    });
  }, [items, query, tab, courseFilter]);

  const stats = useMemo(() => {
    return {
      total: items.length,
      videos: items.filter((m) => m.type === "Video").length,
      docs: items.filter((m) =>
        ["PDF", "Doc", "Slides"].includes(m.type)
      ).length,
    };
  }, [items]);

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="flex justify-between">
        <div>
          {/* <h1 className="text-2xl font-semibold">Materials</h1> */}
          <p className="text-sm text-gray-500">
            Central library of all learning resources across your courses.
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const csv = items.map(i => `${i.title},${i.type}`).join("\n");
              const blob = new Blob([csv]);
              const url = URL.createObjectURL(blob);

              const a = document.createElement("a");
              a.href = url;
              a.download = "materials.csv";
              a.click();
            }}
          >Export</Button>

          <UploadMaterialDialog
            open={open}
            onOpenChange={setOpen}
            onCreate={(m) => setItems((prev) => [m, ...prev])}
          />
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  <StatCard
    label="Total materials"
    value={stats.total}
    icon={FolderOpen}
    bg="bg-purple-100"
    color="text-purple-600"
  />

  <StatCard
    label="Videos"
    value={stats.videos}
    icon={FileVideo}
    bg="bg-blue-100"
    color="text-blue-600"
  />

  <StatCard
    label="Documents"
    value={stats.docs}
    icon={FileText}
    bg="bg-green-100"
    color="text-green-600"
  />

  <StatCard
    label="Storage used"
    value="2.1 GB"
    icon={HardDrive}
    bg="bg-orange-100"
    color="text-orange-600"
  />

</div>

      {/* FILTER */}
      <Card>
        <CardContent className="p-4 flex justify-between items-center gap-20">
          
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="bg-gray-100 p-1 rounded-xl flex gap-1">
              {[
                { label: "All", value: "all" },
                { label: "PDFs", value: "PDF" },
                { label: "Docs", value: "Doc" },
                { label: "Slides", value: "Slides" },
                { label: "Videos", value: "Video" },
                { label: "Images", value: "Image" },
                { label: "Links", value: "Link" },
              ].map((t) => (
                <TabsTrigger
                  key={t.value}
                  value={t.value}
                  className="px-4 py-2 rounded-lg text-sm transition-all
                            data-[state=active]:bg-white
                            data-[state=active]:text-black
                            data-[state=active]:shadow-sm"
                >
                  {t.label}
                </TabsTrigger>
              ))}

            </TabsList>
          </Tabs>

          {/* <div className="flex gap-2"> */}
            <Input
              placeholder="Search materials..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="All courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All courses</SelectItem>
                {courses.map((c) => (
                  <SelectItem key={c.id} value={c.title}>
                    {c.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          {/* </div> */}
        </CardContent>
      </Card>

      {/* GRID */}
      <div className="grid grid-cols-4 gap-4">
        {/* {filtered.map((m) => (
          <MaterialCard key={m.id} item={m} />
        ))} */}
        {filtered.map((m) => (
          <MaterialCard
            key={m.id}
            item={m}
            onDelete={(id) => {
              setItems((prev) => prev.filter((i) => i.id !== id));
              toast("Material deleted");
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------- CARD ---------------- */

function MaterialCard({ item, onDelete }) {
  const meta = typeMeta[item.type];
  const Icon = meta.icon;

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between">
          {/* <div className={`p-3 rounded-xl ${meta.tint}`}> */}
          <div className={`p-3 rounded-xl ring-1 ${meta.ring} ${meta.tint}`}>
            <Icon className="h-5 w-5" />
          </div>

          <DropdownMenu >
            <DropdownMenuTrigger>
              <MoreVertical className="cursor-pointer" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

            {/* <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => {
                const win = window.open();
                win.document.write(`
                  <h1>${item.title}</h1>
                  <p>Course: ${item.course}</p>
                  <p>Type: ${item.type}</p>
                  <p>Size: ${item.size}</p>
                `);
              }}>
              <Eye className="mr-2 h-4 w-4" /> Preview
            </DropdownMenuItem>

            {/* <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem> */}
            <DropdownMenuItem
              onClick={() => {
                const blob = new Blob([item.title], { type: "text/plain" });
                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = item.title;
                a.click();
              }}>
              <Download className="mr-2 h-4 w-4" /> Download
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-red-500"
              // onClick={() => {
              //   toast("Deleted");
              // }}
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        </div>

        <h3 className="mt-3 font-medium">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.course}</p>

        <div className="flex justify-between mt-3 text-xs">
          <Badge>{item.type} · {item.size}</Badge>
          <span>{item.uploadedAt}</span>
        </div>
      </CardContent>
    </Card>
  );
}

/* ---------------- UPLOAD MODAL ---------------- */

function UploadMaterialDialog({ open, onOpenChange, onCreate }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("PDF");
  const [course, setCourse] = useState("");

  const [file, setFile] = useState(null);

  const submit = () => {
    onCreate({
      id: Date.now().toString(),
      title,
      type,
      size: "1 MB",
      course,
      uploadedAt: "just now",
      uploadedBy: "Admin",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4" /> Upload
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg rounded-2xl">

  <DialogHeader>
    <DialogTitle>Upload material</DialogTitle>
    <DialogDescription>
      Add a new resource to your shared materials library.
    </DialogDescription>
  </DialogHeader>

  {/* TITLE */}
  <div className="space-y-2">
    <Label>Title</Label>
    <Input
      placeholder="e.g. Week 3 Lecture Notes"
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>

  {/* TYPE + COURSE */}
  <div className="grid grid-cols-2 gap-3">

    <div>
      <Label>Type</Label>
      <Select onValueChange={setType}>
        <SelectTrigger>
          <SelectValue placeholder="PDF" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PDF">PDF</SelectItem>
          <SelectItem value="Doc">Doc</SelectItem>
          <SelectItem value="Slides">Slides</SelectItem>
          <SelectItem value="Video">Video</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label>Course</Label>
      <Select onValueChange={setCourse}>
        <SelectTrigger>
          <SelectValue placeholder="Select course" />
        </SelectTrigger>
        <SelectContent>
          {courses.map((c) => (
            <SelectItem key={c.id} value={c.title}>
              {c.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

  </div>

  {/* DRAG BOX */}
  {/* <div className="border-2 border-dashed rounded-xl p-8 text-center">
    <Upload className="mx-auto mb-2" />
    <p>Drag and drop or click to upload</p>
    <p className="text-xs text-gray-400">
      PDF, Doc, Slides, Video, Image — up to 250 MB
    </p>
  </div> */}
  <div
  className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50"
  onClick={() => document.getElementById("fileUpload").click()}
>
  <Upload className="mx-auto mb-2" />

  <p className="font-medium">
    Drag and drop or click to upload
  </p>

  <p className="text-xs text-gray-400">
    PDF, Doc, Slides, Video, Image — up to 250 MB
  </p>

  {/* 🔥 HIDDEN INPUT */}
 <input
  id="fileUpload"
  type="file"
  className="hidden"
  onChange={(e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);   // ✅ IMPORTANT
  }}
/>
{/* {file && (
  <div className="mt-3 text-sm text-green-600">
    ✅ {file.name}
  </div>
)} */}
{file && (
  <div className="mt-3 flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
    <span className="text-sm truncate">{file.name}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        setFile(null);
      }}
      className="text-red-500 text-xs"
    >
      Remove
    </button>
  </div>
)}
</div>

  {/* ACTIONS */}
  <DialogFooter>
    <Button variant="outline" onClick={() => onOpenChange(false)}>
      Cancel
    </Button>

    <Button onClick={submit}>
      Upload
    </Button>
  </DialogFooter>

</DialogContent>
    </Dialog>
  );
}

/* ---------------- STAT ---------------- */

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <h2 className="text-xl font-semibold">{value}</h2>
      </div>

      <div className={`p-3 rounded-xl ${bg} ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  );
}