import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UICustomizationProvider } from "@/contexts/UICustomizationContext";

// PUBLIC
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import PublicCoursePage from "./components/homecomponents/PublicCoursePage";

// ADMIN
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminCourses from "@/pages/admin/Courses";
import Students from "@/pages/admin/Students";
import Materials from "@/pages/admin/Materials";
import AdminSettings from "@/pages/admin/Settings";

// USER
import UserDashboard from "@/pages/user/Dashboard";
import UserCourses from "@/pages/user/Courses";
import MyMaterials from "@/pages/user/MyMaterials";
import UserSettings from "@/pages/user/Settings";
import UserDevelopment from "@/pages/user/Development";

import NotFound from "@/pages/NotFound";
import CreateCourse from "@/pages/admin/CreateCourse";
import CourseDetails from "@/pages/admin/CourseDetails";
import UserCourseDetails from "@/pages/user/CourseViewPage";
import MainLayout from "./layouts/MainLayout";
import About from "@/pages/About";

const queryClient = new QueryClient();

// ✅ NEW CODE
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import { getUnifiedCourse } from "@/utils/courseLookup";
import HomeCoursesPage from "./components/homecomponents/HomeCoursesPage";
import CartPage from "./pages/CartPage";

const ProtectedRoute = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    const redirect = encodeURIComponent(`${location.pathname}${location.search}`);
    return <Navigate to={`/login?redirect=${redirect}`} />;
  }

  return user.role === "admin" ? <AdminLayout /> : <UserLayout />;
};

const AdminOnlyRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/dashboard" />;
  return children;
};

const RoleRoute = ({ adminElement, userElement }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;
  return user.role === "admin" ? adminElement : userElement;
};

const CourseGate = () => {
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  // allow public preview even if course doesn't exist yet
  const course = getUnifiedCourse(id);

  if (!user) {
    return (
      <MainLayout>
        <PublicCoursePage courseOverride={course} />
      </MainLayout>
    );
  }

  return <UserLayout><UserCourseDetails /></UserLayout>;
};

const PublicRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user?.role === "admin") {
    return <Navigate to="/dashboard" />;
  }

  return children;
};


const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <UICustomizationProvider>
          <TooltipProvider>
            <BrowserRouter>

              <Toaster />
              <Sonner />

              <Routes>

                {/* PUBLIC */}
                <Route path="/login" element={<Login />} />

                <Route element={<MainLayout />}>
                  {/* <Route path="/" element={<Home />} /> */}
                  {/* <Route path="/homecourses" element={<HomeCoursesPage />} /> */}
                  <Route
                      path="/"
                      element={
                        <PublicRoute>
                          <Home />
                        </PublicRoute>
                      }
                    />

                    <Route
                      path="/homecourses"
                      element={
                        <PublicRoute>
                          <HomeCoursesPage />
                        </PublicRoute>
                      }
                    />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<CartPage />} />
                </Route>

                {/* Course details (public preview OR full after login) */}
                <Route path="/courses/:id" element={<CourseGate />} />
                          
                {/* PROTECTED */}
                <Route element={<ProtectedRoute />}>

                  {/* DASHBOARD */}
                  <Route
                    path="/dashboard"
                    element={<RoleRoute adminElement={<AdminDashboard />} userElement={<UserDashboard />} />}
                  />

                  {/* COURSES */}
                  <Route
                    path="/courses"
                    element={<RoleRoute adminElement={<AdminCourses />} userElement={<UserCourses />} />}
                  />
                  <Route
                    path="/courses/create"
                    element={
                      <AdminOnlyRoute>
                        <CreateCourse />
                      </AdminOnlyRoute>
                    }
                  />
                  <Route path="/development" element={<UserDevelopment />} />
                  {/* <Route path="/wishlist" element={<WishlistPage />} /> */}
                  {/* <Route path="/cart" element={<CartPage />} /> */}
                  {/* <Route path="/my-learning" element={<MyLearningPage />} /> */}

                  {/* MATERIALS */}
                  <Route
                    path="/materials"
                    element={<RoleRoute adminElement={<Materials />} userElement={<MyMaterials />} />}
                  />

                  {/* SETTINGS */}
                  <Route
                    path="/settings"
                    element={<RoleRoute adminElement={<AdminSettings />} userElement={<UserSettings />} />}
                  />

                  {/* ADMIN ONLY */}
                  <Route
                    path="/students"
                    element={
                      <AdminOnlyRoute>
                        <Students />
                      </AdminOnlyRoute>
                    }
                  />
                  <Route
                    path="/admin/courses/:id"
                    element={
                      <AdminOnlyRoute>
                        <CourseDetails />
                      </AdminOnlyRoute>
                    }
                  />

                </Route>

                {/* NOT FOUND */}
                <Route path="*" element={<NotFound />} />

              </Routes>

            </BrowserRouter>
          </TooltipProvider>
        </UICustomizationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;






// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "@/contexts/ThemeContext";
// import { UICustomizationProvider } from "@/contexts/UICustomizationContext";

// import { AppSidebar } from "@/components/AppSidebar";
// import { TopHeader } from "@/components/TopHeader";

// // PUBLIC
// import Home from "@/pages/Home";
// import Login from "@/pages/Login";
// import PublicCoursePage from "./components/homecomponents/PublicCoursePage";

// // ADMIN
// import AdminDashboard from "@/pages/admin/Dashboard";
// import AdminCourses from "@/pages/admin/Courses";
// import Students from "@/pages/admin/Students";
// import Materials from "@/pages/admin/Materials";
// import Quiz from "@/pages/admin/Quiz";
// import AdminSettings from "@/pages/admin/Settings";

// // USER
// import UserDashboard from "@/pages/user/Dashboard";
// import UserCourses from "@/pages/user/Courses";
// import MyMaterials from "@/pages/user/MyMaterials";
// import UserSettings from "@/pages/user/Settings";

// import NotFound from "@/pages/NotFound";
// import CreateCourse from "@/pages/admin/CreateCourse";
// import CourseDetails from "@/pages/admin/CourseDetails";
// import UserCourseDetails from "@/pages/user/CourseViewPage";
// import MainLayout from "./layouts/MainLayout";

// const queryClient = new QueryClient();


// // ✅ LAYOUT
// const AppLayout = () => {
//   return (
//     <div className="flex h-screen w-full bg-background">

//       {/* SIDEBAR (FIXED) */}
//       <AppSidebar />

//       {/* RIGHT SIDE */}
//       <div className="flex-1 flex flex-col h-screen ml-[260px]">

//         {/* HEADER */}
//         <div className="fixed top-0 left-[260px] right-0 h-16 z-50 bg-white border-b shadow-sm">
//           <TopHeader />
//         </div>

//         {/* CONTENT */}
//         <main className="flex-1 overflow-y-auto p-4 pt-20">
//           <Outlet />
//         </main>

//       </div>
//     </div>
//   );
// };


// // ✅ PROTECTED ROUTE
// const ProtectedRoute = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   return user ? <AppLayout /> : <Navigate to="/login" />;
// };


// const App = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <QueryClientProvider client={queryClient}>
//       <ThemeProvider>
//         <UICustomizationProvider>
//           <TooltipProvider>
//             <BrowserRouter>

//               <Toaster />
//               <Sonner />

//               <Routes>

//                 {/* PUBLIC */}
//                 {/* <Route path="/" element={<Home />} /> */}
//                 <Route path="/login" element={<Login />} />
//                 {/* <Route path="/courses/:id" element={<PublicCoursePage />} /> */}
//                  <Route element={<MainLayout />}>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/courses/:id" element={<PublicCoursePage />} />
//                 </Route>
                          
//                 {/* PROTECTED */}
//                 <Route element={<ProtectedRoute />}>

//                   {/* DASHBOARD */}
//                   <Route
//                     path="/dashboard"
//                     element={
//                       user?.role === "admin"
//                         ? <AdminDashboard />
//                         : <UserDashboard />
//                     }
//                   />

//                   {/* COURSES */}
//                   <Route
//                     path="/courses"
//                     element={
//                       user?.role === "admin"
//                         ? <AdminCourses />
//                         : <UserCourses />
//                     }
//                   />
//                   {/* <Route
//                     path="/courses/:id"
//                     element={<CourseDetails />}
//                   /> */}
//                   <Route
//                     path="/courses/:id"
//                     element={
//                       user?.role === "admin"
//                         ? <CourseDetails />
//                         : <UserCourseDetails />
//                     }
//                   />
//                   <Route
//                     path="/courses/create"
//                     element={
//                       user?.role === "admin"
//                         ? <CreateCourse />
//                         : <UserCourses />
//                     }
//                   />

//                   {/* MATERIALS */}
//                   <Route
//                     path="/materials"
//                     element={
//                       user?.role === "admin"
//                         ? <Materials />
//                         : <MyMaterials />
//                     }
//                   />

//                   {/* SETTINGS */}
//                   <Route
//                     path="/settings"
//                     element={
//                       user?.role === "admin"
//                         ? <AdminSettings />
//                         : <UserSettings />
//                     }
//                   />

//                   {/* ADMIN ONLY */}
//                   <Route path="/students" element={<Students />} />
//                   <Route path="/quiz" element={<Quiz />} />

//                 </Route>

//                 {/* NOT FOUND */}
//                 <Route path="*" element={<NotFound />} />

//               </Routes>

//             </BrowserRouter>
//           </TooltipProvider>
//         </UICustomizationProvider>
//       </ThemeProvider>
//     </QueryClientProvider>
//   );
// };

// export default App;






