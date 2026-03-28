import Database from "better-sqlite3";
const db = new Database("data.db");
db.exec("CREATE TABLE IF NOT EXISTS jobs (id TEXT, filename TEXT)");
export function insertJob(j:any){db.prepare("INSERT INTO jobs VALUES (?,?)").run(j.id,j.filename);}
export function getJobs(){return db.prepare("SELECT * FROM jobs").all();}