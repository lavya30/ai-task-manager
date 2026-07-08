"use client";

import { useState } from "react";
import { PrioritizeResponse, Task } from "@/lib/types";
import { prioritizeTasks } from "@/lib/api";

export default function PrioritizePanel({ tasks }: { tasks: Task[] }) {
  const [result, setResult] = useState<PrioritizeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await prioritizeTasks();
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const titleById = new Map(tasks.map((t) => [t.id, t.title]));

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleClick}
        disabled={loading}
        className="text-sm font-medium bg-ink text-white rounded-lg px-3 py-1.5 disabled:opacity-50 self-start"
      >
        {loading ? "Thinking..." : "AI prioritize"}
      </button>

      {error && (
        <div className="text-xs text-priority-high bg-priority-highBg rounded-lg px-3 py-2 max-w-md">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-surface border border-border rounded-lg p-4 max-w-md flex flex-col gap-3">
          <p className="font-mono text-xs font-semibold text-ink-soft uppercase tracking-wide">
            Suggested order
          </p>
          <ol className="flex flex-col gap-1.5">
            {result.ordered_task_ids.map((id, i) => (
              <li key={id} className="text-sm text-ink flex gap-2">
                <span className="font-mono text-ink-soft">{i + 1}.</span>
                {titleById.get(id) ?? `Task #${id}`}
              </li>
            ))}
          </ol>
          <p className="text-xs text-ink-soft leading-relaxed border-t border-border pt-3">
            {result.reasoning}
          </p>
        </div>
      )}
    </div>
  );
}
