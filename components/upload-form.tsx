"use client";

import { useState } from "react";

export function UploadForm() {
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setMessage("Uploading...");
    setIsUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { raw: text };
      }

      if (!res.ok) {
        setMessage(
          data.error ||
          data.detail ||
          data.raw ||
          `Upload failed with status ${res.status}`
        );
        return;
      }

      setMessage(
        `Saved job ${data.job.id} for ${data.job.original_name}${
          data.download_path ? ` | Ready: ${data.download_path}` : ""
        }`
      );

      window.location.reload();
    } catch (error: any) {
      setMessage(error?.message || "Network or server error");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form action={handleSubmit} className="card">
      <h2>Upload PDF</h2>
      <p>Send a file into your workflow and create a real tracked job.</p>

      <label className="label" htmlFor="file">PDF file</label>
      <input
        id="file"
        name="file"
        type="file"
        accept="application/pdf"
        className="file-input"
        required
      />

      <label className="label" htmlFor="preset">Processing preset</label>
      <select id="preset" name="preset" className="select" defaultValue="booklet">
        <option value="booklet">Booklet</option>
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
