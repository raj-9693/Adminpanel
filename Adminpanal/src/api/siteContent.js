import axios from 'axios';
import { homeDefaults, galleryDefaults, aboutDefaults, servicesDefaults, reviewsDefaults, contactDefaults, bookingDefaults, bottomDefaults } from '../data/editorData.js';

// .env me:  VITE_API_URL=https://your-server.com/api
// Backend endpoints (ReviewsEditor jaise hi):
//   GET /admin/pages/:key  -> { page, savedAt }   (404 = abhi kuch save nahi, defaults dikhao)
//   PUT /admin/pages/:key  -> { page, savedAt }
// key = "home" | "gallery" | "about" | "services" | "reviews" | "contact" | "booking" | "bottom"
// Website (frontend) bhi wahi data GET /pages/:key se padhe — tab Save dabate hi user-side update ho jaata hai.
//
// VITE_API_URL na ho to data sirf is browser ke localStorage me save hota hai (demo / development).
const API = import.meta.env.VITE_API_URL;

// axios: ek baar baseURL aur token set, baaki jagah sirf api.get / api.put
const api = axios.create({ baseURL: API });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('saanjh_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const DEFAULTS = { home: homeDefaults, gallery: galleryDefaults, about: aboutDefaults, services: servicesDefaults, reviews: reviewsDefaults, contact: contactDefaults, booking: bookingDefaults, bottom: bottomDefaults };

const lsKey = (k) => `saanjh_site_${k}`;
const clone = (x) => JSON.parse(JSON.stringify(x));
const isObj = (x) => x && typeof x === 'object' && !Array.isArray(x);
// Naye fields defaults se aa jaate hain, saved data (arrays samet) hamesha jeet'ta hai.
function merge(def, saved) {
  if (!isObj(def) || !isObj(saved)) return saved === undefined ? clone(def) : saved;
  const out = {};
  new Set([...Object.keys(def), ...Object.keys(saved)]).forEach((k) => {
    if (!(k in saved)) out[k] = clone(def[k]);
    else if (isObj(def[k])) out[k] = merge(def[k], saved[k]);
    else out[k] = saved[k];
  });
  return out;
}

export async function getSiteContent(key) {
  const def = DEFAULTS[key];
  if (API) {
    try {
      const { data } = await api.get(`/admin/pages/${key}`);
      return { page: merge(def, data.page), savedAt: data.savedAt ?? null };
    } catch (err) {
      if (err.response?.status === 404) return { page: clone(def), savedAt: null }; // abhi kuch save nahi: defaults
      throw err;
    }
  }
  try {
    const raw = localStorage.getItem(lsKey(key));
    if (raw) {
      const j = JSON.parse(raw);
      return { page: merge(def, j.page), savedAt: j.savedAt ?? null };
    }
  } catch { /* corrupt data: defaults par laut jao */ }
  return { page: clone(def), savedAt: null };
}

export async function saveSiteContent(key, page) {
  if (API) {
    const { data } = await api.put(`/admin/pages/${key}`, page);
    return data;
  }
  const savedAt = Date.now();
  try {
    localStorage.setItem(lsKey(key), JSON.stringify({ page, savedAt }));
  } catch {
    throw new Error('storage-full'); // localStorage ~5MB limit
  }
  return { page, savedAt };
}
