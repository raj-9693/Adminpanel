import { useState } from "react";
import { Sparkles, Tag, Image as ImageIcon, Star, Upload } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import Field from "../components/editor/Field.jsx";
import Toggle from "../components/editor/Toggle.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import PhotoField from "../components/editor/PhotoField.jsx";
import SharedBottomNote from "../components/editor/SharedBottomNote.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import EditorGrid from "../components/editor/EditorGrid.jsx";
import GalleryPreview from "../components/editor/preview/GalleryPreview.jsx";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateGallery } from "../editor/validateSite.js";
import { compressImage, prettyName, uid } from "../editor/imageTools.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["intro", "filters", "items", "focus"];
const META = {
  intro:   { icon: Sparkles,  nav: "Intro",    title: "Page intro",           sub: "Heading & welcome text" },
  filters: { icon: Tag,       nav: "Tabs",     title: "Category tabs",        sub: "Names of the filter buttons" },
  items:   { icon: ImageIcon, nav: "Looks",    title: "Gallery looks",        sub: "Photos, titles, categories & descriptions" },
  focus:   { icon: Star,      nav: "In focus", title: "In-focus look",        sub: "The big featured look below the gallery" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

export default function GalleryEditor() {
  const ed = useSiteEditor({ pageKey: "gallery", order: ORDER, validate: validateGallery });
  const ago = useTimeAgo(ed.lastSaved);
  const [bulk, setBulk] = useState(0); // kitni photos abhi process ho rahi hain

  if (ed.loadState === "loading") return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;
  if (ed.loadState === "error" || !ed.draft)
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>This page could not be loaded right now.</p>
        <button type="button" className="ed-btn" onClick={ed.load}>Try again</button>
      </div></div></Layout>
    );

  const p = ed.draft;
  const bottom = ed.bottom;
  const upd = (key, patch) => ed.setPage((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
  const edit = (sec, itemKey, node) => (
    <div onFocusCapture={() => ed.focusSection(sec, itemKey ? [itemKey] : [])}>{node}</div>
  );

  const catOptions = p.filters.categories.map((c) => ({ value: c.id, label: c.label || "Untitled" }));
  const catLabel = (id) => p.filters.categories.find((c) => c.id === id)?.label || "No category";
  const focusOptions = p.items.filter((i) => i.published).map((i) => ({ value: i.id, label: i.title || "Untitled look" }));

  /* looks list badalne par "in focus" item valid rakho */
  const setItems = (items) =>
    ed.setPage((d) => ({
      ...d,
      items,
      focus: items.some((i) => i.id === d.focus.itemId) ? d.focus : { ...d.focus, itemId: items[0]?.id || "" },
    }));

  /* category delete/rename ke baad orphan looks pehli category me chale jaayein */
  const setCategories = (list) =>
    ed.setPage((d) => ({
      ...d,
      filters: { ...d.filters, categories: list },
      items: d.items.map((i) => (list.some((c) => c.id === i.category) ? i : { ...i, category: list[0]?.id || "" })),
    }));

  /* ek saath kai photos: har photo ek naya look ban jaati hai */
  const addMany = async (files) => {
    const list = Array.from(files).filter((f) => f.type.startsWith("image/") && f.size <= 8 * 1048576);
    if (!list.length) return;
    setBulk(list.length);
    const made = [];
    for (const f of list) {
      try {
        made.push({
          id: uid(), image: await compressImage(f), imageName: f.name, title: prettyName(f),
          category: p.filters.categories[0]?.id || "", description: "", details: "", published: true,
        });
      } catch { /* kharab file chhod do */ }
    }
    ed.setPage((d) => ({ ...d, items: [...d.items, ...made] }));
    setBulk(0);
    if (made.length) ed.focusSection("items", [`item-${made[made.length - 1].id}`]);
  };

  const body = {
    intro: (
      <>
        <Field label="Small heading" caps max={50} value={p.intro.eyebrow} onChange={(v) => upd("intro", { eyebrow: v })} />
        <Field label="Page title" as="textarea" rows={2} max={80} value={p.intro.title} onChange={(v) => upd("intro", { title: v })} />
        <Field label="Intro text" as="textarea" rows={3} max={220} value={p.intro.text} onChange={(v) => upd("intro", { text: v })} />
      </>
    ),

    filters: (
      <>
        <Field label="First tab (shows everything)" max={24} value={p.filters.allLabel} onChange={(v) => upd("filters", { allLabel: v })}
          hint="This tab always stays first and shows every look" />
        <div className="fd">
          <span className="fd-label">Category tabs · {p.filters.categories.length}</span>
          <ItemList
            items={p.filters.categories}
            onChange={setCategories}
            addLabel="Add category"
            canAdd={p.filters.categories.length < 8}
            canDelete={p.filters.categories.length > 1}
            makeNew={() => ({ id: uid(), label: "" })}
            summary={(c) => {
              const n = p.items.filter((i) => i.category === c.id).length;
              return { thumb: <Tag size={18} />, title: c.label || "New category", subtitle: `${n} ${n === 1 ? "look" : "looks"}` };
            }}
            editor={(c, pt) => <Field label="Category name" max={24} value={c.label} onChange={(v) => pt({ label: v })} />}
          />
          <p className="fd-note">If you delete a category, its looks move to the first category.</p>
        </div>
      </>
    ),

    items: (
      <>
        <div className="fd">
          <span className="fd-label">Add many photos at once</span>
          <label className={`im-drop sx-bulk ${bulk ? "busy" : ""}`}>
            <Upload size={22} strokeWidth={1.5} />
            <span>{bulk ? `Preparing ${bulk} photo${bulk > 1 ? "s" : ""}…` : "Choose photos — each one becomes a new look"}</span>
            <small>JPG, PNG or WebP · up to 8 MB each</small>
            <input type="file" accept="image/jpeg,image/png,image/webp" multiple hidden disabled={Boolean(bulk)}
              onChange={(e) => { addMany(e.target.files); e.target.value = ""; }} />
          </label>
        </div>

        <div className="fd">
          <span className="fd-label">Looks · {p.items.length}</span>
          <ItemList
            items={p.items}
            onChange={setItems}
            addLabel="Add look"
            makeNew={() => ({
              id: uid(), image: "", imageName: "", title: "", category: p.filters.categories[0]?.id || "",
              description: "", details: "", published: true,
            })}
            summary={(it) => ({
              thumb: it.image ? <img src={it.image} alt="" /> : <ImageIcon size={18} />,
              title: it.title || "New look",
              subtitle: catLabel(it.category),
            })}
            toggles={(it, pt) => <Toggle label="Show" checked={it.published} onChange={(v) => pt({ published: v })} />}
            editor={(it, pt) => edit("items", `item-${it.id}`, (
              <>
                <PhotoField label="Photo" hint="Portrait photo (3:4) works best" src={it.image} name={it.imageName}
                  onChange={(v) => pt({ image: v.src, imageName: v.name })} />
                <Field label="Title / tagline" max={50} placeholder="Rhea’s palace vows" value={it.title} onChange={(v) => pt({ title: v })} />
                <Field label="Category tag" as="select" options={catOptions} value={it.category} onChange={(v) => pt({ category: v })} />
                <Field label="Detailed description" as="textarea" rows={4} max={260}
                  hint="Shown in the big “In focus” view" value={it.description} onChange={(v) => pt({ description: v })} />
                <Field label="Look details" max={80} placeholder="Bridal makeup · Soft cooling · Organza setting"
                  hint="One short line, separate parts with “ · ”" value={it.details} onChange={(v) => pt({ details: v })} />
                {it.published && p.focus.itemId !== it.id && (
                  <button type="button" className="ed-link sx-left-link"
                    onClick={() => { upd("focus", { itemId: it.id }); ed.focusSection("focus"); }}>
                    Show this look in the “In focus” section
                  </button>
                )}
                {p.focus.itemId === it.id && <p className="fd-note">This look is currently shown in the “In focus” section.</p>}
              </>
            ))}
          />
        </div>
      </>
    ),

    focus: (
      <>
        <Field label="Small heading" caps max={30} value={p.focus.eyebrow} onChange={(v) => upd("focus", { eyebrow: v })} />
        <Field label="Section title" as="textarea" rows={2} max={80} value={p.focus.title} onChange={(v) => upd("focus", { title: v })} />
        <Field label="Look to show first" as="select" options={focusOptions} value={p.focus.itemId} onChange={(v) => upd("focus", { itemId: v })}
          hint="Visitors can still move through the other looks with the arrows" />
        <div className="fd-row">
          <Field label="Details heading" max={30} value={p.focus.detailsLabel} onChange={(v) => upd("focus", { detailsLabel: v })} />
          <Field label="Button text" max={30} hint="Leave empty to hide" value={p.focus.buttonText} onChange={(v) => upd("focus", { buttonText: v })} />
        </div>
      </>
    ),
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Gallery" title="Gallery page editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={`${SITE}/gallery`}
        />

        <EditorGrid>
          <div className="sx-left">
            <SectionNav items={NAV} current={ed.open} onPick={ed.jump} />

            {ORDER.map((id) => {
              const m = META[id];
              return (
                <div key={id} onFocusCapture={() => ed.focusSection(id)}>
                  <SectionCard
                    id={id}
                    icon={m.icon}
                    title={m.title}
                    subtitle={id === "items" ? `${p.items.length} looks · ${p.items.filter((i) => i.published).length} visible` : m.sub}
                    open={ed.open === id}
                    onToggle={() => ed.toggle(id)}
                    issues={ed.errs[id]?.length || 0}
                  >
                    {ed.errs[id] && <ul className="sc-errs">{ed.errs[id].map((msg) => <li key={msg}>{msg}</li>)}</ul>}
                    {body[id]}
                  </SectionCard>
                </div>
              );
            })}
            <SharedBottomNote />
          </div>

          <LivePreview url="saanjhbeauty.in/gallery" active={ed.active}>
            {(device) => <GalleryPreview d={p} bottom={bottom} device={device} />}
          </LivePreview>
        </EditorGrid>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
