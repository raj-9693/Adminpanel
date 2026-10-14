import { ChevronDown, GripVertical, ArrowUp, ArrowDown } from "lucide-react";

// Collapsible section card. reorder=true ho to drag handle + up/down arrows dikhte hain.
export default function SectionCard({
  id, icon: Icon, title, subtitle, open, onToggle, issues = 0,
  reorder = false, canUp, canDown, onUp, onDown, drag, dragOver = false, children,
}) {
  const head = (
    <>
      <span className="sc-ic"><Icon size={22} strokeWidth={1.6} /></span>
      <span className="sc-t">
        <b>{title}</b>
        <small>{subtitle}</small>
      </span>
      {issues > 0 && <span className="sc-issues">{issues} {issues === 1 ? "issue" : "issues"}</span>}
    </>
  );

  return (
    <section
      id={`sec-${id}`}
      className={`sc ${open ? "open" : ""} ${reorder ? "reorder" : ""} ${dragOver ? "over" : ""} ${issues ? "has-issues" : ""}`}
      draggable={reorder}
      {...(reorder ? drag : {})}
    >
      {reorder ? (
        <div className="sc-head static">
          <span className="sc-grip" aria-hidden><GripVertical size={20} /></span>
          {head}
          <span className="sc-arrows">
            <button type="button" onClick={onUp} disabled={!canUp} aria-label={`Move ${title} up`}><ArrowUp size={16} /></button>
            <button type="button" onClick={onDown} disabled={!canDown} aria-label={`Move ${title} down`}><ArrowDown size={16} /></button>
          </span>
        </div>
      ) : (
        <button type="button" className="sc-head" onClick={onToggle} aria-expanded={open} aria-controls={`sc-${id}-body`}>
          {head}
          <ChevronDown className="sc-chev" size={22} strokeWidth={1.6} />
        </button>
      )}

      <div id={`sc-${id}-body`} className="sc-body" role="region" aria-label={title}>
        <div className="sc-inner">
          <div className="sc-pad">{children}</div>
        </div>
      </div>
    </section>
  );
}
