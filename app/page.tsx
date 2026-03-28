import { Navbar } from "../../components/navbar";
import { UploadForm } from "../../components/upload-form";
import { getJobs } from "../../lib/db";

export default function DashboardPage() {
  const jobs = getJobs();

  return (
    <>
      <Navbar />

      <main className="container section">
        <h1>Dashboard</h1>
        <p style={{ color: "#c8d1e1", marginBottom: 24 }}>
          This is your starter control panel for PDF jobs.
        </p>

        <div className="dashboard-grid">
          <UploadForm />

          <div className="card">
            <h3>Roadmap</h3>
            <ul style={{ lineHeight: 1.8, paddingLeft: 18 }}>
              <li>Connect real storage</li>
              <li>Add auth and accounts</li>
              <li>Add worker-based PDF processing</li>
              <li>Generate downloadable output files</li>
              <li>Add presets and billing</li>
            </ul>
          </div>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <h3>Recent Jobs</h3>

          {jobs.length === 0 ? (
            <p style={{ color: "#c8d1e1" }}>No jobs uploaded yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Job ID</th>
                  <th>Original File</th>
                  <th>Stored File</th>
                  <th>Preset</th>
                  <th>Status</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.original_name}</td>
                    <td>{job.filename}</td>
                    <td>{job.preset}</td>
                    <td>
                      <span className="badge">{job.status}</span>
                    </td>
                    <td>{new Date(job.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  );
}
