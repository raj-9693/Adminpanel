import { reviewsPageDummy } from "../data/reviewsAdmin.js";
import { autoAverage } from "../editor/rating.js";

// .env: VITE_API_URL=https://your-server.com/api
// Backend ke endpoints:
//   GET  /admin/pages/reviews   -> { page, savedAt }
//   PUT  /admin/pages/reviews   -> { page, savedAt }
//   POST /admin/media (multipart "file") -> { url }
// Token login ke baad localStorage "saanjh_admin_token" me rakha hai (apne auth ke hisaab se badlo).
const API = import.meta.env.VITE_API_URL;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const authHeaders = () => {
  const t = localStorage.getItem("saanjh_admin_token");
  return t ? { Authorization: `Bearer ${t}` } : {};
};

async function uploadImage(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API}/admin/media`, { method: "POST", headers: authHeaders(), body: fd });
  if (!res.ok) throw new Error("Upload failed");
  return (await res.json()).url;
}

export async function getReviewsPage() {
  if (API) {
    const res = await fetch(`${API}/admin/pages/reviews`, { headers: authHeaders() });
    if (!res.ok) throw new Error("Could not load page");
    return res.json();
  }
  await wait(500);
  return { page: JSON.parse(JSON.stringify(reviewsPageDummy)), savedAt: Date.now() - 6 * 60000 };
}

export async function saveReviewsPage(draft) {
  // 1) naye photos upload  2) numbers clean  3) auto average
  const testimonials = [];
  for (const t of draft.testimonials) {
    const { _file, ...rest } = t;
    if (_file && API) rest.image = await uploadImage(_file);
    testimonials.push(rest);
  }
  const dist = Object.fromEntries([5, 4, 3, 2, 1].map((n) => [n, Number(draft.summary.distribution[n]) || 0]));
  const summary = {
    ...draft.summary,
    distribution: dist,
    total: Number(draft.summary.total) || 0,
    average: draft.summary.auto ? autoAverage(dist) : Number(draft.summary.average),
  };
  const page = { ...draft, testimonials, summary };

  if (API) {
    const res = await fetch(`${API}/admin/pages/reviews`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(page),
    });
    if (!res.ok) throw new Error("Could not save");
    return res.json();
  }
  await wait(700);
  return { page, savedAt: Date.now() };
}
