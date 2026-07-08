export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "in_progress" | "done";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  priority: Priority;
  status: Status;
  due_date: string | null;
  ai_notes: string | null;
  created_at: string;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  priority: Priority;
  due_date?: string;
}

export interface PrioritizeResponse {
  ordered_task_ids: number[];
  reasoning: string;
}
