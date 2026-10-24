"use client";

import { useState } from "react";
import type { HomeMessage } from "@/lib/home-messages";

function Flag({ code }: { code: HomeMessage["flag"] }) {
  if (code === "uz") {
    return (
      <svg viewBox="0 0 25 25" aria-hidden>
        <rect width="25" height="25" fill="#e0b21b" />
        <rect width="9" height="25" fill="#1b2f8f" />
        <rect x="16" width="9" height="25" fill="#c8202f" />
      </svg>
    );
  }
  if (code === "ps") {
    return (
      <svg viewBox="0 0 25 25" aria-hidden>
        <rect width="25" height="9" fill="#111" />
        <rect y="8" width="25" height="9" fill="#fff" />
        <rect y="16" width="25" height="9" fill="#1f8a4c" />
        <path d="M0 0l12 12.5L0 25z" fill="#d6262e" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 25 25" aria-hidden>
      <rect width="25" height="25" fill="#c8202f" />
      <rect y="6" width="25" height="13" fill="#f2c012" />
    </svg>
  );
}

export function MessageCard({ message }: { message: HomeMessage }) {
  const [liked, setLiked] = useState(false);
  const likes = message.likes + (liked ? 1 : 0);

  return (
    <article className="hm-card">
      <div className="hm-who">
        <span className="hm-flag">
          <Flag code={message.flag} />
        </span>
        <b>{message.name}</b>
        <i>·</i>
        <i>{message.place}</i>
        <em>{message.time}</em>
      </div>
      <p className={message.short ? "hm-short" : undefined}>{message.body}</p>
      <div className="hm-act">
        <button
          type="button"
          className="hm-like"
          aria-pressed={liked}
          aria-label={liked ? `Unlike ${message.name}'s message` : `Like ${message.name}'s message`}
          onClick={() => setLiked((value) => !value)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
            <path d="M12 21C5 15 3 11.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 11.5 19 15 12 21z" />
          </svg>
          <span>{likes}</span>
        </button>
        <span className="hm-sep" aria-hidden />
        <span>Reply</span>
      </div>
    </article>
  );
}
