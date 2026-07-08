"use client";

import { Status, Task } from "@/lib/types";
import TaskCard from "./TaskCard";

const columnMeta: Record<Status, { label: string; dot: string }> = {
  todo: { label: "To do", dot: "bg-status-todo" },
  in_progress: { label: "In progress", dot: "bg-status-progress" },
  done: { label: "Done", dot: "bg-status-done" },
};

export default function Column({
  status,
  tasks,
  onAdvance,
  onDelete,
}: {
  status: Status;
  tasks: Task[];
  onAdvance: (id: number, status: Status) => void;
  onDelete: (id: number) => void;
}) {
  const meta = columnMeta[status];

  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
        <h2 className="font-mono text-xs font-semibold tracking-wide text-ink-soft uppercase">
          {meta.label}
        </h2>
        <span className="text-xs text-ink-soft">{tasks.length}</span>
      </div>
      <div className="flex flex-col gap-2">
        {tasks.length === 0 && (
          <div className="border border-dashed border-border rounded-lg p-4 text-xs text-ink-soft text-center">
            Nothing here
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onAdvance={onAdvance}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
