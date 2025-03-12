export interface TimelineItem {
  id: string;
  label: string;
  type: "submission" | "funding" | "finance" | "deadline";
  date: string;
}

export interface Project {
  id: string;
  name: string;
  userId: string;
  startDate: string;
  endDate: string;
  items: TimelineItem[];
}

export interface Document {
  id: string;
  name: string;
  originalName: string;
  fileType: string;
  uploadDate: string;
}
