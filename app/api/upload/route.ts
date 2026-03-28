import { NextResponse } from "next/server";

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

  return NextResponse.json({
    success: true,
    filename: file.name,
    size: file.size,
    preset,
    status: "Queued"
  });
}