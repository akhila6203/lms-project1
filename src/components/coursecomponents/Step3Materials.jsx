import { useState, useEffect } from "react";

// export default function Step3({ onNext, data = {}, setStep })
 export default function Step3({ onNext, data = {}, setStep, isModal = false }){

  const [form, setForm] = useState({
    title: "",
    type: "PDF",
    file: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const existing = data?.materials || [];
    setMaterials(existing);
    if (existing.length > 0) {
      setForm(existing[0]);
    }
  }, [data]);

  // FILE SELECT
  const handleFile = (file) => {
  if (file) {
    const fileURL = URL.createObjectURL(file);

    setForm({
      ...form,
      file,
      url: fileURL, // ✅ ADD THIS
    });
  }
};

  // DRAG DROP
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const addCurrentMaterial = () => {
    if (!form.title?.trim()) return;
    setMaterials((prev) => [...prev, { ...form, createdAt: new Date() }]);
    setForm({ title: "", type: "PDF", file: null, url: "" });
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Add material</h1>
        <p className="text-gray-500 text-sm">
          Upload a document for students to reference.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-5">

        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">Title</label>
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g. Chapter 1 reading"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="text-sm font-medium">Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
            className="w-full mt-1 border rounded-lg px-4 py-2"
          >
            <option value="">Select type</option>
            <option>PDF</option>
            <option>DOC</option>
            <option>DOCX</option>
            <option>PPT</option>
            <option>PPTX</option>
            <option>Image</option>
            <option>ZIP</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addCurrentMaterial}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            + Add material to list
          </button>
        </div>

        {materials.length > 0 && (
          <div className="space-y-2 rounded-lg border p-3">
            <p className="text-sm font-medium">Added materials</p>
            {materials.map((m, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span>{m.title || `Material ${idx + 1}`} ({m.type || "FILE"})</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setMaterials((prev) => prev.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* UPLOAD BOX */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Upload File
          </label>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition
              ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            `}
          >
            <input
              type="file"
              className="hidden"
              id="materialUpload"
              onChange={(e) =>
                handleFile(e.target.files[0])
              }
            />

            <label htmlFor="materialUpload" className="cursor-pointer">
              <div className="text-gray-500">
                ⬆️ Drop file or click to upload
              </div>
            </label>

            {/* FILE NAME */}
            {form.file && (
              <p className="mt-3 text-sm text-green-600">
                ✅ {form.file.name}
              </p>
            )}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">

  {isModal ? (
    <>
      <button
        onClick={() =>
          onNext({
            materials:
              materials.length > 0
                ? materials
                : form.title?.trim()
                ? [{ ...form, createdAt: new Date() }]
                : data?.materials || [],
          })
        }
        className="px-6 py-2 bg-purple-600 text-white rounded-lg"
      >
        Add
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
        onClick={() =>
          onNext({
            materials:
              materials.length > 0
                ? materials
                : form.title?.trim()
                ? [{ ...form, createdAt: new Date() }]
                : data?.materials || [],
          })
        }
        className="px-6 py-2 bg-blue-600 text-white rounded-lg"
      >
        Save & Next
      </button>
    </>
  )}

</div>
       

      </div>

      {/* hidden fallback */}
      <button
        id="nextBtn"
        onClick={() =>
          onNext({
            materials:
              materials.length > 0
                ? materials
                : form.title?.trim()
                ? [{ ...form, createdAt: new Date() }]
                : data?.materials || [],
          })
        }
        className="hidden"
      />

    </div>
  );
}


// import { useState, useEffect } from "react";

// export default function Step3({ onNext, data = {} }) {

//   const [materials, setMaterials] = useState([]);

//   useEffect(() => {
//     if (data?.materials) {
//       setMaterials(data.materials);
//     }
//   }, [data]);

//   const handleUpload = (e) => {
//     const files = Array.from(e.target.files).map((f) => ({
//       name: f.name,
//       file: f,
//     }));
//     setMaterials(files);
//   };

//   return (
//     <div className="space-y-3">

//       <label className="text-sm font-medium">
//         Upload Materials
//       </label>

//       <input type="file" multiple onChange={handleUpload} />

//       {/* ✅ AUTO SHOW */}
//       {materials.map((m, i) => (
//         <p key={i}>
//           📄 {typeof m === "string" ? m : m.name}
//         </p>
//       ))}

//       <button
//         id="nextBtn"
//         onClick={() => onNext({ materials })}
//         className="hidden"
//       />

//     </div>
//   );
// }
