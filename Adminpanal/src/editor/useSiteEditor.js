import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getSiteContent, saveSiteContent, DEFAULTS } from '../api/siteContent.js';

// Left card kholne par us card ko left pane me upar le aao (accordion animation ke baad).
const scrollToCard = (id) =>
  setTimeout(() => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 480);

/**
 * Home / Gallery / About / Bottom sab editors ka common logic.
 *  - draft  = us page ka apna data (sirf wahi save hota hai)
 *  - bottom = shared CTA + footer, sirf PREVIEW ke liye (read-only). Isse "Bottom" page par edit karte hain.
 *             pageKey === 'bottom' ho to bottom = draft (live preview me wahi dikhta hai).
 *  - active = preview ko batata hai kaun sa section dikhana/highlight karna hai
 */
export default function useSiteEditor({ pageKey, order, validate, prepare }) {
  const standalone = pageKey === 'bottom';
  const [draft, setDraft] = useState(null);
  const [saved, setSaved] = useState(null);
  const [shared, setShared] = useState(null);
  const [loadState, setLoadState] = useState('loading'); // loading | ready | error
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showErrors, setShowErrors] = useState(false);
  const [toast, setToast] = useState('');
  const [open, setOpen] = useState(order[0]);
  const [active, setActive] = useState([order[0]]);

  const load = useCallback(() => {
    setLoadState('loading');
    Promise.all([
      getSiteContent(pageKey),
      standalone ? Promise.resolve(null) : getSiteContent('bottom').catch(() => null),
    ])
      .then(([p, b]) => {
        setDraft(p.page); setSaved(p.page);
        setShared(b ? b.page : DEFAULTS.bottom);
        setLastSaved(p.savedAt || null);
        setLoadState('ready');
      })
      .catch((err) => { console.error('Editor load error:', err); setLoadState('error'); });
  }, [pageKey, standalone]);
  useEffect(() => { load(); }, [load]);

  const dirty = useMemo(
    () => Boolean(draft && saved && JSON.stringify(draft) !== JSON.stringify(saved)),
    [draft, saved]
  );
  const errs = useMemo(() => (showErrors && draft ? validate(draft) : {}), [showErrors, draft, validate]);

  /* ---------- draft setter ---------- */
  const setPage = useCallback((fn) => setDraft((d) => (typeof fn === 'function' ? fn(d) : fn)), []);

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
      const snap = prepare ? prepare(draft) : draft; // prepare = save se pehle data saaf karna (numbers wagairah)
      await saveSiteContent(pageKey, snap);
      if (prepare) setDraft(snap);
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
    draft, bottom: standalone ? draft : shared,
    loadState, load, dirty, errs, saving, lastSaved, toast,
    open, active, toggle, jump, focusSection,
    setPage, save, reset,
  };
}
