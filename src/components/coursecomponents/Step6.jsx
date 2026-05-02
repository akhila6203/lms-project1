// import { useState, useEffect } from "react";

// export default function Step6({ onNext, data = {}, setStep }) {

//   const [status, setStatus] = useState("Draft");

//   useEffect(() => {
//     if (data?.status) {
//       setStatus(data.status);
//     }
//   }, [data]);

//   return (
//     <div className="max-w-5xl mx-auto space-y-6">

//       {/* HEADER */}
//       <div>
//         <h1 className="text-2xl font-semibold">Publish Course</h1>
//         <p className="text-gray-500 text-sm">
//           Choose how your course will be available to students.
//         </p>
//       </div>

//       {/* CARD */}
//       <div className="bg-white rounded-2xl shadow p-6 space-y-6">

//         {/* OPTIONS */}
//         <div className="space-y-4">

//           {/* DRAFT */}
//           <label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer">
//             <input
//               type="radio"
//               name="status"
//               value="Draft"
//               checked={status === "Draft"}
//               onChange={(e) => setStatus(e.target.value)}
//               className="mt-1 accent-blue-600"
//             />

//             <div>
//               <p className="font-medium">Save as Draft</p>
//               <p className="text-sm text-gray-500">
//                 Your course will not be visible to students. You can edit and publish later.
//               </p>
//             </div>
//           </label>

//           {/* PUBLISH */}
//           <label className="flex items-start gap-3 border rounded-lg p-4 cursor-pointer">
//             <input
//               type="radio"
//               name="status"
//               value="Active"
//               checked={status === "Active"}
//               onChange={(e) => setStatus(e.target.value)}
//               className="mt-1 accent-blue-600"
//             />

//             <div>
//               <p className="font-medium">Publish Course</p>
//               <p className="text-sm text-gray-500">
//                 Your course will be live and available for students to enroll.
//               </p>
//             </div>
//           </label>

//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="flex justify-between pt-4">

//           {/* PREVIOUS */}
//           <button
//             onClick={() => setStep((prev) => prev - 1)}
//             className="px-4 py-2 border rounded-lg"
//           >
//             Previous
//           </button>

//           {/* FINISH */}
//           <button
//             onClick={() => onNext({ status })}
//             className="px-6 py-2 bg-green-600 text-white rounded-lg"
//           >
//             Save & Finish
//           </button>

//         </div>

//       </div>

//       {/* hidden fallback */}
//       <button
//         id="nextBtn"
//         onClick={() => onNext({ status })}
//         className="hidden"
//       />

//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function Step6({ onNext, data = {}, setStep }) {

  const [status, setStatus] = useState("Draft");

  useEffect(() => {
    if (data?.status) setStatus(data.status);
  }, [data]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Publish Course</h1>
        <p className="text-gray-500 text-sm">
          Choose how your course will be available to students.
        </p>
      </div>

      {/* OPTIONS */}
      <div className="grid md:grid-cols-2 gap-5">

        {/* DRAFT */}
        <div
          onClick={() => setStatus("Draft")}
          className={`cursor-pointer border rounded-xl p-5 transition
          ${
            status === "Draft"
              ? "border-blue-600 bg-blue-50 shadow"
              : "hover:border-gray-300"
          }`}
        >
          <h3 className="font-medium">Save as Draft</h3>
          <p className="text-sm text-gray-500 mt-1">
            Not visible to students.
          </p>
        </div>

        {/* ACTIVE */}
        <div
          onClick={() => setStatus("Active")}
          className={`cursor-pointer border rounded-xl p-5 transition
          ${
            status === "Active"
              ? "border-green-600 bg-green-50 shadow"
              : "hover:border-gray-300"
          }`}
        >
          <h3 className="font-medium">Publish Course</h3>
          <p className="text-sm text-gray-500 mt-1">
            Visible to students.
          </p>
        </div>

      </div>

      {/* STATUS PREVIEW */}
      <div className="bg-white border rounded-xl p-4">
        <p className="text-sm text-gray-500">Current status</p>
        <p className="font-semibold mt-1">
          {status === "Active" ? "Published" : "Draft"}
        </p>
      </div>

      {/* BUTTONS */}
      <div className="flex justify-between">

        <button
          onClick={() => setStep((prev) => prev - 1)}
          className="px-4 py-2 border rounded-lg"
        >
          Previous
        </button>

        <button
          onClick={() => onNext({ status })}
          className="px-6 py-2 bg-green-600 text-white rounded-lg"
        >
          Save & Finish
        </button>

      </div>

    </div>
  );
}
