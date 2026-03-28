import { NextResponse } from "next/server";
import { getJobs } from "../../../lib/db";

export async function GET() {
  return NextResponse.json({ success: true, jobs: getJobs() });
}
