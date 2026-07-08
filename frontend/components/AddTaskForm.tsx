"use client";

import { useState } from "react";
import { Priority, TaskCreateInput } from "@/lib/types";

export default function AddTaskForm({
  onAdd,
}: {
  onAdd: (input: TaskCreateInput) => Promise<void>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [submitting, setSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);
    try {
      await onAdd({
        title: title.trim(),
        description: description.trim() || undefined,
        priority,
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
      setOpen(false);
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-medium text-accent border border-border rounded-lg px-3 py-1.5 hover:bg-accent-light transition-colors"
      >
        + New task
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-lg p-3 flex flex-col gap-2 w-full max-w-md"
    >
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="text-sm border border-border rounded-md px-2 py-1.5 outline-none focus:border-accent"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
        className="text-sm border border-border rounded-md px-2 py-1.5 outline-none focus:border-accent resize-none"
      />
      <div className="flex items-center gap-2">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          className="text-xs border border-border rounded-md px-2 py-1.5 outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button
          type="submit"
          disabled={submitting || !title.trim()}
          className="text-sm font-medium bg-accent text-white rounded-md px-3 py-1.5 disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm text-ink-soft px-2 py-1.5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
