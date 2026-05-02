import { useState, useEffect } from "react";

// export default function Step2({ onNext, data = {}, setStep }) 
export default function Step2({ onNext, data, setStep, isModal = false }){
  const [form, setForm] = useState({
    title: "",
    url: "",
    duration: "",
    file: null,
  });

  const [dragActive, setDragActive] = useState(false);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const existing = data?.videos || [];
    setVideos(existing);
    if (existing.length > 0) {
      setForm(existing[0]);
    }
  }, [data]);

  // ✅ HANDLE FILE SELECT
  // const handleFile = (file) => {
  //   setForm({ ...form, file });
  // };
  const handleFile = (file) => {
  if (file) {
    const videoURL = URL.createObjectURL(file);

    setForm({
      ...form,
      file,
      url: videoURL, // ✅ ADD THIS LINE
    });
  }
};

  // ✅ DRAG EVENTS
  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const addCurrentVideo = () => {
    if (!form.title?.trim() || !form.url?.trim()) return;
    setVideos((prev) => [
      ...prev,
      {
        ...form,
        createdAt: new Date(),
        views: form.views || 0,
      },
    ]);
    setForm({ title: "", url: "", duration: "", file: null });
  };

  return (
    <div className="max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Add video</h1>
        <p className="text-gray-500 text-sm">
          Upload a lesson video or paste a link.
        </p>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-2">

        {/* TITLE */}
        <div>
          <label className="text-sm font-medium">Video title</label>
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            placeholder="e.g. Introduction to Hooks"
            className="w-full mt-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* URL */}
        <div>
          <label className="text-sm font-medium">Video URL</label>
          <input
            value={form.url}
            onChange={(e) =>
              setForm({ ...form, url: e.target.value })
            }
            placeholder="https://..."
            className="w-full mt-1 border rounded-lg px-4 py-2"
          />
        </div>

        {/* DURATION */}
        <div>
          <label className="text-sm font-medium">Duration</label>
          <input
            value={form.duration}
            onChange={(e) =>
              setForm({ ...form, duration: e.target.value })
            }
            placeholder="e.g. 12:30"
            className="w-full mt-1 border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={addCurrentVideo}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            + Add video to list
          </button>
        </div>

        {videos.length > 0 && (
          <div className="space-y-2 rounded-lg border p-3">
            <p className="text-sm font-medium">Added videos</p>
            {videos.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span>{v.title || `Video ${idx + 1}`}</span>
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => setVideos((prev) => prev.filter((_, i) => i !== idx))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 🔥 DRAG & DROP UPLOAD BOX */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Upload Video
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
              accept="video/*"
              onChange={(e) => handleFile(e.target.files[0])}
              className="hidden"
              id="videoUpload"
            />

            <label htmlFor="videoUpload" className="cursor-pointer">
              <div className="text-gray-500">
                ⬆️ Click to upload or drag video here
              </div>
            </label>

            {/* PREVIEW */}
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
        // onClick={() => onNext({ videos: [form] })}
        onClick={() =>
  onNext({
    videos:
      videos.length > 0
        ? videos
        : form.title?.trim() && form.url?.trim()
        ? [{ ...form, createdAt: new Date(), views: 0 }]
        : data?.videos || [],
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
        // onClick={() => onNext({ videos: [form] })}
        onClick={() =>
  onNext({
    videos:
      videos.length > 0
        ? videos
        : form.title?.trim() && form.url?.trim()
        ? [{ ...form, createdAt: new Date(), views: 0 }]
        : data?.videos || [],
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
        // onClick={() => onNext({ videos: [form] })}
        onClick={() =>
  onNext({
    videos:
      videos.length > 0
        ? videos
        : form.title?.trim() && form.url?.trim()
        ? [{ ...form, createdAt: new Date(), views: 0 }]
        : data?.videos || [],
  })
}
        className="hidden"
      />

    </div>
  );
}

