"use client";
import { useState } from "react";
export function UploadForm() {
  const [msg,setMsg]=useState("");
  async function submit(fd:FormData){
    const r=await fetch("/api/upload",{method:"POST",body:fd});
    const d=await r.json();
    setMsg(JSON.stringify(d));
    location.reload();
  }
  return (
    <form action={submit}>
      <input name="file" type="file" required />
      <button>Upload</button>
      <div>{msg}</div>
    </form>
  );
}