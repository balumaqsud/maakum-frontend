"use client";

import { useState } from "react";
import { LocaleText } from "@/components/shared/locale-text";
import { toggleReaction } from "@/features/messages/actions";

export function ReactionButton({
  id,
  count,
  active,
}: {
  id: string;
  count: number;
  active: boolean;
}) {
  const [state, setState] = useState({ count, active });
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy) return;
    const next = !state.active;
    const previous = state;
    setBusy(true);
    setState({ active: next, count: Math.max(0, state.count + (next ? 1 : -1)) });
    const result = await toggleReaction(id, next);
    setState(result.ok ? { active: result.reacted, count: result.reactionCount } : previous);
    setBusy(false);
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      aria-pressed={state.active}
      className={[
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-sans text-sm font-semibold",
        state.active ? "border-olive bg-olive text-ivory" : "border-line text-ink-soft hover:border-olive hover:text-ink",
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2z" />
      </svg>
      <LocaleText k="reached" />
      <span>{state.count}</span>
    </button>
  );
}
