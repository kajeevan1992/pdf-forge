import { NextResponse } from "next/server";
import { insertJob } from "../../../lib/db";
export const dynamic="force-dynamic";
export async function POST(req:Request){
  const fd=await req.formData();
  const file=fd.get("file") as File;
  const name=file.name;
  insertJob({id:Date.now().toString(),filename:name});
  return NextResponse.json({ok:true,name});
}