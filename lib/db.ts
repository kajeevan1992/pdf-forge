import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    preset TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    download_url TEXT
  )
`);

const columns = db.prepare(`PRAGMA table_info(jobs)`).all() as Array<{ name: string }>;
const hasDownloadUrl = columns.some((c) => c.name === "download_url");

if (!hasDownloadUrl) {
  db.exec(`ALTER TABLE jobs ADD COLUMN download_url TEXT`);
}

export type JobRow = {
  id: string;
  filename: string;
  original_name: string;
  preset: string;
  status: string;
  created_at: string;
  download_url?: string | null;
};

export function insertJob(job: JobRow) {
  db.prepare(`
    INSERT INTO jobs (
      id, filename, original_name, preset, status, created_at, download_url
    )
    VALUES (
      @id, @filename, @original_name, @preset, @status, @created_at, @download_url
    )
  `).run({
    ...job,
    download_url: job.download_url ?? null
  });
}

export function getJobs(): JobRow[] {
  return db.prepare(`
    SELECT id, filename, original_name, preset, status, created_at, download_url
    FROM jobs
    ORDER BY created_at DESC
  `).all() as JobRow[];
}
