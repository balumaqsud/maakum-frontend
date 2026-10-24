import Link from "next/link";
import { MessageCard } from "@/components/home/message-card";
import { homeMessages } from "@/lib/home-messages";

function Star() {
  return (
    <svg width="34" height="34" viewBox="0 0 30 30" aria-hidden style={{ flex: "none" }}>
      <g fill="none" stroke="#b08d4a" strokeWidth="1.3">
        <path d="M15 2l3 5 6-1-1 6 5 3-5 3 1 6-6-1-3 5-3-5-6 1 1-6-5-3 5-3-1-6 6 1z" />
        <circle cx="15" cy="15" r="5" />
      </g>
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#124233" strokeWidth="2" aria-hidden>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function MessagesSection() {
  return (
    <section className="hm-msgs">
      <div className="hm-in">
        <div className="hm-mh">
          <Star />
          <div>
            <h2>Messages from around the world</h2>
            <p>Words of support, prayers, and hope for the people in Gaza.</p>
          </div>
          <Link className="hm-view" href="/messages">
            View all <span className="hm-vm">messages</span> <Arrow />
          </Link>
        </div>
        <div className="hm-cards">
          {homeMessages.map((message) => (
            <MessageCard key={message.name} message={message} />
          ))}
        </div>
      </div>
    </section>
  );
}
