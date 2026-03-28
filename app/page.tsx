import Link from "next/link";
import { Navbar } from "../components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero container">
          <h1>Build your own PDF production SaaS</h1>
          <p>
            Start with upload, job tracking, and processing presets. Then grow into
            imposition, booklet workflows, numbering, watermarking, and print automation.
          </p>
          <div className="cta-row">
            <Link href="/dashboard" className="btn btn-primary">
              Open Dashboard
            </Link>
            <a href="#features" className="btn btn-secondary">
              View Features
            </a>
          </div>
        </section>

        <section id="features" className="section container">
          <div className="grid grid-3">
            <div className="card">
              <h3>PDF Upload</h3>
              <p>Upload PDFs and prepare them for processing jobs.</p>
            </div>
            <div className="card">
              <h3>Production Presets</h3>
              <p>Start with booklet, 4-up, 8-up, numbering, and watermark flows.</p>
            </div>
            <div className="card">
              <h3>Job Tracking</h3>
              <p>Show queue, processing state, and completed output history.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}