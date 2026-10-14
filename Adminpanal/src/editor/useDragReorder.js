import { useRef, useState } from "react";

// Native drag & drop se list ka order badalna (koi library nahi)
export default function useDragReorder(items, onChange) {
  const from = useRef(null);
  const [over, setOver] = useState(null);

  const bind = (i) => ({
    onDragStart: (e) => {
      from.current = i;
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", String(i)); } catch { /* ignore */ }
    },
    onDragOver: (e) => { if (from.current === null) return; e.preventDefault(); setOver(i); },
    onDragLeave: () => setOver((o) => (o === i ? null : o)),
    onDrop: (e) => {
      e.preventDefault();
      const a = from.current;
      from.current = null;
      setOver(null);
      if (a === null || a === i) return;
      const next = [...items];
      const [m] = next.splice(a, 1);
      next.splice(i, 0, m);
      onChange(next);
    },
    onDragEnd: () => { from.current = null; setOver(null); },
  });

  const move = (i, j) => {
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    const [m] = next.splice(i, 1);
    next.splice(j, 0, m);
    onChange(next);
  };

  return { bind, over, move };
}
