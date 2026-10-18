import { Send, Layers, MapPin, Share2 } from "lucide-react";
import Layout from "../components/Layout";
import SectionCard from "../components/editor/SectionCard.jsx";
import SectionNav from "../components/editor/SectionNav.jsx";
import EditorToolbar from "../components/editor/EditorToolbar.jsx";
import LivePreview from "../components/editor/LivePreview.jsx";
import EditorGrid from "../components/editor/EditorGrid.jsx";
import BottomPagePreview from "../components/editor/preview/BottomPagePreview.jsx";
import { CtaFields, BrandFields, ContactFields, SocialFields } from "../components/editor/BottomForm.jsx";
import useSiteEditor from "../editor/useSiteEditor.js";
import useTimeAgo from "../editor/useTimeAgo.js";
import { validateBottom } from "../editor/validateSite.js";
import "../styles/editor.css";
import "../styles/siteEditor.css";

const SITE = import.meta.env.VITE_SITE_URL || "http://localhost:5173";

const ORDER = ["cta", "brand", "contact", "social"];
const META = {
  cta:     { icon: Send,   nav: "Call-to-action", title: "Call-to-action",       sub: "The big “Let’s make space…” card" },
  brand:   { icon: Layers, nav: "Brand & links",  title: "Footer · brand & links", sub: "Logo text, short description & quick links" },
  contact: { icon: MapPin, nav: "Contact",        title: "Footer · find us",     sub: "Address, email & phone" },
  social:  { icon: Share2, nav: "Social",         title: "Footer · stay close",  sub: "Social links & the closing line" },
};
const NAV = ORDER.map((id) => ({ id, label: META[id].nav, icon: META[id].icon }));

// Ye section website ke har page par same dikhta hai — yahin ek baar edit karo, sab jagah update.
export default function BottomSectionEditor() {
  const ed = useSiteEditor({ pageKey: "bottom", order: ORDER, validate: validateBottom });
  const ago = useTimeAgo(ed.lastSaved);

  if (ed.loadState === "loading") return <Layout><div className="ed-page"><div className="ed-skel" /></div></Layout>;
  if (ed.loadState === "error" || !ed.draft)
    return (
      <Layout><div className="ed-page"><div className="ed-state">
        <p>This section could not be loaded right now.</p>
        <button type="button" className="ed-btn" onClick={ed.load}>Try again</button>
      </div></div></Layout>
    );

  const d = ed.draft;
  const set = ed.setPage;
  const edit = (sec, key, node) => <div onFocusCapture={() => ed.focusSection(sec, [key])}>{node}</div>;

  const body = {
    cta: <CtaFields data={d} onChange={set} />,
    brand: <BrandFields data={d} onChange={set} edit={edit} />,
    contact: <ContactFields data={d} onChange={set} />,
    social: <SocialFields data={d} onChange={set} edit={edit} />,
  };
  // form section -> preview ka hissa
  const previewId = { cta: "cta", brand: "f-brand", contact: "f-contact", social: "f-social" };

  return (
    <Layout>
      <div className="ed-page sx">
        <EditorToolbar
          crumb="Bottom section" title="Bottom section editor"
          dirty={ed.dirty} saving={ed.saving} savedText={ago}
          onSave={ed.save} onReset={ed.reset} siteUrl={SITE}
        />

        <EditorGrid>
          <div className="sx-left">
            <SectionNav items={NAV} current={ed.open} onPick={(id) => { ed.jump(id); ed.focusSection(previewId[id]); }} />

            {ORDER.map((id) => {
              const m = META[id];
              return (
                <div key={id} onFocusCapture={() => ed.focusSection(previewId[id])}>
                  <SectionCard
                    id={id} icon={m.icon} title={m.title} subtitle={m.sub}
                    open={ed.open === id}
                    onToggle={() => { ed.toggle(id); ed.focusSection(previewId[id]); }}
                    issues={ed.errs[id]?.length || 0}
                  >
                    {ed.errs[id] && <ul className="sc-errs">{ed.errs[id].map((msg) => <li key={msg}>{msg}</li>)}</ul>}
                    {body[id]}
                  </SectionCard>
                </div>
              );
            })}
          </div>

          <LivePreview url="saanjhbeauty.in" active={ed.active}>
            {(device) => <BottomPagePreview d={d} device={device} />}
          </LivePreview>
        </EditorGrid>

        {ed.toast && <div className="ed-toast sx-toast" role="status">{ed.toast}</div>}
      </div>
    </Layout>
  );
}
