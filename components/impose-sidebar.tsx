const tools = [
  { name: "Booklet", description: "Fold signatures for saddle-stitch output.", active: true },
  { name: "Numbering", description: "Add sequential folios or control marks.", active: true },
  { name: "Watermark", description: "Overlay diagonal or centered stamp text.", active: true },
  { name: "2-up", description: "Place two logical pages on one sheet.", active: true },
  { name: "4-up", description: "Compact four pages per side.", active: true },
  { name: "Rotate", description: "Adjust orientation for press direction.", active: true },
  { name: "Marks", description: "Trim, fold, and registration mark tools.", active: false },
  { name: "Creep", description: "Compensate page drift in thick booklets.", active: false },
];

export function ImposeSidebar() {
  return (
    <aside className="impose-sidebar card">
      <div className="impose-section-title">
        <h2>Tools</h2>
        <p>Choose an imposition mode.</p>
      </div>

      <ul className="impose-tool-list">
        {tools.map((tool) => (
          <li key={tool.name}>
            <button
              type="button"
              className={`impose-tool-btn${tool.active ? "" : " is-disabled"}`}
              disabled={!tool.active}
              aria-disabled={!tool.active}
            >
              <span>
                <strong>{tool.name}</strong>
                <small>{tool.description}</small>
              </span>
              {!tool.active ? <em className="soon-badge">Soon</em> : null}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
