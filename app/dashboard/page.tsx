export const dynamic = "force-dynamic";
export const revalidate = 0;

import { Navbar } from "../../components/navbar";
import { UploadForm } from "../../components/upload-form";
import { getJobs } from "../../lib/db";

export default function DashboardPage() {
  const jobs = getJobs();

  return (
    <>
      <Navbar />
      <main className="dashboard-wrap">
        <div className="container">
          <div className="page-head">
            <h1>Dashboard</h1>
            <p>
              Manage uploaded PDFs, create production jobs, and build the foundation
              of your print workflow platform.
            </p>
          </div>

          <div className="dashboard-grid">
            <UploadForm />
            <div className="card">
              <h2>Roadmap</h2>
              <ol className="roadmap">
                <li>Connect real file storage</li>
                <li>Add PDF engine processing service</li>
                <li>Generate downloadable output files</li>
                <li>Add authentication and companies</li>
                <li>Expand into quotes, jobs, and invoicing</li>
              </ol>
            </div>
          </div>

          <div className="card" style={{ marginTop: 20 }}>
            <h2>Recent Jobs</h2>
            {jobs.length === 0 ? (
              <p className="empty">No jobs uploaded yet.</p>
            ) : (
              <div className="table-wrap">
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
                        <td><span className="badge">{job.status}</span></td>
                        <td>{new Date(job.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
