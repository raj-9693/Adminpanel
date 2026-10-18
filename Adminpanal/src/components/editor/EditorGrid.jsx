import { useEffect, useRef, useState } from "react";
import { Pencil, Eye } from "lucide-react";

// Laptop par: left forms + right live preview (side-by-side).
// Phone / tablet par: "Edit | Preview" tabs, taaki dono poori screen me saaf dikhein.
// children = [ <div className="sx-left">…</div>, <LivePreview … /> ]
export default function EditorGrid({ children }) {
  const [view, setView] = useState("edit");
  const first = useRef(true);
  // phone par tab badalne par page ke upar le jao (sirf jab tabs dikh rahe hon)
  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (window.innerWidth <= 1100) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);
  return (
    <>
      <div className="sx-tabs" role="tablist" aria-label="Editor view">
        <button type="button" role="tab" aria-selected={view === "edit"} className={view === "edit" ? "on" : ""} onClick={() => setView("edit")}>
          <Pencil size={16} /> Edit
        </button>
        <button type="button" role="tab" aria-selected={view === "preview"} className={view === "preview" ? "on" : ""} onClick={() => setView("preview")}>
          <Eye size={16} /> Preview
        </button>
      </div>
      <div className="sx-grid" data-view={view}>{children}</div>
    </>
  );
}
