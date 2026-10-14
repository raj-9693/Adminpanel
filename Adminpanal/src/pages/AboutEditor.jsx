import { Sparkles, UserRound, Hash, ListOrdered, MapPin, Briefcase, Send } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import Field from "../components/editor/Field.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import PhotoField from "../components/editor/PhotoField.jsx";
import BottomForm from "../components/editor/BottomForm.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import AboutPreview from "../components/editor/preview/AboutPreview.jsx";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateAbout } from "../editor/validateSite.js";
import { uid } from "../editor/imageTools.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["hero", "story", "numbers", "process", "travel", "kit", "bottom"];
const META = {
  hero:    { icon: Sparkles,   nav: "Intro",   title: "Page intro",        sub: "Heading & welcome text" },
  story:   { icon: UserRound,  nav: "Story",   title: "Artist’s note",     sub: "Portrait, personal story & key numbers" },
  numbers: { icon: Hash,       nav: "Numbers", title: "Highlights band",   sub: "Four proof points on the maroon strip" },
  process: { icon: ListOrdered,nav: "Process", title: "Our process",       sub: "Steps from first hello to final touch" },
  travel:  { icon: MapPin,     nav: "Travel",  title: "Where we travel",   sub: "Text & list of cities" },
  kit:     { icon: Briefcase,  nav: "Kit",     title: "Our kit",           sub: "Brands we use & skin-care note" },
  bottom:  { icon: Send,       nav: "Bottom",  title: "Bottom section",    sub: "Call-to-action & footer · shared on all pages" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

export default function AboutEditor() {
  const ed = useSiteEditor({ pageKey: "about", order: ORDER, validate: validateAbout });
  const ago = useTimeAgo(ed.lastSaved);

  if (ed.loadState === "loading") return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;
  if (ed.loadState === "error" || !ed.draft)
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>This page could not be loaded right now.</p>
        <button type="button" className="ed-btn" onClick={ed.load}>Try again</button>
      </div></div></Layout>
    );

  const { page: p, bottom } = ed.draft;
  const upd = (key, patch) => ed.setPage((d) => ({ ...d, [key]: { ...d[key], ...patch } }));
  const edit = (sec, itemKey, node) => (
    <div onFocusCapture={() => ed.focusSection(sec, itemKey ? [itemKey] : [])}>{node}</div>
  );
  const patchIn = (list, id, patch) => list.map((x) => (x.id === id ? { ...x, ...patch } : x));

  // chhoti "label" wali lists (cities / brands)
  const labelList = (sec, key, items, noun, max) => (
    <ItemList
      items={items}
      onChange={(l) => upd(sec, { [key]: l })}
      addLabel={`Add ${noun}`}
      canAdd={items.length < max}
      canDelete={items.length > 1}
      makeNew={() => ({ id: uid(), label: "" })}
      summary={(x) => ({ thumb: <MapPin size={18} />, title: x.label || `New ${noun}`, subtitle: noun })}
      editor={(x, pt) => <Field label={`${noun[0].toUpperCase()}${noun.slice(1)} name`} max={30} value={x.label} onChange={(v) => pt({ label: v })} />}
    />
  );

  const body = {
    hero: (
      <>
        <Field label="Small heading" caps max={50} value={p.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
        <Field label="Page title" as="textarea" rows={2} max={80} value={p.hero.title} onChange={(v) => upd("hero", { title: v })} />
        <Field label="Intro text" as="textarea" rows={3} max={220} value={p.hero.text} onChange={(v) => upd("hero", { text: v })} />
      </>
    ),

    story: (
      <>
        <PhotoField label="Portrait photo" hint="Portrait photo (4:5) works best. Shown inside the arch."
          src={p.story.image} name={p.story.imageName} onChange={(v) => upd("story", { image: v.src, imageName: v.name })} />
        <Field label="Quote on the photo" as="textarea" rows={2} max={90} hint="Leave empty to hide" value={p.story.quote} onChange={(v) => upd("story", { quote: v })} />
        <Field label="Small heading" caps max={40} value={p.story.eyebrow} onChange={(v) => upd("story", { eyebrow: v })} />
        <Field label="Story title" max={60} value={p.story.title} onChange={(v) => upd("story", { title: v })} />
        <Field label="First paragraph" as="textarea" rows={4} max={320} value={p.story.p1} onChange={(v) => upd("story", { p1: v })} />
        <Field label="Second paragraph" as="textarea" rows={4} max={320} value={p.story.p2} onChange={(v) => upd("story", { p2: v })} />
        {p.story.stats.map((s, i) => (
          <div key={s.id} className="sx-pair">
            <span className="sx-pair-n">{i + 1}</span>
            <Field label="Number" max={16} value={s.value} onChange={(v) => upd("story", { stats: patchIn(p.story.stats, s.id, { value: v }) })} />
            <Field label="Label" max={24} value={s.label} onChange={(v) => upd("story", { stats: patchIn(p.story.stats, s.id, { label: v }) })} />
          </div>
        ))}
        <Field label="Button text" max={30} hint="Leave empty to hide" value={p.story.button} onChange={(v) => upd("story", { button: v })} />
      </>
    ),

    numbers: (
      <>
        {p.numbers.items.map((n, i) => edit("numbers", `num-${n.id}`, (
          <div key={n.id} className="sx-pair">
            <span className="sx-pair-n">{i + 1}</span>
            <Field label="Number" max={12} value={n.value} onChange={(v) => upd("numbers", { items: patchIn(p.numbers.items, n.id, { value: v }) })} />
            <Field label="Label" max={28} value={n.label} onChange={(v) => upd("numbers", { items: patchIn(p.numbers.items, n.id, { label: v }) })} />
          </div>
        )))}
        <p className="fd-note">Type each number exactly as it should appear — “4.9/5”, “200+”, “1:1”.</p>
      </>
    ),

    process: (
      <>
        <Field label="Small heading" caps max={50} value={p.process.eyebrow} onChange={(v) => upd("process", { eyebrow: v })} />
        <Field label="Section title" max={70} value={p.process.title} onChange={(v) => upd("process", { title: v })} />
        <div className="fd">
          <span className="fd-label">Steps · {p.process.items.length}</span>
          <ItemList
            items={p.process.items}
            onChange={(l) => upd("process", { items: l })}
            addLabel="Add step"
            canAdd={p.process.items.length < 6}
            canDelete={p.process.items.length > 1}
            makeNew={() => ({ id: uid(), title: "", text: "" })}
            summary={(s) => ({ thumb: <ListOrdered size={18} />, title: s.title || "New step", subtitle: s.text || "Describe this step" })}
            editor={(s, pt) => edit("process", `step-${s.id}`, (
              <>
                <Field label="Step title" max={26} value={s.title} onChange={(v) => pt({ title: v })} />
                <Field label="Description" as="textarea" rows={3} max={140} value={s.text} onChange={(v) => pt({ text: v })} />
              </>
            ))}
          />
          <p className="fd-note">Step numbers (01, 02…) are added automatically in order. Drag to reorder.</p>
        </div>
      </>
    ),

    travel: (
      <>
        <Field label="Small heading" caps max={40} value={p.travel.eyebrow} onChange={(v) => upd("travel", { eyebrow: v })} />
        <Field label="Title" as="textarea" rows={2} max={80} value={p.travel.title} onChange={(v) => upd("travel", { title: v })} />
        <Field label="Text" as="textarea" rows={3} max={220} value={p.travel.text} onChange={(v) => upd("travel", { text: v })} />
        <div className="fd">
          <span className="fd-label">Cities · {p.travel.cities.length}</span>
          {labelList("travel", "cities", p.travel.cities, "city", 12)}
        </div>
      </>
    ),

    kit: (
      <>
        <Field label="Small heading" caps max={40} value={p.kit.eyebrow} onChange={(v) => upd("kit", { eyebrow: v })} />
        <Field label="Title" as="textarea" rows={2} max={80} value={p.kit.title} onChange={(v) => upd("kit", { title: v })} />
        <Field label="Text" as="textarea" rows={2} max={160} value={p.kit.text} onChange={(v) => upd("kit", { text: v })} />
        <div className="fd">
          <span className="fd-label">Brands · {p.kit.brands.length}</span>
          {labelList("kit", "brands", p.kit.brands, "brand", 10)}
        </div>
        <Field label="Note at the bottom" as="textarea" rows={2} max={140} value={p.kit.note} onChange={(v) => upd("kit", { note: v })} />
      </>
    ),

    bottom: <BottomForm data={bottom} onChange={ed.setBottom} />,
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="About" title="About page editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={`${SITE}/about`}
        />

        <div className="sx-grid">
          <div className="sx-left">
            <SectionNav items={NAV} current={ed.open} onPick={ed.jump} />
            {ORDER.map((id) => {
              const m = META[id];
              return (
                <div key={id} onFocusCapture={() => ed.focusSection(id)}>
                  <SectionCard
                    id={id} icon={m.icon} title={m.title} subtitle={m.sub}
                    open={ed.open === id} onToggle={() => ed.toggle(id)}
                    issues={ed.errs[id]?.length || 0}
                  >
                    {ed.errs[id] && <ul className="sc-errs">{ed.errs[id].map((msg) => <li key={msg}>{msg}</li>)}</ul>}
                    {body[id]}
                  </SectionCard>
                </div>
              );
            })}
          </div>

          <LivePreview url="saanjhbeauty.in/about" active={ed.active}>
            {(device) => <AboutPreview d={p} bottom={bottom} device={device} />}
          </LivePreview>
        </div>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
