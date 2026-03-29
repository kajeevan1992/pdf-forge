import Link from "next/link";
import type { JobRow } from "../lib/db";

type ImposeToolbarProps = {
  job: JobRow | null;
  jobId: string;
};

function formatPreset(preset: string | undefined) {
  if (!preset) {
    return "Booklet";
  }

  return preset
    .replaceAll("-", " ")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function ImposeToolbar({ job, jobId }: ImposeToolbarProps) {
  const title = job?.original_name || `Imposition Job ${jobId}`;
  const status = job?.status || "Draft";
  const preset = formatPreset(job?.preset);

  return (
    <header className="impose-topbar card">
      <div className="impose-topbar-main">
        <p className="impose-eyebrow">Imposition Workspace</p>
        <h1>{title}</h1>
        <div className="impose-meta-row">
          <span className="badge">{status}</span>
          <span className="impose-mode-chip">Preset: {preset}</span>
          <span className="impose-meta-muted">Job ID: {job?.id || jobId}</span>
        </div>
      </div>

      <div className="impose-topbar-actions">
        <button className="btn btn-secondary" type="button">Save Template</button>
        <button className="btn btn-secondary" type="button">Reprocess</button>
        <button className="btn btn-primary" type="button">Download Output</button>
        <Link className="btn btn-secondary" href="/dashboard">
          Back to Dashboard
        </Link>
      </div>
    </header>
  );
}
