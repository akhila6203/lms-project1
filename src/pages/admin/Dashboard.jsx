import React, { useState } from "react";
import {
  Table, TableHeader, TableBody, TableHead, TableRow, TableCell
} from "@/components/ui/table";

import {
  Pagination, PaginationContent, PaginationItem,
  PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import {
  Eye, Pencil, Trash2
} from "lucide-react";

import {
  LineChart, Line, XAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import {
  BookOpen,
  Users,
  GraduationCap,
  DollarSign,
} from "lucide-react";

const miniData = [
  { v: 10 },
  { v: 20 },
  { v: 15 },
  { v: 25 },
  { v: 18 },
  { v: 30 },
];

import {
  YAxis,
  CartesianGrid,
} from "recharts";

import { ChevronDown } from "lucide-react";

const earningData = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 450 },
  { name: "Mar", value: 300 },
  { name: "Apr", value: 500 },
  { name: "May", value: 90 },
  { name: "Jun", value: 300 },
  { name: "Jul", value: 450 },
  { name: "Aug", value: 150 },
  { name: "Sep", value: 450 },
  { name: "Oct", value: 100 },
  { name: "Nov", value: 250 },
  { name: "Dec", value: 150 },
];


import { MoreVertical } from "lucide-react";
// USER ACTIVITY PIE
const userActivityData = [
  { name: "Search", value: 875, color: "#3b82f6" },
  { name: "Referrals", value: 350, color: "#f97316" },
  { name: "Social Media", value: 320, color: "#22c55e" },
  { name: "Google", value: 340, color: "#9333ea" },
];

// COURSE ACTIVITY
const courseActivityData = [
  { name: "Jan", paid: 45, free: 10 },
  { name: "Feb", paid: 35, free: 20 },
  { name: "Mar", paid: 55, free: 15 },
  { name: "Apr", paid: 30, free: 25 },
  { name: "May", paid: 48, free: 20 },
  { name: "Jun", paid: 28, free: 60 },
  { name: "Jul", paid: 55, free: 40 },
  { name: "Aug", paid: 50, free: 45 },
  { name: "Sep", paid: 57, free: 25 },
];

export default function AdminDashboard() {

  const [filter, setFilter] = useState("Yearly");
const [open, setOpen] = useState(false);

const [userFilter, setUserFilter] = useState("Yearly");
const [userOpen, setUserOpen] = useState(false);

const [courseFilter, setCourseFilter] = useState("Yearly");
const [courseOpen, setCourseOpen] = useState(false);

const [menuOpen, setMenuOpen] = useState(false);

  const filters = ["Yearly", "Monthly", "Weekly", "Today"];

  // 🔥 TABLE DATA
  const data = [
    { id: "#829776", name: "John Doe", course: "UI/UX", amount: "$29", payment: "PayPal", date: "04 Feb" },
    { id: "#829777", name: "Emily", course: "Design", amount: "$49", payment: "Stripe", date: "06 Feb" },
    { id: "#829778", name: "Smith", course: "FullStack", amount: "$79", payment: "Card", date: "08 Feb" },
  ];

  // 🔥 PAGINATION
  const [page, setPage] = useState(1);
  const perPage = 2;
  const totalPages = Math.ceil(data.length / perPage);
  const paginated = data.slice((page - 1) * perPage, page * perPage);

  // 🔥 CHART DATA
  const chartData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 60 },
    { name: "Apr", value: 50 },
    { name: "May", value: 70 },
  ];

  const pieData = [
    { name: "Organic", value: 875 },
    { name: "Referral", value: 350 },
    { name: "Social", value: 320 },
  ];

  return (
    <div className="px-6 py-2 space-y-4">

      {/* HEADER */}
      <div>
        {/* <h1 className="text-2xl font-bold">Dashboard</h1> */}
        <p className="text-sm text-gray-500">LMS → Overview</p>
      </div>

      {/* 🔥 ROW 1 */}
      <div className="grid grid-cols-2 gap-6">

          <div className="grid grid-cols-2 gap-6">

  {/* CARD 1 */}
  <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 shadow border dark:border-gray-700">
    <div className="flex items-center justify-between mb-3">
      <p className="font-semibold dark:text-white">Enrolled Courses</p>
      <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
        <BookOpen className="text-blue-600 dark:text-blue-300" size={18} />
      </div>
    </div>

    <h2 className="text-3xl font-bold dark:text-white">500</h2>

    <div className="flex items-center text-green-600 mt-1">
      <TrendingUp size={16} />
      <span className="ml-1">43,9%</span>
    </div>

    <p className="text-sm text-gray-500 dark:text-gray-400">From last month</p>

    <div className="h-16 mt-2">
      <ResponsiveContainer>
        <AreaChart data={miniData}>
          <Area type="monotone" dataKey="v" stroke="#2563eb" fill="#dbeafe" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* CARD 2 */}
  <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 shadow border dark:border-gray-700">
    <div className="flex items-center justify-between mb-3">
      <p className="font-semibold dark:text-white">Total Students</p>
      <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
        <Users className="text-purple-600 dark:text-purple-300" size={18} />
      </div>
    </div>

    <h2 className="text-3xl font-bold dark:text-white">3,570</h2>

    <div className="flex items-center text-green-600 mt-1">
      <TrendingUp size={16} />
      <span className="ml-1">43,9%</span>
    </div>

    <p className="text-sm text-gray-500 dark:text-gray-400">From last month</p>

    <div className="flex gap-2 mt-4 h-16 items-end">
      {[20, 35, 25, 40, 30].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}px` }}
          className="w-4 bg-purple-500 rounded"
        />
      ))}
    </div>
  </div>

  {/* CARD 3 */}
  <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 shadow border dark:border-gray-700">
    <div className="flex items-center justify-between mb-3">
      <p className="font-semibold dark:text-white">Total Courses</p>
      <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
        <GraduationCap className="text-orange-500 dark:text-orange-300" size={18} />
      </div>
    </div>

    <h2 className="text-3xl font-bold dark:text-white">30</h2>

    <div className="flex items-center text-green-600 mt-1">
      <TrendingUp size={16} />
      <span className="ml-1">43,9%</span>
    </div>

    <p className="text-sm text-gray-500 dark:text-gray-400">From last month</p>

    <div className="flex gap-2 mt-4 h-16 items-end">
      {[25, 20, 35, 30, 18].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}px` }}
          className="w-4 bg-orange-400 rounded"
        />
      ))}
    </div>
  </div>

  {/* CARD 4 */}
  <div className="bg-white dark:bg-[#1e293b] rounded-xl p-5 shadow border dark:border-gray-700">
    <div className="flex items-center justify-between mb-3">
      <p className="font-semibold dark:text-white">Total Earnings</p>
      <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
        <DollarSign className="text-green-600 dark:text-green-300" size={18} />
      </div>
    </div>

    <h2 className="text-3xl font-bold dark:text-white">$50,000</h2>

    <div className="flex items-center text-red-500 mt-1">
      <TrendingDown size={16} />
      <span className="ml-1">20,3%</span>
    </div>

    <p className="text-sm text-gray-500 dark:text-gray-400">From last month</p>

    <div className="h-16 mt-2">
      <ResponsiveContainer>
        <AreaChart data={miniData}>
          <Area type="monotone" dataKey="v" stroke="#16a34a" fill="#dcfce7" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>

</div>
        {/* EARNING GRAPH */}
       <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 shadow border dark:border-gray-700">

  {/* HEADER */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="font-semibold text-lg dark:text-white">
      Earning Statistic
    </h2>

    <div className="relative">
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center gap-1 border px-3 py-1 rounded-md text-sm dark:text-white"
  >
    {filter} <ChevronDown size={16} />
  </button>

  {open && (
    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1e293b] border rounded-md shadow z-50">
      {["Yearly", "Monthly", "Weekly", "Today"].map((item) => (
        <div
          key={item}
          onClick={() => {
            setFilter(item);
            setOpen(false);
          }}
          className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>
  </div>

  {/* AMOUNT */}
  <div className="flex items-center gap-3 mb-6">
    <h1 className="text-3xl font-bold dark:text-white">$27,200</h1>

    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-sm">
      10% ▲
    </span>

    <span className="text-gray-500 text-sm dark:text-gray-400">
      + $1500 Per Day
    </span>
  </div>

  {/* CHART */}
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={earningData}>

        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2a9d8f" stopOpacity={0.4}/>
            <stop offset="95%" stopColor="#2a9d8f" stopOpacity={0.05}/>
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

        <XAxis
          dataKey="name"
          tick={{ fill: "#64748b", fontSize: 12 }}
        />

        <YAxis
          tick={{ fill: "#64748b", fontSize: 12 }}
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#2a9d8f"
          strokeWidth={3}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>

</div>

      </div>

      {/* 🔥 ROW 2 */}
      <div className="grid grid-cols-3 gap-6">

        {/* <div className="grid grid-cols-2 gap-6 mt-6"> */}

  {/* USER ACTIVITY */}
  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow border dark:border-gray-700">

    <div className="flex justify-between mb-4">
      <h2 className="font-semibold dark:text-white">User activity</h2>

      {/* DROPDOWN */}
      <div className="relative">
        <div className="relative">
  <button
    onClick={() => setUserOpen(!userOpen)}
    className="flex items-center gap-1 border px-3 py-1 rounded text-sm dark:text-white"
  >
    {userFilter} <ChevronDown size={16} />
  </button>

  {userOpen && (
    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1e293b] border rounded-md shadow z-50">
      {["Yearly", "Monthly", "Weekly", "Today"].map((item) => (
        <div
          key={item}
          onClick={() => {
            setUserFilter(item);
            setUserOpen(false);
          }}
          className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>
      </div>
    </div>

    <div className="flex items-center gap-6">

      {/* LEGEND */}
      <div className="space-y-4 text-sm">
        {userActivityData.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ background: item.color }}
            />
            <div>
              <p>{item.name}</p>
              <p className="font-bold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* DONUT */}
      <div className="h-[200px] w-[200px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={userActivityData}
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              {userActivityData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  </div>

  {/* TOP STUDENT */}
  <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow border dark:border-gray-700 relative">

    <div className="flex justify-between mb-4">
      <h2 className="font-semibold dark:text-white">Top Student</h2>

      {/* 3 DOT MENU */}
      <div className="relative">
        <MoreVertical
          className="cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow rounded text-sm">
            <div className="px-3 py-2 hover:bg-gray-100">View</div>
            <div className="px-3 py-2 hover:bg-gray-100">Edit</div>
            <div className="px-3 py-2 hover:bg-gray-100 text-red-500">
              Delete
            </div>
          </div>
        )}
      </div>
    </div>

    {/* LIST */}
    {[
      { name: "Brooklyn Simmons", marks: 20 },
      { name: "Floyd Miles", marks: 35 },
      { name: "Courtney Henry", marks: 45 },
      { name: "Kathryn Murphy", marks: 65 },
      { name: "Annette Black", marks: 65 },
    ].map((s, i) => (
      <div key={i} className="flex justify-between items-center mb-4">

        <div className="flex items-center gap-3">
          <img
            src={`https://i.pravatar.cc/40?img=${i + 1}`}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">{s.name}</p>
            <p className="text-xs text-gray-500">Class</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm">Marks</p>
          <div className="w-10 h-10 rounded-full border-4 border-blue-500 flex items-center justify-center text-sm">
            {s.marks}
          </div>
        </div>

      </div>
    ))}
  </div>

{/* </div> */}
        {/* COURSE ACTIVITY */}
        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow border dark:border-gray-700 mt-6">

  <div className="flex justify-between mb-4">
    <h2 className="font-semibold dark:text-white">Course Activity</h2>

    <div className="relative">
  <button
    onClick={() => setCourseOpen(!courseOpen)}
    className="flex items-center gap-1 border px-3 py-1 rounded text-sm dark:text-white"
  >
    {courseFilter} <ChevronDown size={16} />
  </button>

  {courseOpen && (
    <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-[#1e293b] border rounded-md shadow z-50">
      {["Yearly", "Monthly", "Weekly", "Today"].map((item) => (
        <div
          key={item}
          onClick={() => {
            setCourseFilter(item);
            setCourseOpen(false);
          }}
          className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {item}
        </div>
      ))}
    </div>
  )}
</div>
  </div>

  <div className="flex gap-4 mb-3 text-sm">
    <p className="text-green-600">● Paid Course: 500</p>
    <p className="text-orange-500">● Free Course: 200</p>
  </div>

  <div className="h-[300px]">
    <ResponsiveContainer>
      <AreaChart data={courseActivityData}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

        <XAxis dataKey="name" />
        <YAxis />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="paid"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
        />

        <Area
          type="monotone"
          dataKey="free"
          stroke="#f97316"
          fill="#f97316"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>

</div>

      </div>

      {/* 🔥 TABLE */}
      <div className="bg-white dark:bg-[#1e293b] text-black dark:text-white p-4 rounded shadow border dark:border-gray-700">

        <h2 className="font-semibold mb-4">Recent Enrolled Courses</h2>

        {/* <Table> */}
        <Table className="text-black dark:text-gray-200">
          <TableHeader>
            <TableRow className="bg-gray-100 dark:bg-[#334155]">
              <TableHead>Invoice</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.course}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell>{row.payment}</TableCell>
                <TableCell>{row.date}</TableCell>

                {/* <TableCell className="flex gap-2">
                  <Eye className="text-blue-500 cursor-pointer" size={16} />
                  <Pencil className="text-green-500 cursor-pointer" size={16} />
                  <Trash2 className="text-red-500 cursor-pointer" size={16} />
                </TableCell> */}
                <TableCell className="flex gap-2">
                  <Eye className="text-blue-500 dark:text-blue-400 cursor-pointer" size={16} />
                  <Pencil className="text-green-500 dark:text-green-400 cursor-pointer" size={16} />
                  <Trash2 className="text-red-500 dark:text-red-400 cursor-pointer" size={16} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        {/* <Pagination className="mt-4"> */}
        <Pagination className="mt-4 text-black dark:text-white">
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious onClick={() => setPage(Math.max(1, page - 1))} />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={() => setPage(Math.min(totalPages, page + 1))} />
            </PaginationItem>

          </PaginationContent>
        </Pagination>

      </div>

    </div>
  );
}