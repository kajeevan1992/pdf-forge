export type Job = {
  id: string;
  filename: string;
  type: string;
  status: "Queued" | "Processing" | "Complete";
  createdAt: string;
};

export const demoJobs: Job[] = [
  {
    id: "JOB-1001",
    filename: "booklet-sample.pdf",
    type: "Booklet",
    status: "Complete",
    createdAt: "2026-03-28 18:20"
  },
  {
    id: "JOB-1002",
    filename: "business-cards.pdf",
    type: "4-up",
    status: "Processing",
    createdAt: "2026-03-28 18:42"
  },
  {
    id: "JOB-1003",
    filename: "invoice-pack.pdf",
    type: "Numbering",
    status: "Queued",
    createdAt: "2026-03-28 18:58"
  }
];