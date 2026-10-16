import { SiteNav, BottomPreview } from "./SiteChrome.jsx";

// "Website → Bottom" editor ka preview: upar halka page-context, neeche asli CTA + footer.
export default function BottomPagePreview({ d, device }) {
  return (
    <div className={`sp ${device === "mobile" ? "m" : ""}`}>
      <SiteNav active="" />
      <div className="sp-ctx"><span>Page content appears here</span></div>
      <BottomPreview d={d} />
    </div>
  );
}
