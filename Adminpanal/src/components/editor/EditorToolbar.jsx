import { ChevronRight, ExternalLink, RotateCcw, Save, Loader2, Check } from "lucide-react";

// Top action bar: breadcrumb + title, save-status, Reset, Save (loading state), View live site.
export default function EditorToolbar({ crumb, title, dirty, saving, savedText, onSave, onReset, siteUrl }) {
  return (
    <header className="sx-bar">
      <div className="sx-bar-l">
        <div className="ed-crumbs"><span>Website</span><ChevronRight size={14} /><b>{crumb}</b></div>
        <h1 className="ed-title sx-title">{title}</h1>
      </div>

      <div className="sx-bar-r">
        <span className={`sx-status ${dirty ? "dirty" : "ok"}`} role="status">
          {dirty ? <><i /> Unsaved changes</> : <><Check size={15} /> Saved {savedText}</>}
        </span>
        {siteUrl && (
          <a className="sx-btn" href={siteUrl} target="_blank" rel="noreferrer">
            <ExternalLink size={17} strokeWidth={1.7} /> View live site
          </a>
        )}
        <button type="button" className="sx-btn" onClick={onReset} disabled={!dirty || saving}>
          <RotateCcw size={17} strokeWidth={1.7} /> Reset changes
        </button>
        <button type="button" className="sx-save" onClick={onSave} disabled={!dirty || saving} aria-busy={saving}>
          {saving ? <Loader2 size={18} className="sx-spin" /> : <Save size={18} strokeWidth={1.8} />}
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </header>
  );
}
