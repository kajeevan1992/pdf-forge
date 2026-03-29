import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { insertJob } from "../../../lib/db";

export const dynamic = "force-dynamic";

function makeJobId() {
  return `JOB-${Date.now()}`;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const preset = formData.get("preset")?.toString() || "booklet";

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json({ error: "Only PDF files are allowed" }, { status: 400 });
  }

  const engineUrl = process.env.PDF_ENGINE_URL;

  if (!engineUrl) {
    return NextResponse.json(
      { error: "PDF_ENGINE_URL is not configured" },
      { status: 500 }
    );
  }

  const engineForm = new FormData();
  engineForm.append("file", file);
  engineForm.append("mode", preset === "watermark" ? "watermark" : preset === "numbering" ? "numbering" : "booklet");

  if (preset === "watermark") {
    engineForm.append("watermark_text", "SAMPLE");
  }

  if (preset === "numbering") {
    engineForm.append("number_position", "bottom-center");
  }

  const engineResponse = await fetch(`${engineUrl}/process`, {
    method: "POST",
    body: engineForm
  });

  const engineData = await engineResponse.json();

  if (!engineResponse.ok) {
    return NextResponse.json(
      { error: engineData.detail || engineData.error || "Engine processing failed" },
      { status: 500 }
    );
  }

  const job = {
    id: makeJobId(),
    filename: engineData.output_filename,
    original_name: engineData.original_filename,
    preset,
    status: "Complete",
    created_at: new Date().toISOString()
  };

  insertJob(job);
  revalidatePath("/dashboard");

  return NextResponse.json({
    success: true,
    job,
    download_path: `${engineUrl}${engineData.download_path}`
  });
}
