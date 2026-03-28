import { Navbar } from "../../components/navbar";
import { UploadForm } from "../../components/upload-form";
import { demoJobs } from "../../lib/jobs";

export default function DashboardPage() {
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
          <table className="table">
            <thead>
              <tr>
                <th>Job ID</th>
                <th>File</th>
                <th>Preset</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {demoJobs.map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.filename}</td>
                  <td>{job.type}</td>
                  <td><span className="badge">{job.status}</span></td>
                  <td>{job.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}