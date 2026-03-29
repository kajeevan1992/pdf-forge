import type { JobRow } from "../lib/db";

type ImposeSettingsProps = {
  job: JobRow | null;
};

function formatDate(value?: string) {
  if (!value) {
    return "Not available";
  }

  return new Date(value).toLocaleString();
}

export function ImposeSettings({ job }: ImposeSettingsProps) {
  return (
    <aside className="impose-settings">
      <div className="impose-settings-card card">
        <h3>Job Details</h3>
        <dl className="summary-list">
          <div><dt>Original</dt><dd>{job?.original_name || "Waiting for source file"}</dd></div>
          <div><dt>Stored</dt><dd>{job?.filename || "No generated file yet"}</dd></div>
          <div><dt>Created</dt><dd>{formatDate(job?.created_at)}</dd></div>
          <div><dt>Status</dt><dd><span className="badge">{job?.status || "Draft"}</span></dd></div>
        </dl>
      </div>

      <div className="impose-settings-card card">
        <h3>Sheet Setup</h3>
        <label className="label" htmlFor="sheet-size">Sheet Size</label>
        <select id="sheet-size" className="select" defaultValue="A3">
          <option value="A3">A3</option>
          <option value="A4">A4</option>
          <option value="Tabloid">Tabloid</option>
        </select>

        <label className="label" htmlFor="orientation">Orientation</label>
        <select id="orientation" className="select" defaultValue="Landscape">
          <option value="Landscape">Landscape</option>
          <option value="Portrait">Portrait</option>
        </select>

        <label className="label" htmlFor="gutter">Gutter (mm)</label>
        <input id="gutter" className="select" type="number" defaultValue={4} />

        <label className="label" htmlFor="scale">Scale (%)</label>
        <input id="scale" className="select" type="number" defaultValue={100} />
      </div>

      <div className="impose-settings-card card">
        <h3>Output Info</h3>
        <div className="summary-row"><span>Active Preset</span><span className="impose-mode-chip">{job?.preset || "booklet"}</span></div>
        <div className="summary-row"><span>Sides</span><span>Duplex</span></div>
        <div className="summary-row"><span>Color</span><span>CMYK</span></div>
        <div className="summary-row"><span>Download URL</span><span>{job?.download_url ? "Available" : "Pending"}</span></div>
      </div>
    </aside>
  );
}
