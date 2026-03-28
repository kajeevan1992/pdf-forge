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
    created_at TEXT NOT NULL
  )
`);

export type JobRow = {
  id: string;
  filename: string;
  original_name: string;
  preset: string;
  status: string;
  created_at: string;
};

export function insertJob(job: JobRow) {
  db.prepare(`
    INSERT INTO jobs (id, filename, original_name, preset, status, created_at)
    VALUES (@id, @filename, @original_name, @preset, @status, @created_at)
  `).run(job);
}

export function getJobs(): JobRow[] {
  return db.prepare(`
    SELECT id, filename, original_name, preset, status, created_at
    FROM jobs
    ORDER BY created_at DESC
  `).all() as JobRow[];
}
