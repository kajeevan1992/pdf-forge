import { Navbar } from "../../../components/navbar";
import { ImposePreview } from "../../../components/impose-preview";
import { ImposeSettings } from "../../../components/impose-settings";
import { ImposeSidebar } from "../../../components/impose-sidebar";
import { ImposeToolbar } from "../../../components/impose-toolbar";
import { getJobs } from "../../../lib/db";

type ImposePageProps = {
  params: {
    jobId: string;
  };
};

export default function ImposePage({ params }: ImposePageProps) {
  const jobs = getJobs();
  const job = jobs.find((item) => item.id === params.jobId) ?? null;

  return (
    <>
      <Navbar />

      <main className="impose-wrap">
        <div className="container">
          <ImposeToolbar job={job} jobId={params.jobId} />

          {!job ? (
            <div className="impose-empty card">
              <h2>Job not found</h2>
              <p>
                We could not find this job in your local workspace yet. You can still
                explore the imposition interface and return to Dashboard when ready.
              </p>
            </div>
          ) : null}

          <div className="impose-layout">
            <ImposeSidebar />
            <ImposePreview job={job} />
            <ImposeSettings job={job} />
          </div>
        </div>
      </main>
    </>
  );
}
