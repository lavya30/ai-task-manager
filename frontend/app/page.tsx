"use client";

import { useEffect, useState } from "react";
import { Status, Task, TaskCreateInput } from "@/lib/types";
import { createTask, deleteTask, getTasks, updateTaskStatus } from "@/lib/api";
import Column from "@/components/Column";
import AddTaskForm from "@/components/AddTaskForm";
import PrioritizePanel from "@/components/PrioritizePanel";

const statuses: Status[] = ["todo", "in_progress", "done"];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refresh() {
    try {
      const data = await getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? `Can't reach the backend: ${err.message}`
          : "Can't reach the backend"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleAdd(input: TaskCreateInput) {
    await createTask(input);
    await refresh();
  }

  async function handleAdvance(id: number, status: Status) {
    await updateTaskStatus(id, status);
    await refresh();
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    await refresh();
  }

  return (
    <main className="min-h-screen bg-paper px-6 py-8 max-w-6xl mx-auto">
      <header className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-mono text-lg font-semibold text-ink">
            Task manager
          </h1>
          <p className="text-sm text-ink-soft">
            Plan work, let AI suggest what to tackle first
          </p>
        </div>
        <AddTaskForm onAdd={handleAdd} />
      </header>

      <div className="mb-8">
        <PrioritizePanel tasks={tasks} />
      </div>

      {loading && <p className="text-sm text-ink-soft">Loading tasks...</p>}

      {error && (
        <div className="text-sm text-priority-high bg-priority-highBg rounded-lg px-4 py-3 mb-6">
          {error}. Is the backend running on port 8000?
        </div>
      )}

      {!loading && !error && (
        <div className="flex gap-6 flex-col md:flex-row">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks.filter((t) => t.status === status)}
              onAdvance={handleAdvance}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </main>
  );
}
