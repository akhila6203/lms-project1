import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Search,
  Download,
  UserPlus,
  FileSpreadsheet,
} from "lucide-react";
import BulkImportModal from "./BulkImportModal";


// 🔥 DUMMY DATA
const initialStudents = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex@example.com",
    enrolled: 5,
    completed: 3,
    progress: 72,
    joined: "Mar 12, 2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    email: "priya@example.com",
    enrolled: 8,
    completed: 6,
    progress: 88,
    joined: "Feb 03, 2024",
    status: "Active",
  },
  {
    id: 3,
    name: "Noah Williams",
    email: "noah@example.com",
    enrolled: 3,
    completed: 1,
    progress: 45,
    joined: "Apr 22, 2024",
    status: "Active",
  },
  {
    id: 4,
    name: "Liam Brown",
    email: "liam@example.com",
    enrolled: 2,
    completed: 0,
    progress: 18,
    joined: "May 02, 2024",
    status: "Inactive",
  },
];

export default function Students() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [showImport, setShowImport] = useState(false);

  // 🔍 SEARCH FILTER
  const filtered = useMemo(() => {
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, students]);

  // 📊 STATS
  const total = students.length;
  const active = students.filter((s) => s.status === "Active").length;
  const avgCompletion = Math.round(
    students.reduce((acc, s) => acc + s.progress, 0) / students.length
  );

  // 📥 EXPORT CSV
  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Progress"],
      ...students.map((s) => [s.name, s.email, s.progress]),
    ];

    const blob = new Blob([csv.map((r) => r.join(",")).join("\n")], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  // ➕ IMPORT HANDLER
  const handleImport = (newStudents) => {
    setStudents((prev) => [...newStudents, ...prev]);
  };

  // ✉ INVITE
  const handleInvite = () => {
    alert("Invite link sent!");
  };

  return (
    <div className="space-y-6 p-6">

      <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Students</h1>
            <p className="text-gray-500 text-sm">
              Track every learner's progress across your platform.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4" /> Export
            </Button>

            <Button variant="outline" onClick={() => setShowImport(true)}>
              <FileSpreadsheet className="w-4 h-4" /> Bulk import
            </Button>

            <Button onClick={handleInvite} className="bg-purple-600 text-white">
              <UserPlus className="w-4 h-4" /> Invite student
            </Button>
          </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Total students</p>
            <p className="text-2xl font-bold">{total}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Active this month</p>
            <p className="text-2xl font-bold">{active}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-500">Avg. completion rate</p>
            <p className="text-2xl font-bold">{avgCompletion}%</p>
          </CardContent>
        </Card>
      </div>

      {/* TABLE */}
      <Card>
        <CardContent className="p-0">

          {/* SEARCH */}
          <div className="p-4 border-b">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search students..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Enrolled</TableHead>
                <TableHead>Completed</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center text-xs font-bold">
                        {s.name[0]}
                      </div>
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-gray-500">{s.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>{s.enrolled}</TableCell>
                  <TableCell>{s.completed}</TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={s.progress} className="h-2" />
                      <span className="text-xs">{s.progress}%</span>
                    </div>
                  </TableCell>

                  <TableCell>{s.joined}</TableCell>

                  <TableCell>
                    <Badge
                      variant={s.status === "Active" ? "default" : "secondary"}
                    >
                      {s.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* MODAL */}
      {showImport && (
        <BulkImportModal
          onClose={() => setShowImport(false)}
          onImport={handleImport}
        />
      )}
    </div>
  );
}