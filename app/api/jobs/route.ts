import { NextResponse } from "next/server";
import { getJobs } from "../../../lib/db";

export async function GET() {
  const jobs = getJobs();

  return NextResponse.json({
    success: true,
    jobs
  });
}
