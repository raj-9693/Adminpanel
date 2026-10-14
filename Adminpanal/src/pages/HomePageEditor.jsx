import { Sparkles, Award, Layers, Image as ImageIcon, Quote, Heart, Send } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import Field from "../components/editor/Field.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import PhotoField from "../components/editor/PhotoField.jsx";
import BottomForm from "../components/editor/BottomForm.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import HomePreview from "../components/editor/preview/HomePreview.jsx";
import { ICONS, ICON_OPTIONS } from "../components/editor/icons.js";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateHome } from "../editor/validateSite.js";
import { uid } from "../editor/imageTools.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

// Order = website par jis order me sections dikhte hain (screenshot jaisa)
const ORDER = ["hero", "stats", "basics", "glimpse", "reviews", "promises", "bottom"];
const META = {
  hero:     { icon: Sparkles,  nav: "Hero",     title: "Hero banner",          sub: "Headline, buttons & main photo" },
  stats:    { icon: Award,     nav: "Stats",    title: "Key statistics",       sub: "Brides, years of experience & rating" },
  basics:   { icon: Layers,    nav: "Services", title: "Featured services",    sub: "Titles, descriptions & pricing" },
  glimpse:  { icon: ImageIcon, nav: "Glimpse",  title: "Real radiance",        sub: "Featured bride photos & captions" },
  reviews:  { icon: Quote,     nav: "Notes",    title: "Love notes",           sub: "Bride testimonials on the home page" },
  promises: { icon: Heart,     nav: "Promises", title: "Promise strip",        sub: "Four short reasons to choose Saanjh" },
  bottom:   { icon: Send,      nav: "Bottom",   title: "Bottom section",       sub: "Call-to-action & footer · shared on all pages" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

export default function HomePageEditor() {
  const ed = useSiteEditor({ pageKey: "home", order: ORDER, validate: validateHome });
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
  const setItems = (key, items) => upd(key, { items });
  // item editor ke andar focus aaye to preview us item tak jaye (nahi mila to section tak)
  const edit = (sec, itemKey, node) => (
    <div onFocusCapture={() => ed.focusSection(sec, itemKey ? [itemKey] : [])}>{node}</div>
  );

  const body = {
    hero: (
      <>
        <Field label="Small heading" caps max={60} value={p.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
        <Field label="Main title" as="textarea" rows={2} max={90} hint="The big headline on the home page" value={p.hero.title} onChange={(v) => upd("hero", { title: v })} />
        <Field label="Subtitle / tagline" as="textarea" rows={3} max={220} value={p.hero.subtitle} onChange={(v) => upd("hero", { subtitle: v })} />
        <div className="fd-row">
          <Field label="Primary button" max={28} placeholder="Book your date" value={p.hero.primaryCta} onChange={(v) => upd("hero", { primaryCta: v })} />
          <Field label="Secondary button" max={28} placeholder="View looks" hint="Leave empty to hide" value={p.hero.secondaryCta} onChange={(v) => upd("hero", { secondaryCta: v })} />
        </div>
        <PhotoField
          label="Hero photo"
          hint="Portrait photo (4:5) works best. It is shown inside the arch."
          src={p.hero.image}
          name={p.hero.imageName}
          onChange={(v) => upd("hero", { image: v.src, imageName: v.name })}
        />
        <Field label="Label on the photo" max={40} hint="Small tag on the photo’s corner. Leave empty to hide." value={p.hero.badge} onChange={(v) => upd("hero", { badge: v })} />
      </>
    ),

    stats: (
      <>
        {p.stats.items.map((s, i) => (
          <div key={s.id} className="sx-pair">
            <span className="sx-pair-n">{i + 1}</span>
            <Field label={["Brides satisfied", "Years of experience", "Customer rating"][i] || "Number"} max={12} placeholder={["650+", "12 yrs", "4.9/5"][i]}
              value={s.value} onChange={(v) => setItems("stats", p.stats.items.map((x) => (x.id === s.id ? { ...x, value: v } : x)))} />
            <Field label="Label under it" max={30}
              value={s.label} onChange={(v) => setItems("stats", p.stats.items.map((x) => (x.id === s.id ? { ...x, label: v } : x)))} />
          </div>
        ))}
        <p className="fd-note">Type the number exactly as it should appear — “650+”, “12 yrs”, “4.9/5”.</p>
      </>
    ),

    basics: (
      <>
        <Field label="Small heading" caps max={50} value={p.basics.eyebrow} onChange={(v) => upd("basics", { eyebrow: v })} />
        <Field label="Section title" max={70} value={p.basics.title} onChange={(v) => upd("basics", { title: v })} />
        <Field label="Link text (top right)" max={30} hint="Leave empty to hide" value={p.basics.linkText} onChange={(v) => upd("basics", { linkText: v })} />
        <div className="fd">
          <span className="fd-label">Services · {p.basics.items.length}</span>
          <ItemList
            items={p.basics.items}
            onChange={(l) => setItems("basics", l)}
            addLabel="Add service"
            canAdd={p.basics.items.length < 8}
            canDelete={p.basics.items.length > 1}
            makeNew={() => ({ id: uid(), icon: "sparkles", title: "", desc: "", price: "From ₹" })}
            summary={(s) => {
              const I = ICONS[s.icon] || Sparkles;
              return { thumb: <I size={18} />, title: s.title || "New service", subtitle: s.price || "Add a price" };
            }}
            editor={(s, pt) => edit("basics", `basic-${s.id}`, (
              <>
                <Field label="Icon" as="select" options={ICON_OPTIONS} value={s.icon} onChange={(v) => pt({ icon: v })} />
                <Field label="Service title" max={30} value={s.title} onChange={(v) => pt({ title: v })} />
                <Field label="Short description" as="textarea" rows={3} max={120} value={s.desc} onChange={(v) => pt({ desc: v })} />
                <Field label="Starting price" max={24} placeholder="From ₹18,000" hint="Shown exactly as typed" value={s.price} onChange={(v) => pt({ price: v })} />
              </>
            ))}
          />
        </div>
      </>
    ),

    glimpse: (
      <>
        <Field label="Small heading" caps max={50} value={p.glimpse.eyebrow} onChange={(v) => upd("glimpse", { eyebrow: v })} />
        <Field label="Section title" max={70} value={p.glimpse.title} onChange={(v) => upd("glimpse", { title: v })} />
        <Field label="Button text" max={34} hint="Leave empty to hide" value={p.glimpse.buttonText} onChange={(v) => upd("glimpse", { buttonText: v })} />
        <div className="fd">
          <span className="fd-label">Featured brides · {p.glimpse.items.length}</span>
          <ItemList
            items={p.glimpse.items}
            onChange={(l) => setItems("glimpse", l)}
            addLabel="Add bride photo"
            canAdd={p.glimpse.items.length < 6}
            canDelete={p.glimpse.items.length > 1}
            makeNew={() => ({ id: uid(), image: "", imageName: "", name: "", caption: "" })}
            summary={(g) => ({
              thumb: g.image ? <img src={g.image} alt="" /> : <ImageIcon size={18} />,
              title: g.name || "New bride photo",
              subtitle: g.caption || "Add a caption",
            })}
            editor={(g, pt) => edit("glimpse", `glimpse-${g.id}`, (
              <>
                <PhotoField label="Photo" hint="Portrait photo (3:4)" src={g.image} name={g.imageName} onChange={(v) => pt({ image: v.src, imageName: v.name })} />
                <div className="fd-row">
                  <Field label="Bride’s name" max={30} value={g.name} onChange={(v) => pt({ name: v })} />
                  <Field label="Caption" max={40} placeholder="Temple ceremony" value={g.caption} onChange={(v) => pt({ caption: v })} />
                </div>
              </>
            ))}
          />
        </div>
      </>
    ),

    reviews: (
      <>
        <Field label="Small heading" caps max={50} value={p.reviews.eyebrow} onChange={(v) => upd("reviews", { eyebrow: v })} />
        <Field label="Section title" max={70} value={p.reviews.title} onChange={(v) => upd("reviews", { title: v })} />
        <div className="fd">
          <span className="fd-label">Notes · {p.reviews.items.length}</span>
          <ItemList
            items={p.reviews.items}
            onChange={(l) => setItems("reviews", l)}
            addLabel="Add note"
            canAdd={p.reviews.items.length < 6}
            canDelete={p.reviews.items.length > 1}
            makeNew={() => ({ id: uid(), quote: "", name: "", meta: "" })}
            summary={(r) => ({ thumb: <Quote size={18} />, title: r.name || "New note", subtitle: r.quote || "Write her note" })}
            editor={(r, pt) => edit("reviews", `review-${r.id}`, (
              <>
                <Field label="Her note" as="textarea" rows={3} max={200} value={r.quote} onChange={(v) => pt({ quote: v })} />
                <div className="fd-row">
                  <Field label="Bride’s name" max={40} value={r.name} onChange={(v) => pt({ name: v })} />
                  <Field label="Wedding place & date" max={50} placeholder="Jaipur wedding · March 2025" value={r.meta} onChange={(v) => pt({ meta: v })} />
                </div>
              </>
            ))}
          />
          <p className="fd-note">Three notes fit the page best. Full review stories are edited in the Reviews page.</p>
        </div>
      </>
    ),

    promises: (
      <ItemList
        items={p.promises.items}
        onChange={(l) => setItems("promises", l)}
        canAdd={false}
        canDelete={false}
        summary={(x) => {
          const I = ICONS[x.icon] || Sparkles;
          return { thumb: <I size={18} />, title: x.title || "Promise", subtitle: x.text };
        }}
        editor={(x, pt) => edit("promises", `promise-${x.id}`, (
          <>
            <Field label="Icon" as="select" options={ICON_OPTIONS} value={x.icon} onChange={(v) => pt({ icon: v })} />
            <Field label="Title" max={28} value={x.title} onChange={(v) => pt({ title: v })} />
            <Field label="Text" as="textarea" rows={2} max={80} value={x.text} onChange={(v) => pt({ text: v })} />
          </>
        ))}
      />
    ),

    bottom: <BottomForm data={bottom} onChange={ed.setBottom} />,
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Home page" title="Home page editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={SITE}
        />

        <div className="sx-grid">
          {/* LEFT: forms (apna alag scroll) */}
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
                    subtitle={m.sub}
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
          </div>

          {/* RIGHT: live preview (fixed, andar apna scroll) */}
          <LivePreview url="saanjhbeauty.in" active={ed.active}>
            {(device) => <HomePreview d={p} bottom={bottom} device={device} />}
          </LivePreview>
        </div>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
