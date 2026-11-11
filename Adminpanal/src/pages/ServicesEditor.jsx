import { useState, useEffect } from "react";
import { Sparkles, Layers, ListOrdered, MessageCircle } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import SharedBottomNote from "../components/editor/SharedBottomNote.jsx";
import Field from "../components/editor/Field.jsx";
import Toggle from "../components/editor/Toggle.jsx";
import ItemList from "../components/editor/ItemList.jsx";
import PhotoField from "../components/editor/PhotoField.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import EditorGrid from "../components/editor/EditorGrid.jsx";
import ServicesPreview from "../components/editor/preview/ServicesPreview.jsx";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateServices } from "../editor/validateSite.js";
import { uid } from "../editor/imageTools.js";
import { getDetaServices, putDetaServices, postImageServices } from "../Apiservice/Services.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["hero", "packages", "compare", "faq"];
const META = {
  hero:     { icon: Sparkles,      nav: "Intro",    title: "Page intro",          sub: "Heading & welcome text" },
  packages: { icon: Layers,        nav: "Packages", title: "Service packages",    sub: "Cards with photo, price & what's included" },
  compare:  { icon: ListOrdered,   nav: "Compare",  title: "Comparison table",    sub: '"At a glance" table of what each package includes' },
  faq:      { icon: MessageCircle, nav: "FAQ",      title: "Questions & answers", sub: '"Before you book" questions' },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));
const lineCount = (t) => String(t || "").split("\n").filter((x) => x.trim()).length;

export default function ServicesEditor() {
  const ed = useSiteEditor({ pageKey: "services", order: ORDER, validate: validateServices });
  const ago = useTimeAgo(ed.lastSaved);

  // Server se data load karo — koi dummy nahi
  const [serverLoadState, setServerLoadState] = useState("idle"); // idle | loading | done | error
  const [serverLoaded, setServerLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveToast, setSaveToast] = useState("");

  useEffect(() => {
    if (ed.loadState !== "ready") return;
    if (serverLoaded) return;

    setServerLoadState("loading");
    getDetaServices()
      .then((res) => {
        const serverData = res?.data?.Services;
        if (!serverData) {
          // Server par data nahi — empty fields, dummy nahi
          ed.setPage({
            hero:     { eyebrow: "", title: "", text: "" },
            packages: { note: "", badge: "", items: [] },
            compare:  { eyebrow: "", title: "", note: "", tableLabel: "", priceRowLabel: "", rows: [] },
            faq:      { eyebrow: "", title: "", text: "", button: "", items: [] },
          });
        } else {
          // Sirf API ka data — koi merge nahi, koi dummy nahi
          ed.setPage({
            hero:     serverData.hero     ?? { eyebrow: "", title: "", text: "" },
            packages: serverData.packages ?? { note: "", badge: "", items: [] },
            compare:  serverData.compare  ?? { eyebrow: "", title: "", note: "", tableLabel: "", priceRowLabel: "", rows: [] },
            faq:      serverData.faq      ?? { eyebrow: "", title: "", text: "", button: "", items: [] },
          });
        }
        setServerLoaded(true);
        setServerLoadState("done");
      })
      .catch((err) => {
        console.error("[ServicesEditor] API call failed:", err);
        setServerLoadState("error");
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ed.loadState]);

  // Save: packages images upload karo → URLs replace karo → phir PUT karo
  const handleSave = async () => {
    if (saving || !ed.draft) return;
    setSaving(true);
    setSaveToast("");
    try {
      let draft = { ...ed.draft };

      // packages.items[].image — local base64/blob ho to ImageKit par upload karo
      const updatedPackages = await Promise.all(
        (draft.packages?.items || []).map(async (pkg) => {
          const isLocal =
            pkg.image &&
            (pkg.image.startsWith("data:") || pkg.image.startsWith("blob:"));

          if (!isLocal) return pkg; // pehle se URL hai — skip

          try {
            const blob = await (await fetch(pkg.image)).blob();
            const file = new File([blob], pkg.imageName || "service.jpg", { type: blob.type });
            const res = await postImageServices(file);
            const uploadedUrl = res?.data?.image;
            if (uploadedUrl) return { ...pkg, image: uploadedUrl };
          } catch (uploadErr) {
            console.error(`[ServicesEditor] Image upload failed for pkg ${pkg.id}:`, uploadErr);
          }
          return pkg; // upload fail ho to purana hi rakho
        })
      );

      draft = {
        ...draft,
        packages: { ...draft.packages, items: updatedPackages },
      };

      await putDetaServices(draft);
      ed.setPage(draft);
      setSaveToast("Changes saved.");
    } catch (err) {
      console.error("[handleSave] Save failed:", err);
      setSaveToast("Save failed. Please try again.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveToast(""), 3200);
    }
  };

  // Jab tak API ka data na aaye — loading skeleton
  if (ed.loadState === "loading" || serverLoadState === "loading" || serverLoadState === "idle")
    return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;

  // API fail ho gayi — error screen, dummy nahi
  if (serverLoadState === "error")
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>Server se data load nahi hua. Backend check karo ya dobara try karo.</p>
        <button type="button" className="ed-btn" onClick={() => { setServerLoaded(false); setServerLoadState("idle"); }}>
          Try again
        </button>
      </div></div></Layout>
    );

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
  const edit = (sec, itemKey, node) => <div onFocusCapture={() => ed.focusSection(sec, itemKey ? [itemKey] : [])}>{node}</div>;
  const pk = p.packages.items;

  // sirf ek package "Most popular" ho sakta hai
  const setPackages = (list, changedId) => {
    const nowPopular = list.find((x) => x.id === changedId && x.popular);
    upd("packages", { items: nowPopular ? list.map((x) => ({ ...x, popular: x.id === changedId })) : list });
  };

  const body = {
    hero: (
      <>
        <Field label="Small heading" caps max={50} value={p.hero.eyebrow} onChange={(v) => upd("hero", { eyebrow: v })} />
        <Field label="Page title" as="textarea" rows={2} max={80} value={p.hero.title} onChange={(v) => upd("hero", { title: v })} />
        <Field label="Intro text" as="textarea" rows={3} max={240} value={p.hero.text} onChange={(v) => upd("hero", { text: v })} />
      </>
    ),

    packages: (
      <>
        <div className="fd">
          <span className="fd-label">Packages · {pk.length}</span>
          <ItemList
            items={pk}
            onChange={(l) => upd("packages", { items: l })}
            addLabel="Add package"
            canAdd={pk.length < 6}
            canDelete={pk.length > 1}
            makeNew={() => ({ id: uid(), image: "", imageName: "", eyebrow: "", title: "", price: "₹", priceNote: "onwards", features: "", button: "Book This", popular: false })}
            summary={(x) => ({
              thumb: x.image ? <img src={x.image} alt="" /> : <Layers size={18} />,
              title: x.title || "New package",
              subtitle: `${x.price || "No price"} · ${lineCount(x.features)} included${x.popular ? " · Most popular" : ""}`,
            })}
            toggles={(x, pt) => <Toggle label="Most popular" checked={x.popular} onChange={(v) => setPackages(pk.map((y) => (y.id === x.id ? { ...y, popular: v } : y)), x.id)} />}
            editor={(x, pt) => edit("packages", `pkg-${x.id}`, (
              <>
                <PhotoField label="Photo" hint="Landscape photo (4:3) works best" src={x.image} name={x.imageName} onChange={(v) => pt({ image: v.src, imageName: v.name })} />
                <Field label="Small line above the name" caps max={40} placeholder="For the main ceremony" value={x.eyebrow} onChange={(v) => pt({ eyebrow: v })} />
                <Field label="Package name" max={30} value={x.title} onChange={(v) => pt({ title: v })} />
                <div className="fd-row">
                  <Field label="Starting price" max={14} placeholder="₹18,000" value={x.price} onChange={(v) => pt({ price: v })} />
                  <Field label="Word after price" max={14} placeholder="onwards" value={x.priceNote} onChange={(v) => pt({ priceNote: v })} />
                </div>
                <Field label="What's included" as="textarea" rows={5} max={400} hint="One point per line" value={x.features} onChange={(v) => pt({ features: v })} />
                <Field label="Button text" max={20} hint="Leave empty to hide" value={x.button} onChange={(v) => pt({ button: v })} />
              </>
            ))}
          />
        </div>
        <Field label="Label on the popular card" max={24} value={p.packages.badge} onChange={(v) => upd("packages", { badge: v })} />
        <Field label="Note under the cards" as="textarea" rows={2} max={220} value={p.packages.note} onChange={(v) => upd("packages", { note: v })} />
      </>
    ),

    compare: (
      <>
        <Field label="Small heading" caps max={40} value={p.compare.eyebrow} onChange={(v) => upd("compare", { eyebrow: v })} />
        <Field label="Section title" max={70} value={p.compare.title} onChange={(v) => upd("compare", { title: v })} />
        <Field label="Note (top right)" as="textarea" rows={2} max={120} value={p.compare.note} onChange={(v) => upd("compare", { note: v })} />
        <div className="fd-row">
          <Field label="First column heading" max={40} value={p.compare.tableLabel} onChange={(v) => upd("compare", { tableLabel: v })} />
          <Field label="Last row name" max={30} hint="Prices come from the packages" value={p.compare.priceRowLabel} onChange={(v) => upd("compare", { priceRowLabel: v })} />
        </div>
        <div className="fd">
          <span className="fd-label">Rows · {p.compare.rows.length}</span>
          <ItemList
            items={p.compare.rows}
            onChange={(l) => upd("compare", { rows: l })}
            addLabel="Add row"
            canAdd={p.compare.rows.length < 10}
            canDelete={p.compare.rows.length > 1}
            makeNew={() => ({ id: uid(), label: "", inc: {} })}
            summary={(r) => {
              const n = pk.filter((x) => r.inc?.[x.id]).length;
              return { thumb: <ListOrdered size={18} />, title: r.label || "New row", subtitle: `Included in ${n} of ${pk.length} packages` };
            }}
            editor={(r, pt) => edit("compare", `row-${r.id}`, (
              <>
                <Field label="What's included" max={40} placeholder="Personal consultation" value={r.label} onChange={(v) => pt({ label: v })} />
                <div className="fd">
                  <span className="fd-label">Included in</span>
                  {pk.map((x) => (
                    <Toggle key={x.id} label={x.title || "Untitled package"} checked={Boolean(r.inc?.[x.id])} onChange={(v) => pt({ inc: { ...r.inc, [x.id]: v } })} />
                  ))}
                </div>
              </>
            ))}
          />
          <p className="fd-note">Columns follow your packages automatically. Add or rename a package above and the table updates.</p>
        </div>
      </>
    ),

    faq: (
      <>
        <Field label="Small heading" caps max={40} value={p.faq.eyebrow} onChange={(v) => upd("faq", { eyebrow: v })} />
        <Field label="Title" as="textarea" rows={2} max={80} value={p.faq.title} onChange={(v) => upd("faq", { title: v })} />
        <Field label="Text" as="textarea" rows={3} max={220} value={p.faq.text} onChange={(v) => upd("faq", { text: v })} />
        <Field label="Button text" max={30} hint="Leave empty to hide" value={p.faq.button} onChange={(v) => upd("faq", { button: v })} />
        <div className="fd">
          <span className="fd-label">Questions · {p.faq.items.length}</span>
          <ItemList
            items={p.faq.items}
            onChange={(l) => upd("faq", { items: l })}
            addLabel="Add question"
            canAdd={p.faq.items.length < 10}
            canDelete={p.faq.items.length > 1}
            makeNew={() => ({ id: uid(), q: "", a: "" })}
            summary={(f) => ({ thumb: <MessageCircle size={18} />, title: f.q || "New question", subtitle: f.a || "Write the answer" })}
            editor={(f, pt) => edit("faq", `faq-${f.id}`, (
              <>
                <Field label="Question" max={90} value={f.q} onChange={(v) => pt({ q: v })} />
                <Field label="Answer" as="textarea" rows={4} max={400} value={f.a} onChange={(v) => pt({ a: v })} />
              </>
            ))}
          />
        </div>
      </>
    ),
  };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Services" title="Services page editor"
          dirty={ed.dirty} saving={saving} savedText={saveToast || ago}
          onSave={handleSave} onReset={ed.reset} siteUrl={`${SITE}/services`}
        />

        <EditorGrid>
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
            <SharedBottomNote />
          </div>

          <LivePreview url="saanjhbeauty.in/services" active={ed.active}>
            {(device) => <ServicesPreview d={p} bottom={bottom} device={device} />}
          </LivePreview>
        </EditorGrid>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
