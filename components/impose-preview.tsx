import type { JobRow } from "../lib/db";

type ImposePreviewProps = {
  job: JobRow | null;
};

function normalizePreset(preset?: string) {
  const value = preset?.toLowerCase();

  if (value?.includes("number")) {
    return "numbering";
  }

  if (value?.includes("water")) {
    return "watermark";
  }

  return "booklet";
}

export function ImposePreview({ job }: ImposePreviewProps) {
  const preset = normalizePreset(job?.preset);

  return (
    <section className="impose-preview card">
      <div className="impose-preview-head">
        <div>
          <p className="impose-eyebrow">Sheet 1</p>
          <h2>Preview Mode</h2>
        </div>
        <div className="impose-summary-chip">Output Summary · {preset}</div>
      </div>

      <div className="impose-canvas">
        {preset === "booklet" ? (
          <div className="sheet spread-preview">
            <div className="page-box">
              <span className="page-label">Left Panel</span>
              <strong>Page 16</strong>
            </div>
            <div className="page-box">
              <span className="page-label">Right Panel</span>
              <strong>Page 1</strong>
            </div>
          </div>
        ) : null}

        {preset === "numbering" ? (
          <div className="sheet single-preview">
            <div className="page-box page-overlay-demo">
              <span className="overlay-number">#001</span>
              <strong>Numbered Sheet</strong>
              <p>Bottom-right folio mark preview.</p>
            </div>
          </div>
        ) : null}

        {preset === "watermark" ? (
          <div className="sheet single-preview">
            <div className="page-box watermark-demo">
              <span className="watermark-text">PROOF</span>
              <strong>Watermark Preview</strong>
              <p>Diagonal stamp at 24% opacity.</p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
