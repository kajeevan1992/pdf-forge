"use client";

import { useState } from "react";

export function UploadForm() {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsUploading(true);
    setMessage("Uploading...");

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Upload failed");
        setIsUploading(false);
        return;
      }

      setMessage(`Saved job ${data.job.id} for ${data.job.original_name}`);
      window.location.reload();
    } catch {
      setMessage("Something went wrong");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={handleSubmit} className="card">
      <h3>Upload PDF</h3>

      <label className="label" htmlFor="file">
        PDF file
      </label>
      <input
        id="file"
        name="file"
        type="file"
        accept="application/pdf"
        className="file-input"
        required
      />

      <label className="label" htmlFor="preset">
        Processing preset
      </label>
      <select id="preset" name="preset" className="select" defaultValue="booklet">
        <option value="booklet">Booklet</option>
        <option value="4-up">4-up Imposition</option>
        <option value="8-up">8-up Imposition</option>
        <option value="numbering">Numbering / Bates</option>
        <option value="watermark">Watermark</option>
      </select>

      <button type="submit" className="btn btn-primary" disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Job"}
      </button>

      {message ? <div className="notice">{message}</div> : null}
    </form>
  );
}
