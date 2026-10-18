import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Left pane ke upar chips ki sticky row.
// Chips zyada hon to ‹ › arrows aate hain (mouse se bhi scroll ho), touch par swipe, aur active chip apne aap beech me aa jaata hai.
export default function SectionNav({ items, current, onPick }) {
  const box = useRef(null);
  const [edge, setEdge] = useState({ l: false, r: false });

  const measure = useCallback(() => {
    const el = box.current;
    if (!el) return;
    setEdge({ l: el.scrollLeft > 4, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 });
  }, []);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure, items.length]);

  // active chip ko dikhao (sirf nav ke andar scroll — page ko nahi hilata)
  useEffect(() => {
    const el = box.current;
    const on = el?.querySelector(".on");
    if (!el || !on) return;
    const target = on.offsetLeft - (el.clientWidth - on.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [current]);

  const nudge = (dir) => box.current?.scrollBy({ left: dir * Math.max(160, box.current.clientWidth * 0.6), behavior: "smooth" });

  return (
    <div className="sx-navwrap">
      {edge.l && <button type="button" className="sx-nav-arrow l" onClick={() => nudge(-1)} aria-label="Scroll sections left"><ChevronLeft size={18} /></button>}
      <nav className="sx-nav" ref={box} onScroll={measure} aria-label="Jump to section">
        {items.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={current === id ? "on" : ""} onClick={() => onPick(id)}>
            <Icon size={15} strokeWidth={1.7} /> {label}
          </button>
        ))}
      </nav>
      {edge.r && <button type="button" className="sx-nav-arrow r" onClick={() => nudge(1)} aria-label="Scroll sections right"><ChevronRight size={18} /></button>}
    </div>
  );
}
