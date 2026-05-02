import { useState, useEffect } from "react";

// export default function Step1({ onNext, data = {} })
export default function Step1({ onNext, data = {}, isModal = false }) {
  const [form, setForm] = useState({
    title: "",
    category: "",
    subject: "",
    instructor: "",
    level: "Beginner",
    description: "",
    status: "Pending",
    students: 0, 
    thumbnail: null,
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: data.title || "",
        category: data.category || "",
        subject: data.subject || "",
        instructor: data.instructor || "",
        level: data.level || "Beginner",
        description: data.description || "",
        status: data.status || "Pending",
        students: data.students || 0,
        thumbnail: data.thumbnail || null,
      });
    }
  }, [data]);

  return (
    <div className="max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Create a new course
        </h1>
        <p className="text-gray-500 text-sm">
          Start with the basics. You can add materials, videos, and quizzes after.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-6">

        {/* TITLE */}
        <div>
          <h2 className="font-semibold text-lg">Course details</h2>
          <p className="text-sm text-gray-500">
            Information shown to students browsing your catalog.
          </p>
        </div>

        {/* COURSE TITLE */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Course title
          </label>
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g. Advanced React Patterns"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="What will students learn?"
            className="w-full border rounded-lg px-4 py-3 h-28 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* GRID 2 COL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <input
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              placeholder="Select a category"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          {/* LEVEL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Difficulty level
            </label>
            <select
              value={form.level}
              onChange={(e) =>
                setForm({ ...form, level: e.target.value })
              }
              className="w-full border rounded-lg px-4 py-2"
            >
              <option>Choose level</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>


        </div>
        

       

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  {/* STUDENTS */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Students
    </label>
    <input
      type="number"
      value={form.students}
      onChange={(e) =>
        setForm({ ...form, students: Number(e.target.value) })
      }
      className="w-full border rounded-lg px-4 py-2"
      placeholder="0"
    />
  </div>

  {/* STATUS RADIO */}
  <div>
    <label className="block text-sm font-medium mb-2">
      Status
    </label>

    <div className="flex gap-4">

      {["Active", "Pending", "Blocked"].map((s) => (
        <label key={s} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="status"
            value={s}
            checked={form.status === s}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
            className="accent-blue-600"
          />
          {s}
        </label>
      ))}

    </div>
  </div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* INSTRUCTOR */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Instructor
            </label>
            <input
              value={form.instructor}
              onChange={(e) =>
                setForm({ ...form, instructor: e.target.value })
              }
              placeholder="Full name"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

           {/* THUMBNAIL */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Course Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            // onChange={(e) =>
            //   setForm({ ...form, thumbnail: e.target.files[0] })
            // }
            onChange={(e) => {
              const file = e.target.files[0];

if (file) {
  const reader = new FileReader();

  reader.onloadend = () => {
    const img = new Image();
    img.src = reader.result;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // ✅ FIX IMAGE SIZE (NO BLUR)
      const MAX_WIDTH = 1000; // 🔥 increase quality

      const scale = MAX_WIDTH / img.width;

      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // ✅ HIGH QUALITY IMAGE
      const compressed = canvas.toDataURL("image/jpeg", 0.9);

      // ✅ SAVE INTO FORM
      setForm({
        ...form,
        thumbnail: compressed,
      });
    };
  };

  reader.readAsDataURL(file);
}
}}
            className="w-full border rounded-lg px-3 py-2"
          />

          {form.thumbnail && (
            <img
              src={
                form.thumbnail instanceof File
                  ? URL.createObjectURL(form.thumbnail)
                  : form.thumbnail
              }
              className="w-40 h-24 object-cover rounded mt-3"
            />
          )}
        </div>
      </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">

  {isModal ? (
    <>
      <button
        onClick={() => onNext(form)}
        className="px-6 py-2 bg-purple-600 text-white rounded-lg"
      >
        Update
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => setStep((prev) => prev - 1)}
        className="px-4 py-2 border rounded-lg"
      >
        Previous
      </button>

      <button
        onClick={() => onNext(form)}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save & Next
      </button>
    </>
  )}

</div>
        

      </div>

      {/* hidden trigger (keep for compatibility) */}
      <button id="nextBtn" onClick={() => onNext(form)} className="hidden" />

    </div>
  );
}