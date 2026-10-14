import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getSiteContent, saveSiteContent } from '../api/siteContent.js';

// Left card kholne par us card ko left pane me upar le aao (accordion animation ke baad).
const scrollToCard = (id) =>
  setTimeout(() => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 480);

/**
 * Home / Gallery dono editors ka common logic.
 *  - draft  = { page, bottom }  (bottom = shared CTA + footer, alag key me save hota hai)
 *  - active = preview ko batata hai kaun sa section dikhana/highlight karna hai
 */
export default function useSiteEditor({ pageKey, order, validate }) {
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(null);
  const [loadState, setLoadState] = useState('loading'); // loading | ready | error
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [toast, setToast] = useState('');
  const [open, setOpen] = useState(order[0]);
  const [active, setActive] = useState([order[0]]);

  const load = useCallback(() => {
    setLoadState('loading');
    Promise.all([getSiteContent(pageKey), getSiteContent('bottom')])
      .then(([p, b]) => {
        const d = { page: p.page, bottom: b.page };
        setDraft(d); setSaved(d);
        setLastSaved(Math.max(p.savedAt || 0, b.savedAt || 0) || null);
        setLoadState('ready');
      })
      .catch((err) => { console.error('Editor load error:', err); setLoadState('error'); });
  }, [pageKey]);
  useEffect(() => { load(); }, [load]);

  const dirty = useMemo(
    () => Boolean(draft && saved && JSON.stringify(draft) !== JSON.stringify(saved)),
    [draft, saved]
  );
  const errs = useMemo(() => (showErrors && draft ? validate(draft) : {}), [showErrors, draft, validate]);

  /* ---------- draft setters ---------- */
  const setPage = useCallback((fn) => setDraft((d) => ({ ...d, page: typeof fn === 'function' ? fn(d.page) : fn })), []);
  const setBottom = useCallback((fn) => setDraft((d) => ({ ...d, bottom: typeof fn === 'function' ? fn(d.bottom) : fn })), []);

  /* ---------- section open / preview focus ---------- */
  const focusSection = useCallback((id, extra = []) => {
    const next = [...extra, id];
    setActive((a) => (a.join('|') === next.join('|') ? a : next));
  }, []);
  const toggle = (id) => {
    const willOpen = open !== id;
    setOpen(willOpen ? id : null);
    if (willOpen) { focusSection(id); scrollToCard(id); }
  };
  const jump = (id) => { setOpen(id); focusSection(id); scrollToCard(id); };

  /* ---------- save / reset ---------- */
  const saveRef = useRef(null);
  saveRef.current = async () => {
    if (saving || !draft) return;
    const e = validate(draft);
    const first = order.find((id) => e[id]);
    if (first) {
      setShowErrors(true); setOpen(first); focusSection(first); scrollToCard(first);
      setToast('Please fix the highlighted fields.');
      return;
    }
    setSaving(true);
    try {
      const snap = draft;
      await Promise.all([saveSiteContent(pageKey, snap.page), saveSiteContent('bottom', snap.bottom)]);
      setSaved(snap); setLastSaved(Date.now()); setShowErrors(false);
      setToast('Changes saved.');
    } catch (err) {
      setToast(err.message === 'storage-full'
        ? 'Browser storage is full. Use smaller photos or connect the backend.'
        : 'Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  const save = () => saveRef.current();
  const reset = () => {
    if (!dirty) return;
    if (window.confirm('Reset all unsaved changes?')) { setDraft(saved); setShowErrors(false); }
  };

  /* ---------- Ctrl/Cmd + S, tab-close warning, toast timer ---------- */
  useEffect(() => {
    const h = (e) => { if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); saveRef.current(); } };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  useEffect(() => {
    if (!dirty) return;
    const h = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3200);
    return () => clearTimeout(t);
  }, [toast]);

  return {
    draft, loadState, load, dirty, errs, saving, lastSaved, toast,
    open, active, toggle, jump, focusSection,
    setPage, setBottom, save, reset,
  };
}
