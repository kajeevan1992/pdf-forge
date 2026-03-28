import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "fs";
import path from "path";
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

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const safeName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  const filePath = path.join(uploadDir, safeName);
  fs.writeFileSync(filePath, buffer);

  const job = {
    id: makeJobId(),
    filename: safeName,
    original_name: file.name,
    preset,
    status: "Queued",
    created_at: new Date().toISOString()
  };

  insertJob(job);
  revalidatePath("/dashboard");

  return NextResponse.json({ success: true, job });
}
