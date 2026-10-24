function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M4 5h16v11H11l-4 4v-4H4z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 28 24" aria-hidden>
      <circle cx="10" cy="8" r="3.5" />
      <path d="M3 20c0-4 3-6 7-6s7 2 7 6z" />
      <circle cx="20" cy="7" r="2.6" />
      <path d="M19 13c4 0 6 2 6 5" />
    </svg>
  );
}

const items = [
  { value: "12,480", label: "messages", icon: <MessageIcon /> },
  { value: "94", label: "countries", icon: <GlobeIcon /> },
  { value: "3,206", label: "replies", icon: <PeopleIcon /> },
];

export function Stats() {
  return (
    <div className="hm-stats">
      {items.map((item) => (
        <div className="hm-st" key={item.label}>
          {item.icon}
          <div>
            <b>{item.value}</b>
            <span>{item.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
