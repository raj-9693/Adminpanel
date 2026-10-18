import { useState } from "react";
import { GripVertical, Pencil, Trash2, Plus, ChevronUp, ChevronDown } from "lucide-react";
import useDragReorder from "../../editor/useDragReorder.js";

// Compact rows + inline edit. summary(item) -> { thumb, title, subtitle }
// reorder={false} -> drag & drop band (jab order fixed ho, jaise booking ke steps)
export default function ItemList({
  items, onChange, summary, toggles, editor, makeNew, addLabel = "Add item", canAdd = true, canDelete = true, reorder = true,
}) {
  const [open, setOpen] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const { bind, over } = useDragReorder(items, onChange);

  const update = (id, patch) => onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const remove = (id) => { onChange(items.filter((it) => it.id !== id)); setConfirm(null); if (open === id) setOpen(null); };
  // phone par drag nahi hota, isliye up/down buttons (CSS se sirf touch/chhoti screen par dikhte hain)
  const move = (i, d) => {
    const j = i + d;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => { const it = makeNew(); onChange([...items, it]); setOpen(it.id); };

  return (
    <div className="il-wrap">
      <ul className="il">
        {items.map((it, i) => {
          const s = summary(it);
          const isOpen = open === it.id;
          return (
            <li key={it.id} className={`il-item ${isOpen ? "open" : ""} ${over === i ? "over" : ""}`}>
              <div className="il-row" draggable={reorder} {...(reorder ? bind(i) : {})}>
                {reorder && <span className="il-grip" aria-hidden><GripVertical size={18} /></span>}
                <span className="il-thumb">{s.thumb}</span>
                <button type="button" className="il-main" onClick={() => setOpen(isOpen ? null : it.id)} aria-expanded={isOpen}>
                  <b>{s.title}</b>
                  <small>{s.subtitle}</small>
                </button>
                {toggles && <span className="il-toggles">{toggles(it, (p) => update(it.id, p))}</span>}
                {reorder && items.length > 1 && (
                  <span className="il-move">
                    <button type="button" className="il-ic" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up"><ChevronUp size={16} /></button>
                    <button type="button" className="il-ic" onClick={() => move(i, 1)} disabled={i === items.length - 1} aria-label="Move down"><ChevronDown size={16} /></button>
                  </span>
                )}
                <button type="button" className="il-ic" onClick={() => setOpen(isOpen ? null : it.id)} aria-label="Edit"><Pencil size={16} /></button>
                {canDelete && (confirm === it.id ? (
                  <span className="il-confirm">
                    Delete?
                    <button type="button" onClick={() => remove(it.id)}>Yes</button>
                    <button type="button" onClick={() => setConfirm(null)}>No</button>
                  </span>
                ) : (
                  <button type="button" className="il-ic danger" onClick={() => setConfirm(it.id)} aria-label="Delete"><Trash2 size={16} /></button>
                ))}
              </div>
              {isOpen && <div className="il-edit">{editor(it, (p) => update(it.id, p))}</div>}
            </li>
          );
        })}
      </ul>
      {canAdd && (
        <button type="button" className="il-add" onClick={add}><Plus size={18} /> {addLabel}</button>
      )}
    </div>
  );
}
