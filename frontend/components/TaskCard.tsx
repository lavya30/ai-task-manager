"use client";

import { Status, Task } from "@/lib/types";

const statusBorder: Record<Status, string> = {
  todo: "border-l-status-todo",
  in_progress: "border-l-status-progress",
  done: "border-l-status-done",
};

const priorityStyle: Record<Task["priority"], string> = {
  high: "bg-priority-highBg text-priority-high",
  medium: "bg-priority-mediumBg text-priority-medium",
  low: "bg-priority-lowBg text-priority-low",
};

const nextStatus: Record<Status, Status | null> = {
  todo: "in_progress",
  in_progress: "done",
  done: null,
};

const nextLabel: Record<Status, string> = {
  todo: "Start",
  in_progress: "Mark done",
  done: "Done",
};

export default function TaskCard({
  task,
  onAdvance,
  onDelete,
}: {
  task: Task;
  onAdvance: (id: number, status: Status) => void;
  onDelete: (id: number) => void;
}) {
  const next = nextStatus[task.status];

  return (
    <div
      className={`bg-surface border border-border border-l-2 ${statusBorder[task.status]} rounded-lg p-3 flex flex-col gap-2`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="font-mono text-xs text-ink-soft">
          #{String(task.id).padStart(3, "0")}
        </span>
        <span
          className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityStyle[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      <p className="text-sm font-medium text-ink leading-snug">
        {task.title}
      </p>

      {task.description && (
        <p className="text-xs text-ink-soft leading-relaxed">
          {task.description}
        </p>
      )}

      {task.due_date && (
        <p className="text-xs text-ink-soft">
          Due {new Date(task.due_date).toLocaleDateString()}
        </p>
      )}

      <div className="flex items-center justify-between pt-1">
        {next ? (
          <button
            onClick={() => onAdvance(task.id, next)}
            className="text-xs text-accent font-medium hover:text-accent-dark"
          >
            {nextLabel[task.status]} →
          </button>
        ) : (
          <span className="text-xs text-status-done font-medium">
            Complete
          </span>
        )}
        <button
          onClick={() => onDelete(task.id)}
          className="text-xs text-ink-soft hover:text-priority-high"
          aria-label="Delete task"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
