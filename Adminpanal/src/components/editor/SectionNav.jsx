// Left pane ke upar chipon ki sticky row — ek click me kisi bhi section par jao.
export default function SectionNav({ items, current, onPick }) {
  return (
    <nav className="sx-nav" aria-label="Jump to section">
      {items.map(({ id, label, icon: Icon }) => (
        <button key={id} type="button" className={current === id ? "on" : ""} onClick={() => onPick(id)}>
          <Icon size={15} strokeWidth={1.7} /> {label}
        </button>
      ))}
    </nav>
  );
}
