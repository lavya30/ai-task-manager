import { PrioritizeResponse, Status, Task, TaskCreateInput } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.detail || `Request failed: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`, { cache: "no-store" });
  return handleResponse<Task[]>(res);
}

export async function createTask(input: TaskCreateInput): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handleResponse<Task>(res);
}

export async function updateTaskStatus(
  id: number,
  status: Status
): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handleResponse<Task>(res);
}

export async function deleteTask(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
  return handleResponse<void>(res);
}

export async function prioritizeTasks(): Promise<PrioritizeResponse> {
  const res = await fetch(`${API_URL}/ai/prioritize`, { method: "POST" });
  return handleResponse<PrioritizeResponse>(res);
}
