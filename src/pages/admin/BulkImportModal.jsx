import { useState } from "react";

export default function BulkImportModal({ onClose, onImport }) {
  const [file, setFile] = useState(null);

  const handleFile = (f) => {
    setFile(f);
  };

  const handleImport = () => {
    if (!file) return;

    // 🔥 MOCK IMPORT
    const newStudents = [
      {
        id: Date.now(),
        name: "Imported User",
        email: "import@example.com",
        enrolled: 0,
        completed: 0,
        progress: 0,
        joined: new Date().toDateString(),
        status: "Active",
      },
    ];

    onImport(newStudents);
    onClose();
  };

  const downloadTemplate = () => {
    const csv = "name,email\nJohn Doe,john@example.com";
    const blob = new Blob([csv], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "template.csv";
    a.click();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
        
      <div className="bg-white w-full max-w-2xl rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-2">
          Bulk import students
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          Upload CSV or Excel with name and email
        </p>

        {/* DROP AREA */}
        <div className="border-2 border-dashed p-10 text-center rounded-xl">
          <input
            type="file"
            className="hidden"
            id="file"
            onChange={(e) => handleFile(e.target.files[0])}
          />

          <label htmlFor="file" className="cursor-pointer">
            Drop file or click to upload
          </label>

          {file && (
            <p className="text-green-600 mt-2">{file.name}</p>
          )}
        </div>

        {/* TEMPLATE */}
        <div className="flex justify-between mt-4 text-gray-600 border-2 p-4 text-center rounded-xl ">
          <span className="text-sm">Need template?</span>
          <button
            onClick={downloadTemplate}
            className="text-blue-600 text-sm"
          >
            Download template
          </button>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleImport}
            className="bg-purple-600 text-white px-4 py-2 rounded"
          >
            Import
          </button>
        </div>

      </div>
    </div>
  );
}