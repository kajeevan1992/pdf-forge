import Link from "next/link";
import { Navbar } from "../components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="pill-row">
                <span className="pill">Imposition SaaS</span>
                <span className="pill">Adobe workflow ready</span>
                <span className="pill">Built for print businesses</span>
              </div>
              <h1>Build your own PDF production platform.</h1>
              <p>
                Start with uploads, real job tracking, and PDF workflow controls.
                Then expand into imposition, booklet processing, numbering,
                watermarking, plugins, and full print operations.
              </p>
              <div className="cta-row">
                <Link href="/dashboard" className="btn btn-primary">Open Dashboard</Link>
                <a href="#features" className="btn btn-secondary">View Features</a>
              </div>
            </div>
            <div className="hero-card">
              <div className="hero-mock">
                <div className="mock-bar" />
                <div className="mock-panel">
                  <div className="mock-grid">
                    <div className="mock-box"><strong>Uploads</strong><p>Real jobs, real PDF workflow.</p></div>
                    <div className="mock-box"><strong>Presets</strong><p>Booklet, 4-up, numbering, watermark.</p></div>
                    <div className="mock-box"><strong>Production</strong><p>From storefront to prepress and output.</p></div>
                    <div className="mock-box"><strong>Future Suite</strong><p>Quotes, jobs, invoicing, supplier sync.</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="container">
            <h2 className="section-title">Your print software foundation</h2>
            <p className="section-copy">
              This starter gives you the clean structure for a larger modular SaaS brand:
              front-end apps, processing services, and future print business tools.
            </p>
            <div className="grid grid-3">
              <div className="card">
                <div className="metric">01</div>
                <h3>Real job uploads</h3>
                <p>Upload PDFs and turn them into tracked jobs in a live dashboard.</p>
              </div>
              <div className="card">
                <div className="metric">02</div>
                <h3>Workflow presets</h3>
                <p>Prepare for booklet, 4-up, numbering, watermarking, and more.</p>
              </div>
              <div className="card">
                <div className="metric">03</div>
                <h3>Modular platform</h3>
                <p>Grow this into quotes, job management, invoicing, and supplier APIs.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="footer">PDF Forge starter — your print workflow SaaS foundation.</div>
      </main>
    </>
  );
}
