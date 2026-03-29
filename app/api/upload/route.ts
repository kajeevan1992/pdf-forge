import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { insertJob } from "../../../lib/db";

export const dynamic = "force-dynamic";

function makeJobId() {
  return `JOB-${Date.now()}`;
}

function mapPresetToMode(preset: string) {
  if (preset === "watermark") return "watermark";
  if (preset === "numbering") return "numbering";
  return "booklet";
}

export async function POST(request: Request) {
  try {
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
        { error: "PDF_ENGINE_URL is not configured in pdf-forge" },
        { status: 500 }
      );
    }

    const engineForm = new FormData();
    engineForm.append("file", file);
    engineForm.append("mode", mapPresetToMode(preset));

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

    const rawText = await engineResponse.text();

    let engineData: any = {};
    try {
      engineData = JSON.parse(rawText);
    } catch {
      engineData = { raw: rawText };
    }

    if (!engineResponse.ok) {
      return NextResponse.json(
        {
          error:
            engineData.error ||
            engineData.detail ||
            engineData.raw ||
            `pdf-engine failed with status ${engineResponse.status}`
        },
        { status: 500 }
      );
    }

    const job = {
      id: makeJobId(),
      filename: engineData.output_filename || "unknown.pdf",
      original_name: engineData.original_filename || file.name,
      preset,
      status: "Complete",
      created_at: new Date().toISOString()
    };

    insertJob(job);
    revalidatePath("/dashboard");

    return NextResponse.json({
      success: true,
      job,
      download_path: engineData.download_path
        ? `${engineUrl}${engineData.download_path}`
        : null
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Unexpected server error in pdf-forge upload route" },
      { status: 500 }
    );
  }
}
