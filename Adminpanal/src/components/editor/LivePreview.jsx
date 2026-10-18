import { useEffect, useRef, useState } from "react";
import { Monitor, Smartphone } from "lucide-react";

const WIDTH = { desktop: 1100, mobile: 390 };

// Website ka asli-size page virtual canvas par render hota hai, phir panel ki width ke hisaab se chhota (scale) hota hai.
//
// children = (device) => <Preview />
// active   = ["item-xyz", "items"]  -> pehla jo `data-sec` mile, preview usi tak smooth scroll karta hai
//            aur usko highlight (data-on) karta hai. Employee jis section me type kare, wahi side me dikhta hai.
export default function LivePreview({ url, children, active = [] }) {
  const [device, setDevice] = useState(() => (typeof window !== "undefined" && window.innerWidth < 700 ? "mobile" : "desktop"));
  const [m, setM] = useState({ s: 0.5, h: 0 });
  const view = useRef(null);
  const page = useRef(null);
  const W = WIDTH[device];
  const key = Array.isArray(active) ? active.join("|") : String(active || "");

  /* scale + height */
  useEffect(() => {
    const v = view.current, p = page.current;
    if (!v || !p) return;
    const calc = () => {
      if (!v.clientWidth) return; // preview tab chhupa ho to skip
      const avail = v.clientWidth - (device === "mobile" ? 32 : 0);
      const s = Math.min(1, avail / W);
      setM({ s, h: p.offsetHeight * s });
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(v);
    ro.observe(p);
    return () => ro.disconnect();
  }, [W, device]);

  /* active section tak scroll + highlight */
  useEffect(() => {
    const v = view.current, p = page.current;
    if (!v || !p || !key) return;
    let el = null;
    for (const id of key.split("|")) {
      el = p.querySelector(`[data-sec="${id}"]`);
      if (el) break;
    }
    if (!el) return;
    el.setAttribute("data-on", "1");
    const t = setTimeout(() => {
      const top = v.scrollTop + el.getBoundingClientRect().top - v.getBoundingClientRect().top - 12;
      v.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 80);
    return () => { clearTimeout(t); el.removeAttribute("data-on"); };
  }, [key, device, m.s]);

  return (
    <aside className="lp" aria-label="Live preview">
      <div className="lp-head">
        <span className="lp-dot" />
        <b>Live preview</b>
        <span className="lp-chip">{device === "desktop" ? "Desktop" : "Mobile"}</span>
        <div className="lp-dev" role="group" aria-label="Preview device">
          <button type="button" className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")} aria-label="Desktop preview"><Monitor size={20} /></button>
          <button type="button" className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")} aria-label="Mobile preview"><Smartphone size={20} /></button>
        </div>
      </div>

      <div className="lp-frame">
        <div className="lp-bar">
          <i style={{ background: "#c4554e" }} /><i style={{ background: "#c9a26a" }} /><i style={{ background: "#8a3b47" }} />
          <span className="lp-url">{url}</span>
        </div>
        <div className="lp-view" ref={view}>
          <div className="lp-scale" style={{ width: W * m.s, height: m.h }}>
            <div className="lp-page" ref={page} style={{ width: W, transform: `scale(${m.s})` }}>
              {children(device)}
            </div>
          </div>
        </div>
      </div>
      <p className="lp-hint">Preview follows the section you are editing. Changes appear instantly, but go live only after you press Save.</p>
    </aside>
  );
}
