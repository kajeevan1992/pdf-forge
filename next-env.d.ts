export const dynamic="force-dynamic";
import { getJobs } from "../../lib/db";
import { UploadForm } from "../../components/upload-form";
export default function Page(){
  const jobs=getJobs();
  return (
    <div>
      <h1>Dashboard</h1>
      <UploadForm/>
      <pre>{JSON.stringify(jobs,null,2)}</pre>
    </div>
  );
}