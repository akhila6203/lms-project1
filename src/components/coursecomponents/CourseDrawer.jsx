import { useState, useEffect } from "react";
import Step1 from "./Step1BasicInfo";
import Step2 from "./Step2Videos";
import Step3 from "./Step3Materials";
import Step4 from "./Step4Quiz";
import Step5 from "./Step5Preview";
import Step6 from "./Step6";
import { getCourses } from "../../utils/storage";

export default function CourseDrawer({ step, setStep, onClose,onNext, data ,
  initialData = {}, }) {

  // const [courseData, setCourseData] = useState({});
  const [courseData, setCourseData] = useState(initialData || {});
  const DRAFT_KEY = "course_draft";

//   const handleSave = () => {
//   const existing = JSON.parse(localStorage.getItem("courses")) || [];

//   let updatedCourses;

//   if (courseData.id) {
//     updatedCourses = existing.map((c) =>
//       c.id === courseData.id ? courseData : c
//     );
//   } else {
//     updatedCourses = [
//       ...existing,
//       { id: Date.now(), ...courseData, students: 0 },
//     ];
//   }

//   localStorage.setItem("courses", JSON.stringify(updatedCourses));

//   alert("Course Saved Successfully ✅");
// };

const renderStep = () => {
  switch (step) {
    case 1:
      return <Step1 onNext={handleNext} data={courseData} setStep={setStep} />;
    case 2:
      // return <Step2 onNext={handleNext} data={courseData} />;
      return <Step2 onNext={handleNext} data={courseData} setStep={setStep}  />;
    case 3:
      return <Step3 onNext={handleNext} data={courseData} setStep={setStep} />;
    case 4:
      return <Step4 onNext={handleNext} data={courseData} setStep={setStep} />;
    case 5:
      return <Step5 data={courseData} onNext={handleNext} setStep={setStep} />;
    case 6:
      return <Step6 onNext={handleNext} data={courseData} setStep={setStep} />;
    default:
      return null;
  }
};

  const [form, setForm] = useState({
    title: data?.title || "",
    category: data?.category || "",
    instructor: data?.instructor || "",
    level: data?.level || "Beginner",
    description: data?.description || "",
    status: data?.status || "Pending",
  });

    useEffect(() => {
      const savedDraft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "null");
      if (savedDraft && Object.keys(savedDraft).length > 0) {
        setCourseData(savedDraft);
      } else {
        setCourseData(initialData || {});
      }
    }, [initialData]);


const handleNext = (stepData) => {
  const mergedVideos =
    stepData.videos !== undefined
      ? stepData.videos
      : courseData.videos || [];
  const mergedMaterials =
    stepData.materials !== undefined
      ? stepData.materials
      : courseData.materials || [];
  const mergedQuizzes =
    stepData.quizzes !== undefined
      ? stepData.quizzes
      : courseData.quizzes || [];

  const updated = {
    ...courseData,
    ...stepData,

    // ✅ THUMBNAIL SAFE
    thumbnail:
      stepData.thumbnail !== undefined
        ? stepData.thumbnail
        : courseData.thumbnail,

    // ✅ QUIZ SAFE (VERY IMPORTANT)
    videos: mergedVideos,
    materials: mergedMaterials,
    quizzes: mergedQuizzes,
  };

  setCourseData(updated);
  localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));

  // 👉 SAVE STEP
  if (step === 6) {
    const existing = JSON.parse(localStorage.getItem("courses")) || [];

    const newCourse = {
      ...updated,
      id: updated.id || Date.now(),

      // safety
      videos: updated.videos || [],
      materials: updated.materials || [],
      quizzes: updated.quizzes || [],
    };

    const updatedCourses = updated.id
      ? existing.map((c) => (c.id === updated.id ? newCourse : c))
      : [newCourse, ...existing];

    try {
      localStorage.setItem("courses", JSON.stringify(updatedCourses));
    } catch (e) {
      alert("Storage full ⚠️");
      console.error(e);
    }

    alert("Course Saved ✅");
    localStorage.removeItem(DRAFT_KEY);
    window.location.href = "/courses";
    return;
  }

  setStep((prev) => prev + 1);
};
// const handleNext = (stepData) => {
//   // const updated = { ...courseData, ...stepData };
//   const updated = {
//   ...courseData,
//   ...stepData,
//   quizzes: [
//     ...(courseData.quizzes || []),
//     ...(stepData.quizzes || []),
//   ],
//    thumbnail:
//       stepData.thumbnail !== undefined
//         ? stepData.thumbnail
//         : courseData.thumbnail,
// };

//   setCourseData(updated);

//   if (step === 6) {
//     const existing = JSON.parse(localStorage.getItem("courses")) || [];

    
//     // const newCourse = {
//     //   id: updated.id || Date.now(),

//     //   // 🔥 IMPORTANT FIELDS
//     //   title: updated.title || "Untitled",
//     //   category: updated.category || "Development",
//     //   instructor: updated.instructor || "Instructor",
//     //   level: updated.level || "Beginner",
//     //   description: updated.description || "",
//     //   status: updated.status || "Draft",

//     //   // 🔥 IMAGE FIX
//     //   thumbnail: updated.thumbnail || "",

//     //   // 🔥 OTHER DATA
      
//     //   videos: updated.videos?.slice(0, 3) || [],
//     //   materials: updated.materials?.slice(0, 3) || [],
//     //   quizzes: updated.quizzes?.slice(0, 3) || [],
//     //   students: updated.students || 0,
//     // };

//     const updatedCourses = updated.id
//       ? existing.map((c) => (c.id === updated.id ? newCourse : c))
//       : [newCourse, ...existing];

//     // localStorage.setItem("courses", JSON.stringify(updatedCourses));
//     try {
//       localStorage.setItem("courses", JSON.stringify(updatedCourses));
//     } catch (e) {
//       alert("Storage full ⚠️ Please reduce image size");
//       console.error(e);
//     }

//     alert("Course Saved ✅");

//     window.location.href = "/courses";
//     return;
//   }

//   setStep((prev) => prev + 1);
// };


  return (
    // <div className="fixed right-0 top-0 w-[500px] h-screen bg-white shadow-2xl z-50 flex flex-col">
    <div className="flex flex-col">

      {/* BODY */}
      <div className="p-6 flex-1 overflow-y-auto">
        {renderStep()}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center p-5">

        {/* BACK */}
        <div className="flex justify-end gap-3">

</div>

       
      </div>

    </div>
  );
}
